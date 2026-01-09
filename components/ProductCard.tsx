import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { Layers, Search } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle Long Press Start
  const handleStart = () => {
    timerRef.current = setTimeout(() => {
      setIsLongPressed(true);
    }, 400); // 400ms threshold for long press
  };

  // Handle Long Press End
  const handleEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsLongPressed(false);
  };

  return (
    <div 
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 relative top-0 hover:-top-1 h-full flex flex-col"
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={handleEnd} // Cancel if user scrolls
      onMouseDown={handleStart} // For desktop testing
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {/* Archive ID Badge */}
      <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-gray-500 text-xs font-mono px-2 py-1 rounded border border-gray-200 pointer-events-none">
        {product.archiveId}
      </div>

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        
        {/* Layer 1: Full View (Contain) - Visible on Long Press */}
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-500 ease-in-out ${isLongPressed ? 'opacity-100' : 'opacity-0'}`}
        >
           <img 
            src={product.imageUrl} 
            alt={product.codeName} 
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Layer 2: Close Up (Cover) - Fades out on Long Press */}
        <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isLongPressed ? 'opacity-0' : 'opacity-100'}`}>
           <img 
            src={product.imageUrl} 
            alt={product.codeName} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110"
          />
        </div>
        
        {/* Hover Overlay - "View File" (Desktop only) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center z-30">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
             <Search className="w-4 h-4 text-gray-700" />
             <span className="text-sm font-medium text-gray-700">调阅档案</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 relative flex-1 flex flex-col">
        {/* Status Stamp */}
        <div className="absolute -top-6 right-4 rotate-12 opacity-80 pointer-events-none z-10">
          <div className="border-2 border-gray-300 text-gray-300 text-[10px] font-bold px-2 py-1 uppercase rounded-sm tracking-widest bg-transparent group-hover:border-primary-300 group-hover:text-primary-300 transition-colors">
            已归档 / CASE
          </div>
        </div>

        <div className="mb-3">
           <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
             {product.codeName}
           </h3>
           <p className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-wider line-clamp-1">
             {product.title}
           </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded font-medium whitespace-nowrap">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-3 border-t border-dashed border-gray-200 flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            <span>{product.craftParams.techniques[0]}</span>
          </div>
          <span className="md:inline hidden">详情 &gt;</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

export default ProductCard;
