
import React, { useState } from 'react';
import { Copy, X, Star, Check, Gift, Trophy } from 'lucide-react';
import { SHOWCASE_CONTENT, SHOWCASE_DATA } from '../content';
import { ShowcaseItem } from '../types';

interface LightboxProps {
  item: ShowcaseItem;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose }) => {
  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-lg animate-fade-in"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
      >
        <X className="w-6 h-6" />
      </button>
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={item.img} alt={`Showcase by ${item.author}`} className="w-full h-full object-contain rounded-lg shadow-2xl" />
      </div>
    </div>
  );
};

interface ShowcaseCardProps {
  item: ShowcaseItem;
  onSelect: (item: ShowcaseItem) => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ item, onSelect }) => {
  const isOfficial = item.tag === 'OFFICIAL';

  return (
    <div className="mb-6 break-inside-avoid cursor-pointer group" onClick={() => onSelect(item)}>
      <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-primary-500/20 transition-all duration-300">
        <img 
          src={item.img} 
          alt={`Showcase by ${item.author}`} 
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden shrink-0 border-2 border-white/50">
               {item.avatar && <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />}
             </div>
             <div>
                <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm leading-tight">{item.author}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold leading-none
                      ${isOfficial ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-300 text-gray-700'}
                    `}>
                        {item.tag}
                    </span>
                </div>
             </div>
          </div>
           <p className="text-xs italic mt-2 opacity-80 line-clamp-2">“{item.comment}”</p>
        </div>
      </div>
    </div>
  );
};


const Showcase: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const [copied, setCopied] = useState(false);
  const { sectionTitle, sectionSubtitle, intro, ticker, cta } = SHOWCASE_CONTENT;

  const handleCopy = () => {
    navigator.clipboard.writeText('#小狼工坊');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section id="star-echo" className="py-24 bg-gray-900 text-white overflow-hidden">
        
        {/* NEW REWARDS SECTION */}
        <div className="container mx-auto px-6 mb-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* 星火奖 Card */}
            <div className="bg-gray-800/50 border border-primary-500/20 rounded-2xl p-6 flex items-start gap-5 hover:bg-gray-800 transition-colors">
              <div className="w-12 h-12 bg-primary-500/20 text-primary-300 rounded-lg flex items-center justify-center shrink-0">
                 <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">✨ 【星火奖】· 被看见的微光</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  只要你的返图被小狼官网收录：
                  立即获得 <span className="text-yellow-300 font-bold">¥20 无门槛星尘金</span>
                  <br/>
                  <span className="opacity-70">(不玩虚的折扣，直接当钱花！)</span>
                </p>
              </div>
            </div>

            {/* 星灵奖 Card */}
            <div className="bg-gray-800/50 border border-yellow-400/20 rounded-2xl p-6 flex items-start gap-5 hover:bg-gray-800 transition-colors">
               <div className="w-12 h-12 bg-yellow-400/20 text-yellow-300 rounded-lg flex items-center justify-center shrink-0">
                 <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">🏆 【星灵奖】· 命运的垂青</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  所有入选星火奖的作者，年底自动进入“免单锦鲤池”。
                  我们将在工坊纪念日，公开抽取一位幸运儿，送出 <span className="text-yellow-300 font-bold">【年度限定 · 绝对免单权】</span>！
                  <br/>
                  <span className="opacity-70">(爆款笔记更有双倍中奖概率哦！)</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Ticker */}
        <div className="bg-gray-800 py-2 border-y border-gray-700/50 mb-16 relative">
          <div className="w-full overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              <span className="mx-8 text-sm text-gray-400 font-medium">
                {ticker.prefix} <span className="text-primary-400 font-bold mx-2">{ticker.separator}</span> 
                当前收录作品: {SHOWCASE_DATA.length} <span className="text-primary-400 font-bold mx-2">{ticker.separator}</span> {ticker.suffix}
              </span>
              <span className="mx-8 text-sm text-gray-400 font-medium">
                {ticker.prefix} <span className="text-primary-400 font-bold mx-2">{ticker.separator}</span> 
                当前收录作品: {SHOWCASE_DATA.length} <span className="text-primary-400 font-bold mx-2">{ticker.separator}</span> {ticker.suffix}
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
              {sectionTitle}
              <span className="text-primary-400 font-light ml-3 text-3xl">{sectionSubtitle}</span>
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto rounded-full my-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">{intro}</p>
          </div>

          {/* Masonry Grid */}
          <div 
            className="columns-2 md:columns-3 lg:columns-4 gap-6"
            style={{ columnFill: 'balance' }}
          >
            {SHOWCASE_DATA.map((item) => (
              <ShowcaseCard 
                key={item.id} 
                item={item} 
                onSelect={() => setSelectedItem(item)} 
              />
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-br from-primary-600/20 to-gray-800/20 rounded-3xl p-8 md:p-12 border border-primary-500/20 text-center shadow-2xl shadow-primary-900/20">
             <div className="flex justify-center items-center gap-2 mb-4 text-primary-300">
                <Star className="w-4 h-4" />
                <Star className="w-6 h-6" />
                <Star className="w-4 h-4" />
             </div>
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{cta.headline}</h3>
             <p className="text-primary-200/80 mb-8">{cta.subhead}</p>
             <button 
                onClick={handleCopy}
                className={`min-w-[240px] px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg text-lg flex items-center justify-center gap-2 mx-auto
                ${copied ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-white text-gray-900 hover:bg-primary-100 hover:shadow-primary-300/20'}`}
             >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? cta.copiedText : cta.buttonText}
             </button>
          </div>
        </div>
      </section>

      {selectedItem && (
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};

export default Showcase;