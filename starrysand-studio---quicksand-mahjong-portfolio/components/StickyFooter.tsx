import React, { useState } from 'react';
import { MessageCircle, ExternalLink, Check, Copy, ShoppingBag, Trash2, HelpCircle } from 'lucide-react';
import { CONTACT_INFO, CONSULTATION_CONTENT } from '../content';
import { useOrder } from '../contexts/OrderContext';

const StickyFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { finalPrice, selectedSize, toggleModal, hasComplexItems, consultationMode, clearOrder } = useOrder();

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_INFO.wechatId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const showEstimateBar = selectedSize || consultationMode;

  return (
    <>
      {/* Spacer to prevent content from being hidden behind footer */}
      <div className="h-24 md:h-36"></div>
      
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:pb-6 md:px-0 pointer-events-none">
        <div className="max-w-screen-md mx-auto pointer-events-auto flex flex-col gap-3">
          
          {/* FLOATING ESTIMATE BAR - Only shows when a size is selected or consultation mode is active */}
          {showEstimateBar && (
            <div className="animate-slide-up flex gap-2">
              <button 
                onClick={() => toggleModal(true)}
                className={`flex-1 rounded-2xl md:rounded-full p-2 pl-6 pr-3 shadow-2xl flex items-center justify-between border transition-all ${consultationMode ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-900 border-gray-700/50 text-white hover:bg-gray-800'}`}
              >
                 <div className="flex flex-col text-left">
                    <span className="text-xs opacity-70 font-medium">
                      {consultationMode ? '当前状态 (Status)' : '当前预估 (Estimated)'}
                    </span>
                    <span className="text-xl font-bold flex items-center gap-1">
                      {consultationMode ? (
                        <span className="flex items-center gap-2">✨ 深度定制咨询</span>
                      ) : (
                        <>
                          ¥ {finalPrice} 
                          {hasComplexItems && <span className="text-xs font-normal text-yellow-500 border border-yellow-500/50 px-1 rounded ml-1">含待询价项</span>}
                        </>
                      )}
                    </span>
                 </div>
                 <div className={`px-5 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${consultationMode ? 'bg-white text-indigo-600' : 'bg-white text-gray-900'}`}>
                    {consultationMode ? <HelpCircle className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    {consultationMode ? '查看需求' : '查看清单'}
                 </div>
              </button>
              
              <button 
                onClick={clearOrder}
                className="w-14 bg-white border border-gray-200 rounded-2xl md:rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                title="清空订单"
              >
                 <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STANDARD FOOTER */}
          <div className="bg-white/90 backdrop-blur-lg border border-primary-100 shadow-2xl shadow-primary-900/10 rounded-2xl md:rounded-full p-2 flex items-center justify-between gap-2 md:gap-4">
            
            {/* Copy WeChat Button */}
            <button 
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-white border border-gray-100 text-gray-700 py-3 px-4 rounded-xl md:rounded-full transition-all active:scale-95 group"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-primary-100 text-primary-500 group-hover:bg-primary-500 group-hover:text-white'}`}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </div>
              <div className="text-left flex flex-col justify-center">
                <span className="text-xs text-gray-400 font-medium">添加工坊主</span>
                <span className="text-sm font-bold leading-none">{copied ? '已复制微信号' : '复制微信号'}</span>
              </div>
            </button>

            {/* Jump to Official Account Button */}
            <a 
              href={CONTACT_INFO.officialAccountLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-primary-600 text-white py-3 px-4 rounded-xl md:rounded-full transition-all shadow-lg shadow-gray-300 hover:shadow-primary-200 active:scale-95"
            >
              <div className="text-right flex flex-col justify-center items-end">
                <span className="text-xs text-white/60 font-medium">私域福利</span>
                <span className="text-sm font-bold leading-none">跳转公众号</span>
              </div>
              <ExternalLink className="w-5 h-5 ml-1" />
            </a>

          </div>
        </div>
      </div>
    </>
  );
};

export default StickyFooter;