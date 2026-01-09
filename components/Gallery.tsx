import React, { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import FutureCard from './FutureCard';
import ProductDetailModal from './ProductDetailModal';
import { Product } from '../types';
import { GALLERY_PRODUCTS, GALLERY_CATEGORIES } from '../content';
import { MoveRight } from 'lucide-react';

/**
 * Gallery 组件：档案画廊区块
 * 负责展示工作室过往作品，支持按分类过滤、详情查看，并在移动端提供平滑的滑动体验
 */
const Gallery: React.FC = () => {
  // 活跃的分类 ID，默认为 'all'
  const [activeCategory, setActiveCategory] = useState('all');
  // 当前点击选中的作品，用于打开详情模态框
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // 滚动容器引用，用于监听滚动进度
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // 移动端滑动提示的状态，用户滚动一次后自动消失
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  /**
   * 过滤逻辑：
   * - 如果选中 'future' 分类，列表为空（因为会单独渲染 FutureCard）
   * - 如果选中 'all'，显示所有作品
   * - 否则，根据 category 字段过滤
   */
  const filteredProducts = activeCategory === 'future'
    ? []
    : activeCategory === 'all' 
      ? GALLERY_PRODUCTS 
      : GALLERY_PRODUCTS.filter(p => p.category === activeCategory);

  // 决定是否在列表末尾渲染“敬请期待”占位卡片
  const showFutureCard = activeCategory === 'all' || activeCategory === 'future';
  const totalItems = filteredProducts.length + (showFutureCard ? 1 : 0);

  // 隐藏滑动提示的滚动处理函数
  const handleScroll = () => {
    if (showSwipeHint) setShowSwipeHint(false);
  };

  return (
    <section id="gallery" className="py-24 bg-primary-50/30">
      <div className="container mx-auto px-6">
        
        {/* 头部区域：标题与分类过滤器 */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
          <div className="relative">
            <h2 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">
              作品档案 <span className="text-primary-400 font-light text-2xl">/ Gallery</span>
            </h2>
            <p className="text-gray-500 max-w-md">
              每一件作品都是一次对美的实验。这里记录了我所有的灵感碎片与定制故事。
            </p>
            {/* 装饰线条：仅在桌面端显示 */}
            <div className="absolute -left-6 top-2 bottom-2 w-1 bg-primary-200 rounded-full hidden md:block"></div>
          </div>
          
          {/* 分类过滤器：移动端支持横向滑动，桌面端自动换行对齐 */}
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
           作品展示展示区：
           - 移动端交互：flex 布局 + snap-x 滚动吸附。单张卡片占据 80vw 宽度。
           - 桌面端交互：标准的 grid 4 列网格布局。
        */}
        <div className="relative">
          {/* 滑动提示引导（仅移动端，且有多个项目时显示） */}
          {showSwipeHint && totalItems > 1 && (
            <div className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none animate-pulse flex items-center gap-1 bg-gradient-to-l from-white/90 to-transparent pl-8 pr-2 py-12">
               <span className="text-xs font-bold text-primary-500">滑动查看</span>
               <div className="w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center text-primary-500 animate-bounce-right">
                  <MoveRight className="w-5 h-5" />
               </div>
            </div>
          )}

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="
              flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 -mx-6 px-6 no-scrollbar 
              md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:mx-0 md:pb-0 md:px-0
            "
          >
            {filteredProducts.map((product) => (
              <div key={product.id} className="min-w-[80vw] md:min-w-0 snap-center h-full">
                <ProductCard 
                  product={product} 
                  onClick={(p) => setSelectedProduct(p)}
                />
              </div>
            ))}
            
            {/* 占位符插槽：当分类允许时显示 */}
            {showFutureCard && (
              <div id="future" className="min-w-[80vw] md:min-w-0 snap-center h-full">
                 <FutureCard />
              </div>
            )}
          </div>
        </div>
        
        {/* 移动端简单的滚动进度条：使用 CSS 动画展示当前状态 */}
        <div className="md:hidden w-32 h-1 bg-gray-200 rounded-full mx-auto mt-2 overflow-hidden">
           <div className="w-1/2 h-full bg-primary-300 rounded-full animate-shimmer"></div>
        </div>

      </div>

      {/* 详情弹窗：有选中作品时挂载 */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      
      {/* 局部内联关键帧动画：提示向右滑动的弹跳效果 */}
      <style>{`
        @keyframes bounce-right {
           0%, 100% { transform: translateX(0); }
           50% { transform: translateX(5px); }
        }
        .animate-bounce-right {
           animation: bounce-right 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
