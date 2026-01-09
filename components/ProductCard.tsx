import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { Layers, Search } from 'lucide-react';

/**
 * 判断是否为视频链接的工具函数
 */
const isVideo = (url: string) => {
  return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.startsWith('data:video');
};

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStart = () => {
    timerRef.current = setTimeout(() => {
      setIsLongPressed(true);
    }, 400); 
  };

  const handleEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLongPressed(false);
  };

  const renderMedia = (url: string, className: string, isCover = true) => {
    if (isVideo(url)) {
      return (
        <video 
          src={url}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          className={`${className} ${isCover ? 'object-cover' : 'object-contain'}`}
        />
      );
    }
    return (
      <img 
        src={url} 
        alt={product.codeName} 
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className={`${className} ${isCover ? 'object-cover' : 'object-contain'} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    );
  };

  return (
    <div 
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 relative top-0 hover:-top-1 h-full flex flex-col"
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={handleEnd}
      onMouseDown={handleStart} 
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-gray-500 text-xs font-mono px-2 py-1 rounded border border-gray-200 pointer-events-none">
        {product.archiveId}
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-primary-50">
        {/* 全貌视图（长按时显示）*/}
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-500 ease-in-out ${isLongPressed ? 'opacity-100' : 'opacity-0'}`}>
           {renderMedia(product.imageUrl, "w-full h-full p-2", false)}
        </div>

        {/* 氛围视图（默认显示）*/}
        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${isLongPressed ? 'opacity-0' : 'opacity-100'} ${!isLoaded ? 'blur-lg scale-110' : 'blur-0 scale-100'}`}>
           {renderMedia(product.imageUrl, "w-full h-full")}
        </div>
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center z-30">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
             <Search className="w-4 h-4 text-gray-700" />
             <span className="text-sm font-medium text-gray-700">调阅档案</span>
          </div>
        </div>
      </div>

      <div className="p-4 relative flex-1 flex flex-col">
        <div className="absolute -top-6 right-4 rotate-12 opacity-80 pointer-events-none z-10">
          <div className="border-2 border-gray-300 text-gray-300 text-[10px] font-bold px-2 py-1 uppercase rounded-sm tracking-widest bg-transparent group-hover:border-primary-300 group-hover:text-primary-300 transition-colors">
            CASE
          </div>
        </div>
        <div className="mb-2">
           <h3 className="text-base font-bold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">{product.codeName}</h3>
           <p className="text-xs text-gray-400 mt-0.5 font-mono uppercase tracking-wider line-clamp-1">{product.title}</p>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded font-medium whitespace-nowrap">#{tag}</span>
          ))}
        </div>
        <div className="mt-auto pt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-[10px] text-gray-400">
          <div className="flex items-center gap-1"><Layers className="w-3 h-3" /><span>{product.craftParams.techniques[0]}</span></div>
          <span className="md:inline hidden">详情 &gt;</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
