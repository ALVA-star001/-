import React, { useState } from 'react';
import ProductCard from './ProductCard';
import FutureCard from './FutureCard';
import ProductDetailModal from './ProductDetailModal';
import { Product } from '../types';
import { GALLERY_PRODUCTS, GALLERY_CATEGORIES } from '../content';

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeCategory === 'future'
    ? []
    : activeCategory === 'all' 
      ? GALLERY_PRODUCTS 
      : GALLERY_PRODUCTS.filter(p => p.category === activeCategory);

  const showFutureCard = activeCategory === 'all' || activeCategory === 'future';

  return (
    <section id="gallery" className="py-24 bg-primary-50/30">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
          <div className="relative">
            <h2 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
              作品档案 <span className="text-primary-400 font-light text-2xl">/ Gallery</span>
            </h2>
            <p className="text-gray-500 max-w-md">
              每一件作品都是一次对美的实验。这里记录了我所有的灵感碎片与定制故事。
            </p>
            {/* Decoration line */}
            <div className="absolute -left-6 top-2 bottom-2 w-1 bg-primary-200 rounded-full hidden md:block"></div>
          </div>
          
          {/* Category Filter - Sliding Effect */}
          <div className="w-full md:w-auto overflow-hidden">
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:justify-end">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-gray-800 text-white shadow-lg shadow-gray-200 scale-105'
                      : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-primary-500 border border-transparent hover:border-gray-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 
           Product Display Area 
           Mobile: Horizontal Scroll with Snap
           Desktop: Grid
        */}
        <div className="
          flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 -mx-6 px-6 no-scrollbar 
          md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:mx-0 md:pb-0 md:px-0
        ">
          {filteredProducts.map((product) => (
            <div key={product.id} className="min-w-[80vw] md:min-w-0 snap-center h-full">
              <ProductCard 
                product={product} 
                onClick={(p) => setSelectedProduct(p)}
              />
            </div>
          ))}
          
          {/* The "Future" placeholder slot */}
          {showFutureCard && (
            <div id="future" className="min-w-[80vw] md:min-w-0 snap-center h-full">
               <FutureCard />
            </div>
          )}
        </div>
        
        {/* Mobile hint */}
        <div className="md:hidden text-center text-xs text-gray-400 mt-2 animate-pulse">
          &larr; 左右滑动查看更多 · 长按图片查看全貌 &rarr;
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};

export default Gallery;
