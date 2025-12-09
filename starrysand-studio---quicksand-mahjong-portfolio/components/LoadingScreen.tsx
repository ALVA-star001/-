import React, { useEffect, useState } from 'react';
import { LOADING_IMAGES } from '../content';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    // Select a random image on mount
    const img = LOADING_IMAGES[Math.floor(Math.random() * LOADING_IMAGES.length)];
    setRandomImage(img);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
    } else {
      // Delay unmounting for fade-out animation
      const timer = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fff1f2] transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="relative">
        {/* Decorative Circle */}
        <div className="absolute inset-0 bg-white rounded-full scale-110 shadow-xl opacity-50 animate-pulse"></div>
        
        {/* Main Q-Version Image */}
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 bg-white">
          <img 
            src={randomImage} 
            alt="Little Wolf Loading" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Spinning Ring */}
        <div className="absolute -inset-4 border-2 border-dashed border-primary-300 rounded-full animate-[spin_8s_linear_infinite]"></div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 animate-bounce">
          工坊开启中...
        </h2>
        <p className="text-primary-500 font-medium text-sm animate-pulse">
          正在收集掉落的星星碎片 ✨
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;