
import React from 'react';
import { X, Clock, Ruler, Wrench, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-scale-up"
        onClick={handleContentClick}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-gray-600 hover:text-red-500"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Visuals */}
        <div className="w-full md:w-3/5 bg-gray-100 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200">
              <img 
                src={product.imageUrl} 
                alt={product.codeName} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              {product.galleryImages?.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-gray-200">
                  <img src={img} alt={`Detail ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Archive Decryption */}
        <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col bg-white overflow-y-auto custom-scrollbar">
          
          {/* Header */}
          <div className="mb-8 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3 text-gray-400 text-xs font-mono uppercase tracking-widest mb-2">
              <span>Archive Report</span>
              <span className="w-px h-3 bg-gray-300"></span>
              <span>{product.archiveId}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.codeName}</h2>
            <p className="text-primary-500 font-medium">{product.title}</p>
          </div>

          {/* Craft Parameters */}
          <div className="space-y-6 mb-8">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              工艺参数
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Ruler className="w-3 h-3" />
                  <span>尺寸规格</span>
                </div>
                <div className="font-semibold text-gray-700">{product.craftParams.size}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                  <Clock className="w-3 h-3" />
                  <span>制作耗时</span>
                </div>
                <div className="font-semibold text-gray-700">{product.craftParams.time}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
               <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>工艺技法</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.craftParams.techniques.map((tech, idx) => (
                    <span key={idx} className="text-xs border border-gray-200 bg-white px-2 py-1 rounded text-gray-600">
                      {tech}
                    </span>
                  ))}
                </div>
            </div>
          </div>

          {/* Story Description */}
          <div className="mb-10 flex-grow">
             <h3 className="text-sm font-bold text-gray-900 mb-3">灵感档案</h3>
             <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
               {product.fullDescription || product.description}
             </p>
          </div>

          {/* Footer / CTA */}
          <div className="mt-auto pt-6 border-t border-gray-100">
             <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-xs font-medium mb-3">
                  <Lock className="w-3 h-3" />
                  <span>此档案已封存，不可直接购买</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 px-2">
                   但如果你也被这份“{product.codeName.split('·')[0]}”打动，或者有属于你自己的颜色想要封存……
                </p>
                
                <button className="w-full bg-gray-900 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-primary-200 flex items-center justify-center gap-2 group">
                   <span>发起你的专属委托</span>
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
