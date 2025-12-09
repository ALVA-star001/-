import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, CheckCircle, Tag, AlertCircle, Sparkles, Send, Calculator, Trash2, ChevronDown, ShieldAlert, Lock, Unlock, Video, MessageCircle, ShoppingBag, ExternalLink, ArrowRight, Store, HeartHandshake, Clock, QrCode } from 'lucide-react';
import { useOrder } from '../contexts/OrderContext';
import { CONSULTATION_CONTENT, DISCLAIMER_CONTENT, CONTACT_INFO, CHECKOUT_CONTENT } from '../content';

const CheckoutModal: React.FC = () => {
  const { 
    isModalOpen, toggleModal, 
    selectedSize, selectedAddons, selectedCraft, selectedRush, selectedPackaging,
    appliedDiscounts, addDiscount, removeDiscount, discountNotification, clearNotification,
    breakdown, finalPrice, 
    consultationMode, removeAddon
  } = useOrder();

  const [copied, setCopied] = useState(false);
  const [wechatCopied, setWechatCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  
  // Disclaimer & Signature State
  const [isContractSigned, setIsContractSigned] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  // Clear notification and reset signature on unmount or close
  useEffect(() => {
    if (!isModalOpen) {
      clearNotification();
      setInputCode('');
      setIsContractSigned(false);
      setSliderValue(0);
      setExpandedSection(null);
      setCopied(false);
      setWechatCopied(false);
    }
  }, [isModalOpen, clearNotification]);

  const handleAddDiscount = () => {
    if (inputCode.trim()) {
      addDiscount(inputCode);
      setInputCode('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddDiscount();
    }
  };

  // Slider Logic
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setSliderValue(val);
    if (val >= 100) {
      setIsContractSigned(true);
    }
  };

  const handleSliderEnd = () => {
    if (sliderValue < 100) {
      setSliderValue(0);
    }
  };

  const toggleAccordion = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!isModalOpen) return null;

  const handleCopyOrder = () => {
    let text = "";
    const T = CHECKOUT_CONTENT.copyTemplate;

    // CONSULTATION MODE TEXT
    if (consultationMode) {
      text = CONSULTATION_CONTENT.copyTemplate;
      if (selectedSize || selectedAddons.length > 0) {
        text += `\n\n[参考意向]：`;
        if (selectedSize) text += `\n尺寸: ${selectedSize.name}`;
        if (selectedCraft) text += `\n工艺: ${selectedCraft.name}`;
        if (selectedAddons.length > 0) text += `\n装饰: ${selectedAddons.map(a => a.name).join(', ')}`;
      }
    } 
    // STANDARD ORDER TEXT
    else {
      text = T.intro;
      text += T.separator;
      
      if (selectedSize) {
        text += `${T.size}${selectedSize.name} (${selectedSize.priceStr})\n`;
      }
      
      if (selectedCraft) {
        text += `${T.craft}${selectedCraft.name} (${selectedCraft.priceStr})\n`;
      }

      if (selectedAddons.length > 0) {
        text += T.addons;
        selectedAddons.forEach(addon => {
          text += `  - ${addon.name} (${addon.priceStr})\n`;
        });
      }

      if (selectedRush) {
        text += `${T.rush}${selectedRush.name} (${selectedRush.feeStr})\n`;
      }

      if (selectedPackaging && selectedPackaging.price > 0) {
        text += `${T.pack}${selectedPackaging.title} (+${selectedPackaging.price}r)\n`;
      }

      if (appliedDiscounts.length > 0) {
        text += T.coupon;
        appliedDiscounts.forEach(d => {
           text += `  - ${d.label} [${d.code}]\n`;
        });
      }

      text += T.separator;
      
      // Price Logic
      text += T.systemTitle;
      text += `${T.base}${breakdown.baseTotal}r\n`;
      text += `${T.decor}${breakdown.addonTotal}r ${breakdown.addonDiscountMultiplier < 1 ? '(小尺寸半价)' : ''}\n`;
      if (breakdown.discountAmount > 0) text += `${T.discount}-${Math.floor(breakdown.discountAmount)}r\n`;
      text += `${T.subtotal}${breakdown.subTotal}r\n`;
      if (breakdown.rushFeeAmount > 0) text += `${T.rushFee}+${breakdown.rushFeeAmount}r\n`;
      if (breakdown.packagingFee > 0) text += `${T.packFee}+${breakdown.packagingFee}r\n`;
      
      text += `${T.final}${finalPrice}r\n`;
      text += T.disclaimer;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyWeChat = () => {
    navigator.clipboard.writeText(CONTACT_INFO.wechatId).then(() => {
      setWechatCopied(true);
      setTimeout(() => setWechatCopied(false), 2000);
    });
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={() => toggleModal(false)}
    >
      <div 
        className={`bg-white w-full rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh] md:max-h-[85vh] transition-all duration-300 ${consultationMode ? 'md:max-w-4xl' : 'md:max-w-xl'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 border-b flex justify-between items-center ${consultationMode ? 'bg-indigo-50 border-indigo-100' : 'bg-gray-50/80 border-gray-100'}`}>
          <div>
            <h3 className={`text-lg font-bold ${consultationMode ? 'text-indigo-900' : 'text-gray-800'}`}>
              {consultationMode ? CONSULTATION_CONTENT.title : CHECKOUT_CONTENT.header.title}
            </h3>
            <p className={`text-xs ${consultationMode ? 'text-indigo-400' : 'text-gray-400'}`}>
              {consultationMode ? CONSULTATION_CONTENT.desc : CHECKOUT_CONTENT.header.subtitle}
            </p>
          </div>
          <button 
            onClick={() => toggleModal(false)}
            className="p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* CONSULTATION MODE VIEW */}
        {/* ========================================================= */}
        {consultationMode ? (
          <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1">
             <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
               
               {/* Left Column: The Guide */}
               <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
                   {CONSULTATION_CONTENT.modal.headline}
                 </h2>
                 <div className="space-y-4 text-gray-600 mb-6 text-sm leading-relaxed">
                   {CONSULTATION_CONTENT.modal.intro.map((p, i) => <p key={i}>{p}</p>)}
                   <ul className="list-disc pl-5 space-y-2 text-indigo-700 font-medium bg-indigo-50 p-4 rounded-xl">
                      {CONSULTATION_CONTENT.modal.list.map((item, i) => <li key={i}>{item}</li>)}
                   </ul>
                 </div>
                 
                 <div className="bg-gray-900 text-white text-xs px-4 py-3 rounded-lg font-bold inline-flex items-center gap-2 mb-4 shadow-lg shadow-gray-200">
                    <QrCode className="w-4 h-4" />
                    {CONSULTATION_CONTENT.modal.cta}
                 </div>
                 
                 <p className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-3">
                   {CONSULTATION_CONTENT.modal.ps}
                 </p>
               </div>

               {/* Right Column: Crystal Card */}
               <div className="relative group perspective-1000 w-full max-w-sm mx-auto">
                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                 <div className="relative aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-between p-8 border border-white/10">
                    
                    {/* Background Stars */}
                    <div 
                      className="absolute inset-0 opacity-40 z-0"
                      style={{ 
                        backgroundImage: `url(${CONSULTATION_CONTENT.modal.card.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-0"></div>

                    {/* Header: Avatar */}
                    <div className="relative z-10 text-center">
                       <div className="w-20 h-20 rounded-full border-2 border-indigo-300 p-1 mx-auto mb-3 shadow-lg shadow-indigo-500/20 bg-gray-800">
                         <img src={CONSULTATION_CONTENT.modal.card.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                       </div>
                       <h3 className="text-white font-bold text-lg">{CONSULTATION_CONTENT.modal.card.name}</h3>
                       <p className="text-indigo-300 text-xs font-mono">{CONSULTATION_CONTENT.modal.card.title}</p>
                    </div>

                    {/* Middle: Magic Circle & QR */}
                    <div className="relative z-10 w-48 h-48 flex items-center justify-center">
                       {/* Spinning Magic Circle Ring (CSS Animation) */}
                       <div className="absolute inset-0 border-2 border-dashed border-indigo-400/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                       <div className="absolute inset-2 border border-dotted border-purple-400/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                       
                       {/* QR Code Placeholder */}
                       <div className="w-32 h-32 bg-white p-2 rounded-lg shadow-inner">
                          {/* In a real app, replace with actual QR code image */}
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 text-center break-all">
                             <QrCode className="w-16 h-16 text-gray-800" />
                          </div>
                       </div>
                    </div>

                    {/* Footer: ID & Caption */}
                    <div className="relative z-10 text-center w-full">
                       <div className="bg-white/10 backdrop-blur-md rounded-lg py-2 px-3 mb-2 border border-white/5">
                         <p className="text-white font-mono text-xs tracking-wider">{CONSULTATION_CONTENT.modal.card.id}</p>
                       </div>
                       <p className="text-[10px] text-gray-400">
                         {CONSULTATION_CONTENT.modal.card.caption}
                       </p>
                    </div>

                 </div>
               </div>

             </div>
          </div>
        ) : (
        // =========================================================
        // STANDARD CHECKOUT VIEW
        // =========================================================
        <>
          <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
            
            {/* 1. Order List */}
            <div className="space-y-4 mb-8">
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{CHECKOUT_CONTENT.labels.orderDetails}</h4>
              
              {/* Size & Base */}
              {selectedSize ? (
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">🖼️</div>
                     <div>
                       <div className="font-bold text-gray-800">{selectedSize.name}</div>
                       <div className="text-xs text-gray-500">{selectedSize.priceStr}</div>
                     </div>
                  </div>
                  <button onClick={() => { toggleModal(false); window.location.href='#process'; }} className="text-xs text-primary-500 hover:underline">修改</button>
                </div>
              ) : (
                <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">{CHECKOUT_CONTENT.labels.noSize}</div>
              )}

              {/* Structure / Craft */}
              {selectedCraft && (
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">🛠️</div>
                     <div>
                       <div className="font-bold text-gray-800">{selectedCraft.name}</div>
                       <div className="text-xs text-gray-500">{selectedCraft.priceStr}</div>
                     </div>
                  </div>
                  <button onClick={() => { toggleModal(false); window.location.href='#process'; }} className="text-xs text-primary-500 hover:underline">修改</button>
                </div>
              )}

              {/* Addons List */}
              {selectedAddons.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <div className="flex items-center gap-2 mb-3">
                     <Sparkles className="w-4 h-4 text-primary-500" />
                     <span className="font-bold text-gray-800 text-sm">{CHECKOUT_CONTENT.labels.addons}</span>
                   </div>
                   <div className="space-y-2">
                     {selectedAddons.map((addon, idx) => (
                       <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            {addon.name}
                          </span>
                          <div className="flex items-center gap-3">
                             <span className="text-gray-400 font-mono">{addon.priceStr}</span>
                             <button onClick={() => removeAddon(addon.category, addon.name)} className="text-gray-300 hover:text-red-500 transition-colors">
                               <Trash2 className="w-3 h-3" />
                             </button>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              )}

              {/* Rush & Packaging */}
              {(selectedRush || selectedPackaging) && (
                <div className="grid grid-cols-2 gap-3">
                   {selectedRush && (
                     <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 flex flex-col justify-center">
                        <div className="text-xs text-orange-400 font-bold mb-1">{CHECKOUT_CONTENT.labels.rush}</div>
                        <div className="text-sm font-bold text-orange-700">{selectedRush.name}</div>
                        <div className="text-xs text-orange-500">{selectedRush.feeStr}</div>
                     </div>
                   )}
                   {selectedPackaging && (
                     <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex flex-col justify-center">
                        <div className="text-xs text-blue-400 font-bold mb-1">{CHECKOUT_CONTENT.labels.packaging}</div>
                        <div className="text-sm font-bold text-blue-700 truncate">{selectedPackaging.title}</div>
                        <div className="text-xs text-blue-500">+{selectedPackaging.price}r</div>
                     </div>
                   )}
                </div>
              )}
            </div>

            {/* 2. Price Breakdown */}
            <div className="mb-8 relative">
              <div className="absolute left-0 right-0 top-1/2 -z-10 border-t border-dashed border-gray-200"></div>
              <div className="bg-white px-2 w-fit mx-auto text-xs text-gray-400 flex items-center gap-1">
                 <Calculator className="w-3 h-3" /> {CHECKOUT_CONTENT.labels.formula}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>{CHECKOUT_CONTENT.labels.baseCraft}</span>
                  <span>{breakdown.baseTotal}r</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>{CHECKOUT_CONTENT.labels.addonTotal} {breakdown.addonDiscountMultiplier < 1 && <span className="text-xs text-primary-500 bg-primary-50 px-1 rounded">{CHECKOUT_CONTENT.labels.smallSizeDiscount}</span>}</span>
                  <span>{breakdown.addonTotal}r</span>
                </div>
                {breakdown.rushFeeAmount > 0 && (
                  <div className="flex justify-between text-orange-500">
                    <span>{CHECKOUT_CONTENT.labels.rushFee}</span>
                    <span>+{breakdown.rushFeeAmount}r</span>
                  </div>
                )}
                {breakdown.packagingFee > 0 && (
                   <div className="flex justify-between text-blue-500">
                    <span>{CHECKOUT_CONTENT.labels.packFee}</span>
                    <span>+{breakdown.packagingFee}r</span>
                  </div>
                )}
                
                {breakdown.discountAmount > 0 && (
                   <div className="flex justify-between text-red-500 font-bold">
                    <span>{CHECKOUT_CONTENT.labels.discount}</span>
                    <span>-{Math.floor(breakdown.discountAmount)}r</span>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-3 mt-3 flex justify-between items-end">
                   <span className="text-gray-800 font-bold">{CHECKOUT_CONTENT.labels.total}</span>
                   <span className="text-3xl font-bold text-primary-600 leading-none">
                     <span className="text-sm text-gray-400 font-normal mr-1">¥</span>{finalPrice}
                   </span>
                </div>
              </div>
            </div>

            {/* 3. Discount Input */}
            <div className="mb-8 bg-gray-50 p-1 rounded-xl flex items-center">
               <div className="pl-3 text-gray-400"><Tag className="w-4 h-4" /></div>
               <input 
                 type="text" 
                 placeholder={CHECKOUT_CONTENT.labels.inputPlaceholder}
                 className="flex-1 bg-transparent border-none text-sm px-3 py-2 focus:ring-0 text-gray-800 placeholder-gray-400"
                 value={inputCode}
                 onChange={(e) => setInputCode(e.target.value)}
                 onKeyDown={handleKeyDown}
               />
               <button 
                 onClick={handleAddDiscount}
                 className="bg-white shadow-sm border border-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-lg hover:text-primary-500 transition-colors"
               >
                 {CHECKOUT_CONTENT.labels.redeem}
               </button>
            </div>

            {/* Discount Notification */}
            {discountNotification && (
              <div className={`mb-6 p-3 rounded-xl text-sm flex items-center gap-2 animate-fade-in ${
                discountNotification.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' :
                discountNotification.type === 'error' ? 'bg-red-50 text-red-700 border border-red-100' :
                'bg-blue-50 text-blue-700 border border-blue-100'
              }`}>
                 {discountNotification.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                 {discountNotification.message}
              </div>
            )}
            
            {/* Active Discounts Tags */}
            {appliedDiscounts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {appliedDiscounts.map((discount, idx) => (
                  <div key={idx} className="bg-red-50 border border-red-100 text-red-500 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                     <span>{discount.label}</span>
                     <button onClick={() => removeDiscount(discount.code)} className="hover:text-red-700"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Disclaimer & Contract (Accordion) */}
            {selectedSize && (
              <div className="mb-8 border border-gray-200 rounded-2xl overflow-hidden">
                 <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                   <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                     <ShieldAlert className="w-4 h-4 text-gray-500" />
                     {CHECKOUT_CONTENT.labels.disclaimerTitle}
                   </h4>
                   <div className="text-[10px] text-gray-400">{CHECKOUT_CONTENT.labels.readSign}</div>
                 </div>
                 
                 <div className="divide-y divide-gray-100">
                   {Object.entries(DISCLAIMER_CONTENT).filter(([key]) => key !== 'slideText' && key !== 'slideSuccessText').map(([key, section]: [string, any]) => (
                     <div key={key} className="bg-white">
                        <button 
                          onClick={() => toggleAccordion(key)}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                        >
                           <div>
                              <div className="text-xs font-bold text-gray-700">{section.title}</div>
                              <div className="text-[10px] text-gray-400">{section.summary}</div>
                           </div>
                           <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${expandedSection === key ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedSection === key && (
                          <div className="px-4 py-3 bg-gray-50/50 text-xs text-gray-500 leading-relaxed animate-fade-in space-y-2">
                             {section.intro && <p className="mb-2 italic">{section.intro}</p>}
                             {section.content?.map((item: any, i: number) => (
                               <div key={i} className={`p-2 rounded ${item.highlight ? 'bg-red-50 text-red-600 border border-red-100' : ''}`}>
                                 {item.title && <span className="font-bold block mb-1">{item.title}</span>}
                                 {item.text}
                               </div>
                             ))}
                             {section.steps && (
                               <ol className="list-decimal list-inside space-y-1 mt-2">
                                 {section.steps.map((step: string, i: number) => <li key={i}>{step}</li>)}
                               </ol>
                             )}
                             {section.promiseText && (
                               <div className="mt-3 bg-green-50 p-2 rounded border border-green-100 text-green-700">
                                 <div className="font-bold mb-1">{section.promiseTitle}</div>
                                 {section.promiseText}
                               </div>
                             )}
                          </div>
                        )}
                     </div>
                   ))}
                 </div>

                 {/* SLIDER SIGNATURE */}
                 <div className="p-6 bg-gradient-to-b from-white to-gray-50" id="contract-slider">
                    <div className="relative h-12 rounded-full bg-gray-200 overflow-hidden shadow-inner flex items-center">
                       {/* Text Label */}
                       <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold transition-opacity duration-300 ${isContractSigned ? 'text-green-600' : 'text-gray-400'}`}>
                          {isContractSigned ? DISCLAIMER_CONTENT.slideSuccessText : DISCLAIMER_CONTENT.slideText}
                       </div>

                       {/* Progress Fill */}
                       <div 
                         className={`absolute left-0 top-0 bottom-0 bg-green-400 transition-all duration-100 opacity-20`} 
                         style={{ width: `${sliderValue}%` }}
                       ></div>

                       {/* The Input Range */}
                       <input 
                          ref={sliderRef}
                          type="range" 
                          min="0" 
                          max="100" 
                          value={isContractSigned ? 100 : sliderValue} 
                          onChange={handleSliderChange}
                          onTouchEnd={handleSliderEnd}
                          onMouseUp={handleSliderEnd}
                          disabled={isContractSigned}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                       />

                       {/* The Handle Visual */}
                       <div 
                          className={`absolute top-1 bottom-1 w-10 rounded-full shadow-md flex items-center justify-center transition-all duration-100 z-10 pointer-events-none
                            ${isContractSigned ? 'bg-green-500 text-white right-1' : 'bg-white text-gray-400 left-1'}
                          `}
                          style={!isContractSigned ? { left: `calc(${sliderValue}% - ${sliderValue * 0.4}px)` } : {}}
                       >
                          {isContractSigned ? <Lock className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* Workshop Schedule Notice */}
            <div className="mt-6 border border-gray-100 bg-gray-50/80 rounded-2xl p-4 text-xs">
               <div className="flex items-center gap-2 mb-3 text-gray-700 font-bold border-b border-gray-100 pb-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{CHECKOUT_CONTENT.schedule.title}</span>
               </div>
               <ul className="space-y-2 text-gray-500 mb-3">
                 {CHECKOUT_CONTENT.schedule.items.map((item, idx) => (
                   <li key={idx} className="flex items-start gap-2">
                     <span className="shrink-0">{item.icon}</span>
                     <span><span className="font-bold text-gray-600">{item.label}</span>{item.text}</span>
                   </li>
                 ))}
               </ul>
               <div className="text-center text-primary-400/80 italic scale-90">
                 {CHECKOUT_CONTENT.schedule.footer}
               </div>
            </div>
            
            {/* Spacer for bottom area */}
            <div className="h-4"></div>
          </div>

          {/* 3-BUTTON FOOTER (Standard Mode) */}
          <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20 safe-area-bottom">
             <div className="grid grid-cols-3 gap-2 md:gap-3 items-stretch">
                
                {/* Button 1: Copy Order */}
                <button 
                  onClick={handleCopyOrder}
                  className="group flex flex-col items-center justify-center gap-1 p-2 md:p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 transition-all active:scale-95"
                >
                  <div className={`transition-colors ${copied ? 'text-green-500' : 'text-gray-500 group-hover:text-primary-500'}`}>
                     {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-bold leading-tight">{copied ? CHECKOUT_CONTENT.actions.copy.success : CHECKOUT_CONTENT.actions.copy.label}</span>
                </button>

                {/* Button 2: WeChat */}
                <button 
                  onClick={handleCopyWeChat}
                  className="group relative flex flex-col items-center justify-center gap-1 p-2 md:p-3 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 transition-all active:scale-95 overflow-hidden"
                >
                   <HeartHandshake className="absolute -bottom-2 -right-2 w-8 h-8 text-green-200/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                   
                   <div className={`transition-colors flex items-center gap-1 ${wechatCopied ? 'text-green-600' : 'text-green-600'}`}>
                      {wechatCopied ? <CheckCircle className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                      <span className="text-xs font-bold">{CHECKOUT_CONTENT.actions.wechat.label}</span>
                   </div>
                   
                   <div className="text-[10px] text-green-600/70 scale-90 leading-none">
                      {wechatCopied ? CHECKOUT_CONTENT.actions.wechat.success : CHECKOUT_CONTENT.actions.wechat.sub}
                   </div>
                </button>

                {/* Button 3: Platform */}
                <a 
                  href={CONTACT_INFO.platformLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative flex flex-col items-center justify-center gap-1 p-2 md:p-3 rounded-xl border transition-all active:scale-95 overflow-hidden
                    ${isContractSigned 
                      ? 'bg-gray-900 border-gray-800 text-white shadow-lg hover:shadow-xl hover:bg-gray-800' 
                      : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                  onClick={(e) => {
                    if (!isContractSigned) {
                      e.preventDefault();
                      const slider = document.getElementById('contract-slider');
                      if(slider) {
                          slider.scrollIntoView({behavior: 'smooth', block: 'center'});
                          slider.classList.add('animate-shake');
                          setTimeout(() => slider.classList.remove('animate-shake'), 500);
                      }
                    }
                  }}
                >
                   {isContractSigned && (
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"></div>
                   )}

                   <div className="flex items-center gap-1">
                     {isContractSigned ? <ShoppingBag className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                     <span className="text-xs font-bold">{CHECKOUT_CONTENT.actions.platform.label}</span>
                   </div>
                   
                   <div className={`text-[10px] scale-90 leading-none ${isContractSigned ? 'text-gray-300' : 'text-gray-400'}`}>
                      {CHECKOUT_CONTENT.actions.platform.sub}
                   </div>
                </a>

             </div>

             {/* Helper text if locked */}
             {!isContractSigned && (
               <div className="text-center mt-3 text-[10px] text-gray-400 flex items-center justify-center gap-1 animate-pulse">
                 <ShieldAlert className="w-3 h-3" />
                 <span>{CHECKOUT_CONTENT.actions.platform.lockedHint}</span>
               </div>
             )}
          </div>
        </>
        )}
      </div>

      <style>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 1rem);
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
          border-color: #fca5a5;
          box-shadow: 0 0 0 2px #fee2e2;
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;