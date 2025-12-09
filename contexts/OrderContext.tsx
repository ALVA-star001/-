
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { DISCOUNT_CODES } from '../content';
import { isComplexPrice } from '../utils/price';

// Define structure for an order item
export interface OrderItem {
  category: string;
  name: string;
  priceStr: string;
  price: number;
}

export interface SizeItem extends OrderItem {
  isSmallSize: boolean;
}

export interface CraftItem extends OrderItem {
  multiplier?: number; // e.g. 2 for Double Layer
}

export interface RushItem {
  id: string;
  name: string;
  multiplier: number; // e.g. 0.1 for 10%
  feeStr: string;
}

export interface PackagingItem {
  title: string;
  price: number;
}

// Define Discount Rule Structure
export interface DiscountRule {
  code: string;
  type: 'percent' | 'fixed' | 'threshold';
  value: number; // For percent: 0.8, For fixed/threshold: amount in rmb
  threshold?: number; // Only for threshold type
  exclusive: boolean; // limit/exclusive flag
  label: string;
  tag: string;
}

interface BreakdownDetails {
  baseTotal: number;
  craftMultiplier: number;
  rawAddonsTotal: number;
  addonDiscountMultiplier: number; // 0.5 if small size, else 1
  addonTotal: number;
  subTotal: number; // Before rush/pack
  discountAmount: number; // Amount saved by code
  rushFeeAmount: number;
  packagingFee: number;
  thresholdErrors: string[];
}

interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

interface OrderContextType {
  selectedSize: SizeItem | null;
  selectedCraft: CraftItem | null;
  selectedAddons: OrderItem[];
  selectedRush: RushItem | null;
  selectedPackaging: PackagingItem | null;
  
  appliedDiscounts: DiscountRule[];
  isModalOpen: boolean;
  consultationMode: boolean; 
  discountNotification: Notification | null;

  selectSize: (item: any) => void;
  selectCraft: (item: any) => void;
  toggleAddon: (category: string, name: string, priceStr: string, priceNum: number) => void;
  removeAddon: (category: string, name: string) => void;
  selectRush: (item: any) => void;
  selectPackaging: (item: any) => void;

  clearOrder: () => void;
  addDiscount: (code: string) => void;
  removeDiscount: (code: string) => void;
  setConsultationMode: (mode: boolean) => void;
  toggleModal: (isOpen: boolean) => void;
  clearNotification: () => void;
  
  breakdown: BreakdownDetails;
  finalPrice: number;
  hasComplexItems: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedSize, setSelectedSize] = useState<SizeItem | null>(null);
  const [selectedCraft, setSelectedCraft] = useState<CraftItem | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<OrderItem[]>([]);
  const [selectedRush, setSelectedRush] = useState<RushItem | null>(null);
  const [selectedPackaging, setSelectedPackaging] = useState<PackagingItem | null>(null);
  
  const [appliedDiscounts, setAppliedDiscounts] = useState<DiscountRule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consultationMode, setConsultationMode] = useState(false);
  const [discountNotification, setDiscountNotification] = useState<Notification | null>(null);

  const clearNotification = () => setDiscountNotification(null);

  // Discount Actions
  const addDiscount = (codeStr: string) => {
    const code = codeStr.trim().toUpperCase();
    if (!code) return;

    // Check if already applied
    if (appliedDiscounts.find(d => d.code === code)) {
      setDiscountNotification({ type: 'info', message: '这个优惠码已经使用啦' });
      return;
    }

    const rule = DISCOUNT_CODES.find(d => d.code === code) as DiscountRule | undefined;
    if (!rule) {
      setDiscountNotification({ type: 'error', message: '无效的优惠码' });
      return;
    }

    // Stacking Logic
    // Scenario 1: New code is exclusive
    if (rule.exclusive) {
      setAppliedDiscounts([rule]);
      setDiscountNotification({ type: 'success', message: `大额优惠券不可叠加哦~ 已为您替换为: ${rule.label}` });
    } else {
      // Scenario 2: New code is exclusive: false
      // Check if there's already an exclusive: true code in appliedDiscounts
      const hasExclusive = appliedDiscounts.some(d => d.exclusive);
      
      if (hasExclusive) {
        // Reject the new code
        setDiscountNotification({ type: 'error', message: '当前已使用互斥优惠，无法叠加小红包' });
        return;
      }
      
      // If no exclusive code present, append
      setAppliedDiscounts(prev => [...prev, rule]);
      setDiscountNotification({ type: 'success', message: `成功添加优惠: ${rule.label}` });
    }
  };

  const removeDiscount = (code: string) => {
    setAppliedDiscounts(prev => prev.filter(d => d.code !== code));
    setDiscountNotification(null);
  };

  // =================================================================
  // 💰 COMPLEX PRICING CALCULATOR
  // =================================================================
  const priceCalculation = useMemo(() => {
    // 1. Base Calculation (Size * Craft Multiplier)
    const basePrice = selectedSize ? selectedSize.price : 0;
    const craftMultiplier = selectedCraft?.multiplier || 1;
    const baseTotal = basePrice * craftMultiplier;

    // 2. Addons Calculation (Sum * Small Size Discount)
    const rawAddonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
    const addonDiscountMultiplier = selectedSize?.isSmallSize ? 0.5 : 1;
    const addonTotal = rawAddonsTotal * addonDiscountMultiplier;

    // 3. Subtotal before discount
    const preDiscountTotal = baseTotal + addonTotal;
    
    // 4. Apply Discount Logic (Calculation Order: Percent -> Fixed -> Threshold)
    let subTotal = preDiscountTotal;
    const thresholdErrors: string[] = [];

    // Sort: Percent -> Fixed -> Threshold
    const sortedDiscounts = [...appliedDiscounts].sort((a, b) => {
        const order = { percent: 1, fixed: 2, threshold: 3 };
        return order[a.type] - order[b.type];
    });

    sortedDiscounts.forEach(d => {
        const currentTotal = subTotal; // "rawTotal" for this step
        
        if (d.type === 'percent') {
            subTotal = currentTotal * d.value;
        } else if (d.type === 'fixed') {
            subTotal = Math.max(0, currentTotal - d.value);
        } else if (d.type === 'threshold') {
            if (currentTotal >= (d.threshold || 0)) {
                subTotal = Math.max(0, currentTotal - d.value);
            } else {
                thresholdErrors.push(`还差 ¥${Math.floor((d.threshold || 0) - currentTotal)} 才能用【${d.label}】哦`);
            }
        }
    });

    // 5. Rush Fee (Based on Subtotal)
    const rushMultiplier = selectedRush ? selectedRush.multiplier : 0;
    const rushFeeAmount = Math.ceil(subTotal * rushMultiplier);

    // 6. Packaging Fee (Fixed)
    const packagingFee = selectedPackaging ? selectedPackaging.price : 0;

    // 7. Final Calculation
    const actualDiscountAmount = preDiscountTotal - subTotal;
    const finalPrice = Math.floor(subTotal + rushFeeAmount + packagingFee);

    return {
      breakdown: {
        baseTotal,
        craftMultiplier,
        rawAddonsTotal,
        addonDiscountMultiplier,
        addonTotal,
        subTotal,
        discountAmount: actualDiscountAmount,
        rushFeeAmount,
        packagingFee,
        thresholdErrors
      },
      finalPrice
    };
  }, [selectedSize, selectedCraft, selectedAddons, selectedRush, selectedPackaging, appliedDiscounts]);

  const hasComplexItems = useMemo(() => {
    if (selectedSize && isComplexPrice(selectedSize.priceStr)) return true;
    if (selectedCraft && isComplexPrice(selectedCraft.priceStr)) return true;
    if (selectedAddons.some(addon => isComplexPrice(addon.priceStr))) return true;
    if (selectedRush && isComplexPrice(selectedRush.feeStr)) return true;
    return false;
  }, [selectedSize, selectedCraft, selectedAddons, selectedRush]);

  // Actions
  const selectSize = (item: any) => {
    setSelectedSize({
      category: 'Size',
      name: item.name,
      priceStr: item.price,
      price: item.priceNum,
      isSmallSize: item.isSmallSize || false
    });
    if (consultationMode) setConsultationMode(false);
  };

  const selectCraft = (item: any) => {
    if (selectedCraft?.name === item.name) {
      setSelectedCraft(null);
    } else {
      setSelectedCraft({
        category: 'Structure',
        name: item.name,
        priceStr: item.price,
        price: item.priceNum,
        multiplier: item.multiplier || 1
      });
    }
  };

  const toggleAddon = (category: string, name: string, priceStr: string, priceNum: number) => {
    setSelectedAddons(prev => {
      const exists = prev.find(item => item.name === name && item.category === category);
      if (exists) {
        return prev.filter(item => item !== exists);
      } else {
        return [...prev, { category, name, priceStr, price: priceNum }];
      }
    });
    if (consultationMode) setConsultationMode(false);
  };

  const removeAddon = (category: string, name: string) => {
    setSelectedAddons(prev => prev.filter(item => !(item.name === name && item.category === category)));
  };

  const selectRush = (item: any) => {
    if (selectedRush?.name === item.name) {
      setSelectedRush(null);
    } else {
      setSelectedRush({
        id: item.id,
        name: item.name,
        multiplier: item.multiplier,
        feeStr: item.fee
      });
    }
  };

  const selectPackaging = (item: any) => {
    setSelectedPackaging({
      title: item.title,
      price: item.priceNum
    });
  };

  const clearOrder = () => {
    setSelectedSize(null);
    setSelectedCraft(null);
    setSelectedAddons([]);
    setSelectedRush(null);
    setSelectedPackaging(null);
    setAppliedDiscounts([]);
    setConsultationMode(false);
    setDiscountNotification(null);
  };

  return (
    <OrderContext.Provider value={{
      selectedSize,
      selectedCraft,
      selectedAddons,
      selectedRush,
      selectedPackaging,
      appliedDiscounts,
      isModalOpen,
      consultationMode,
      discountNotification,
      
      selectSize,
      selectCraft,
      toggleAddon,
      removeAddon,
      selectRush,
      selectPackaging,
      
      clearOrder,
      addDiscount,
      removeDiscount,
      setConsultationMode,
      toggleModal: setIsModalOpen,
      clearNotification,
      
      breakdown: priceCalculation.breakdown,
      finalPrice: priceCalculation.finalPrice,
      hasComplexItems
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
