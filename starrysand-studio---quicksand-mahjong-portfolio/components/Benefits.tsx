import React from 'react';
import { Gift, Heart, Zap, Star, Palette, Wand2, PartyPopper } from 'lucide-react';
import { BENEFITS_CONTENT } from '../content';

const Benefits: React.FC = () => {
  const { 
    sectionTitle, sectionSubtitle, intro, badge,
    global, special 
  } = BENEFITS_CONTENT;

  const getIcon = (type: string) => {
    switch (type) {
      case 'gift': return <Gift className="w-7 h-7" />;
      case 'heart': return <Heart className="w-7 h-7" />;
      case 'zap': return <Zap className="w-7 h-7" />;
      default: return <Gift className="w-7 h-7" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'gift': return 'bg-red-50 text-red-500';
      case 'heart': return 'bg-pink-50 text-pink-500';
      case 'zap': return 'bg-yellow-50 text-yellow-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-primary-50/30 to-white relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-4 shadow-sm border border-red-100 animate-bounce">
             <PartyPopper className="w-4 h-4" />
             <span>{badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {sectionTitle}
            <span className="text-primary-400 font-light ml-2">{sectionSubtitle}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {intro}
          </p>
        </div>

        {/* Part 1: Global Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {global.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-primary-100 group relative overflow-hidden">
               {item.badge && (
                 <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-md">{item.badge}</div>
               )}
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${getIconColor(item.iconType || '')}`}>
                 {getIcon(item.iconType || '')}
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
               <div className="text-3xl font-bold text-primary-500 mb-4">
                 {item.discount} <span className="text-sm text-gray-400 font-normal">{item.subDiscount}</span>
               </div>
               <p className="text-gray-500 text-sm leading-relaxed">
                 {item.desc}
               </p>
            </div>
          ))}
        </div>

        {/* Part 2: Special Benefit */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-primary-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 text-center mb-10">
             <div className="inline-flex items-center gap-2 text-primary-600 font-bold bg-primary-50 px-4 py-2 rounded-full mb-4 border border-primary-100 shadow-sm">
               <Star className="w-4 h-4 fill-current animate-pulse" />
               {special.badge}
               <Star className="w-4 h-4 fill-current animate-pulse" />
             </div>
             <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{special.title}</h3>
             <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
               {special.desc}
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10 relative z-10">
            {/* Mode 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-white/60 relative hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-500 shadow-sm border border-primary-100">
                {special.mode1.tag}
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-500 mb-4 shadow-sm">
                <Wand2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{special.mode1.title}</h4>
              <p className="text-sm text-gray-600 mb-4 min-h-[40px]">
                {special.mode1.desc}
              </p>
              <ul className="text-sm text-gray-500 space-y-3 mb-4 bg-white/60 p-5 rounded-2xl">
                 {special.mode1.points.map((point, i) => (
                   <li key={i} className="flex gap-2 items-start">
                     <span className="text-purple-400 mt-1">●</span>
                     <span>{point}</span>
                   </li>
                 ))}
              </ul>
            </div>

            {/* Mode 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border border-white/60 relative hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md">
               <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-500 shadow-sm border border-blue-100">
                {special.mode2.tag}
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 mb-4 shadow-sm">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">{special.mode2.title}</h4>
              <p className="text-sm text-gray-600 mb-4 min-h-[40px]">
                {special.mode2.desc}
              </p>
              <ul className="text-sm text-gray-500 space-y-3 mb-4 bg-white/60 p-5 rounded-2xl">
                 {special.mode2.points.map((point, i) => (
                   <li key={i} className="flex gap-2 items-start">
                     <span className="text-blue-400 mt-1">●</span>
                     <span>{point}</span>
                   </li>
                 ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-dashed border-primary-200 relative z-10">
            <h5 className="font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-primary-400 fill-current" />
              {special.reasonTitle}
            </h5>
            <p className="text-sm text-gray-500 max-w-3xl mx-auto italic leading-relaxed">
              {special.reasonDesc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;