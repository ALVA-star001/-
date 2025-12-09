import React from 'react';
import { Plus, Hammer } from 'lucide-react';

const FutureCard: React.FC = () => {
  return (
    <div className="group h-full min-h-[400px] rounded-3xl border-2 border-dashed border-primary-200 hover:border-primary-400 bg-primary-50/30 hover:bg-primary-50 transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer relative overflow-hidden">
      
      {/* Animated background circle */}
      <div className="absolute w-64 h-64 bg-primary-100 rounded-full filter blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>

      <div className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-sm group-hover:shadow-md flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300">
        <Plus className="w-8 h-8 text-primary-400" />
      </div>

      <h3 className="relative z-10 text-xl font-bold text-gray-700 mb-2">
        未完待续...
      </h3>
      
      <p className="relative z-10 text-gray-500 text-sm max-w-[200px] mx-auto mb-6">
        这里预留给未来的灵感。也许是滴胶，也许是粘土，一切皆有可能。
      </p>

      <div className="relative z-10 inline-flex items-center gap-2 text-xs font-medium text-primary-500 opacity-60 group-hover:opacity-100 transition-opacity">
        <Hammer className="w-3 h-3" />
        <span>Waiting for creativity</span>
      </div>
    </div>
  );
};

export default FutureCard;