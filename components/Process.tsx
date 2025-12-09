
import React, { useState } from 'react';
import { 
  Ruler, Palette, Wand2, Layers, 
  Hammer, Zap, Sun, Gem, Scissors, 
  MessageCircle, Fingerprint, Eye, Sparkles, Moon, Coffee, Star, X, AlertTriangle, Truck, Camera, HelpCircle, Package, Check
} from 'lucide-react';
import { PROCESS_CONTENT, SITE_STATUS, FULFILLMENT_CONTENT, CONSULTATION_CONTENT } from '../content';
import { useOrder } from '../contexts/OrderContext';

const Process: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'base' | 'fluid' | 'decor' | 'advanced'>('base');
  const [showWishModal, setShowWishModal] = useState(false);

  // Hook into Order Context
  const { 
    selectedSize, selectedAddons, selectedCraft, selectedRush, selectedPackaging,
    selectSize, selectCraft, toggleAddon, selectRush, selectPackaging,
    setConsultationMode, consultationMode, toggleModal
  } = useOrder();

  const {
    sectionTitle, sectionSubtitle, intro,
    sizes, sizeNote,
    fluids,
    decor,
    advanced
  } = PROCESS_CONTENT;

  const { isBusy } = SITE_STATUS;

  const tabs = [
    { id: 'base', label: '1. 选画框', icon: <Ruler className="w-4 h-4" /> },
    { id: 'fluid', label: '2. 调流沙', icon: <Palette className="w-4 h-4" /> },
    { id: 'decor', label: '3. 加装饰', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'advanced', label: '4. 进阶玩法', icon: <Layers className="w-4 h-4" /> },
  ];

  const handleSizeClick = (item: any) => {
    selectSize(item);
    if (item.triggerWish) {
      setShowWishModal(true);
    }
  };

  const handleAddonToggle = (category: string, item: any) => {
    toggleAddon(category, item.name, item.price, item.priceNum);
  };
  
  const isAddonSelected = (name: string) => {
    return selectedAddons.some(addon => addon.name === name);
  };

  const getRushColor = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'red': return 'bg-red-100 text-red-600 border-red-200';
      case 'blue': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <section id="process" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {sectionTitle}
            <span className="text-primary-400 font-light ml-2 text-2xl">{sectionSubtitle}</span>
          </h2>
          <p className="text-gray-500">{intro}</p>
        </div>

        {/* CONSULTATION MODE TRIGGER */}
        <div className="max-w-xl mx-auto mb-10">
          <button 
            onClick={() => setConsultationMode(!consultationMode)}
            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border border-dashed ${consultationMode ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-100' : 'bg-white border-gray-300 hover:border-indigo-300 hover:bg-indigo-50/50'}`}
          >
             <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 shrink-0">
               <HelpCircle className="w-6 h-6" />
             </div>
             <div className="text-left flex-1">
               <h3 className="font-bold text-gray-800">{CONSULTATION_CONTENT.title}</h3>
               <p className="text-xs text-gray-500">{CONSULTATION_CONTENT.desc}</p>
             </div>
             <div className="text-indigo-500 font-medium text-sm">
               {consultationMode ? '已激活' : '点击咨询'} &rarr;
             </div>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-opacity duration-300 ${consultationMode ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-200 scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-primary-50 hover:text-primary-500'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`min-h-[400px] mb-20 transition-opacity duration-300 ${consultationMode ? 'opacity-50 blur-[2px] pointer-events-none' : 'opacity-100'}`}>
          
          {/* TAB 1: SIZES */}
          {activeTab === 'base' && (
            <div className="animate-fade-in space-y-12">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">画框：世界的基石</h3>
                <p className="text-gray-600">
                  首先，我们需要为你的世界选定一个“画框”。点击卡片即可选中，这是定价的基础。
                </p>
              </div>

              {/* Summary Reference Image */}
              <div className="rounded-2xl overflow-hidden mb-8 shadow-sm border border-gray-100 max-w-4xl mx-auto">
                 <img src="https://picsum.photos/seed/sizesummary/800/300" className="w-full h-48 md:h-64 object-cover" alt="Size Reference" />
                 <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t border-gray-100">
                    * 示意图：不同尺寸在手中的实际比例参考
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {sizes.map((item, idx) => {
                  const isSelected = selectedSize?.name === item.name;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleSizeClick(item)}
                      className={`
                        border rounded-2xl p-6 shadow-sm cursor-pointer relative overflow-hidden group transition-all duration-300
                        ${isSelected 
                          ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-200 transform -translate-y-2 shadow-xl' 
                          : 'bg-white border-gray-100 hover:shadow-xl hover:-translate-y-1'
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 text-primary-500">
                          <Sparkles className="w-5 h-5 fill-current animate-pulse" />
                        </div>
                      )}
                      
                      <div className="absolute top-0 right-0 bg-primary-100 w-16 h-16 rounded-bl-full -mr-8 -mt-8 z-0 group-hover:bg-primary-200 transition-colors opacity-50"></div>
                      <div className="relative z-10">
                        <div className={`text-3xl font-bold mb-1 ${isSelected ? 'text-primary-600' : 'text-primary-500'}`}>{item.price}</div>
                        <h4 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h4>
                        <div className="flex items-center gap-1 text-xs font-mono text-gray-400 mb-4 bg-white/60 inline-block px-2 py-1 rounded">
                          <Ruler className="w-3 h-3" /> {item.size}
                        </div>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                        {item.triggerWish && (
                          <div className="mt-3 text-xs text-primary-500 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Star className="w-3 h-3 fill-current" /> 点击查看福利
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">{sizeNote}</p>
            </div>
          )}

          {/* TAB 2: FLUIDS (SIMPLIFIED) */}
          {activeTab === 'fluid' && (
            <div className="animate-fade-in space-y-12">
               {/* Formula Strategies */}
               <div className="bg-gray-50 rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-center mb-8">🧪 配方攻略：三种玩法</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {fluids.strategies.map((mode, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                        <div className="text-4xl mb-4">{mode.icon}</div>
                        <h4 className="font-bold text-gray-800 mb-2">{mode.title}</h4>
                        <p className="text-sm text-gray-500">{mode.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Materials Dictionary */}
               <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" /> 
                    素材图鉴
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {fluids.materials.map((mat, i) => (
                      <div key={i} className="bg-white border border-gray-100 p-5 rounded-xl">
                        <div className={`h-2 w-12 rounded-full mb-3 ${mat.color}`}></div>
                        <h5 className="font-bold text-gray-800">{mat.title}</h5>
                        <p className="text-xs text-gray-500 mt-1">{mat.desc}</p>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          )}

          {/* TAB 3: DECOR */}
          {activeTab === 'decor' && (
            <div className="animate-fade-in space-y-12">
               
               {/* Visual Effects */}
               <div className="space-y-6">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <Eye className="w-5 h-5 text-primary-500" /> 视觉特效 (可多选)
                 </h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    {decor.visualEffects.map((item, idx) => {
                      const selected = isAddonSelected(item.name);
                      return (
                        <div 
                          key={idx} 
                          onClick={() => handleAddonToggle('Visual Effect', item)}
                          className={`
                            border rounded-2xl p-0 transition-all cursor-pointer relative overflow-hidden group
                            ${selected 
                              ? 'bg-primary-50 border-primary-400 shadow-md' 
                              : 'bg-white border-primary-100 hover:bg-primary-50/50'
                            }
                          `}
                        >
                           <div className="h-32 bg-gray-100 overflow-hidden relative">
                              {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                              <div className="absolute inset-0 bg-black/10"></div>
                              {selected && <div className="absolute top-4 right-4 text-white bg-primary-500 p-1 rounded-full"><Sparkles className="w-4 h-4" /></div>}
                              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                {item.price}
                              </div>
                           </div>
                           <div className="p-5">
                              <h4 className="font-bold text-gray-800 mb-2">{item.name}</h4>
                              <p className="text-sm text-gray-500 mb-3">{item.desc}</p>
                              {item.note && (
                                <div className="text-xs text-gray-400 bg-white p-2 rounded border border-gray-100">
                                  {item.note}
                                </div>
                              )}
                           </div>
                        </div>
                      );
                    })}
                 </div>
               </div>

               {/* Collage */}
               <div className="space-y-6">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <Scissors className="w-5 h-5 text-primary-500" /> 氛围拼贴 (可多选)
                 </h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {decor.collage.map((item, idx) => {
                      const selected = isAddonSelected(item.name);
                      return (
                        <div 
                          key={idx} 
                          onClick={() => handleAddonToggle('Collage', item)}
                          className={`
                            rounded-xl p-0 text-center cursor-pointer transition-all border overflow-hidden group
                            ${selected 
                              ? 'bg-primary-50 border-primary-400 shadow-sm transform -translate-y-1' 
                              : 'bg-gray-50 border-transparent hover:border-gray-200'
                            }
                          `}
                        >
                           <div className="h-24 bg-gray-200 overflow-hidden relative mb-2">
                              {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />}
                              {selected && (
                                <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                                   <Check className="w-6 h-6 text-white" />
                                </div>
                              )}
                           </div>
                           <div className="px-3 pb-3">
                              <h4 className="font-bold text-gray-800 text-sm mb-1">{item.name}</h4>
                              <span className="block text-primary-500 font-bold text-xs mb-2">{item.price}</span>
                              <p className="text-xs text-gray-500 scale-90 leading-tight">{item.desc}</p>
                           </div>
                        </div>
                      );
                    })}
                 </div>
               </div>

               {/* Hidden Attributes */}
               <div className="space-y-6">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <Moon className="w-5 h-5 text-primary-500" /> 魔法·隐藏属性 (可多选)
                 </h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    {decor.hidden.map((item, idx) => {
                      const selected = isAddonSelected(item.name);
                      return (
                        <div 
                          key={idx} 
                          onClick={() => handleAddonToggle('Hidden', item)}
                          className={`
                            rounded-2xl relative overflow-hidden group cursor-pointer border transition-all h-32 flex
                            ${selected ? 'ring-2 ring-primary-400 border-transparent' : 'border-gray-100'}
                          `}
                        >
                           {/* Background Image */}
                           {item.image && (
                             <div className="absolute inset-0 z-0">
                               <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                               <div className={`absolute inset-0 ${idx === 0 ? 'bg-gray-900/80' : 'bg-orange-900/60'}`}></div>
                             </div>
                           )}

                           <div className="relative z-10 p-6 flex flex-col justify-center w-full">
                             <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold flex items-center gap-2 text-white text-lg shadow-black drop-shadow-md">
                                  {item.iconType === 'moon' ? <Zap className="w-5 h-5 text-yellow-300" /> : <Sun className="w-5 h-5 text-orange-300" />} 
                                  {item.name}
                                </h4>
                                <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded border border-white/30">
                                  {item.price}
                                </span>
                             </div>
                             <p className="text-sm text-gray-200 drop-shadow-md">{item.desc}</p>
                           </div>
                           
                           {selected && <div className="absolute top-3 right-3 w-3 h-3 bg-primary-500 rounded-full z-20 shadow-lg border border-white"></div>}
                        </div>
                      );
                    })}
                 </div>
               </div>

               {/* Magic Mirror */}
               <div 
                 onClick={() => handleAddonToggle('Special', decor.magicMirror)}
                 className={`
                   bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-8 border-2 shadow-inner relative overflow-hidden cursor-pointer transition-all group
                   ${isAddonSelected(decor.magicMirror.title) ? 'border-primary-500 ring-2 ring-primary-200' : 'border-white hover:border-gray-300'}
                 `}
               >
                  <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md z-20">{decor.magicMirror.badge}</div>
                  
                  {/* Decorative BG */}
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary-200 rounded-full filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center shrink-0 border-4 border-white">
                       <Sparkles className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{decor.magicMirror.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                        {decor.magicMirror.desc}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full text-xs font-medium text-gray-500">
                         <span>{decor.magicMirror.tags[0]}</span>
                         <span className="w-px h-3 bg-gray-400"></span>
                         <span>{decor.magicMirror.tags[1]}</span>
                         <span className="w-px h-3 bg-gray-400"></span>
                         <span className="text-primary-600 font-bold">{decor.magicMirror.price}</span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {/* TAB 4: ADVANCED */}
          {activeTab === 'advanced' && (
            <div className="animate-fade-in space-y-12">
               
               <div className="space-y-6">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   <Hammer className="w-5 h-5 text-primary-500" /> 进阶结构 (单选)
                 </h3>
                 
                 <div className="grid md:grid-cols-3 gap-6">
                    {advanced.structures.map((item, idx) => {
                      // Logic for craft selection
                      const isSelected = selectedCraft?.name === item.name;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => selectCraft(item)}
                          className={`
                            rounded-2xl shadow-sm border cursor-pointer transition-all overflow-hidden group
                            ${isSelected 
                              ? 'bg-primary-50 border-primary-500 transform -translate-y-1 shadow-md' 
                              : 'bg-white border-gray-100 hover:border-primary-200'
                            }
                          `}
                        >
                          <div className="h-32 bg-gray-100 relative">
                             {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                             <div className="absolute top-2 left-2 bg-white/80 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm">{item.price}</div>
                             {isSelected && <div className="absolute top-2 right-2 bg-primary-500 text-white p-1 rounded-full"><Check className="w-3 h-3" /></div>}
                          </div>
                          
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-2">
                               <span className="text-xl">{item.icon}</span>
                               <h4 className="font-bold text-gray-800">{item.name}</h4>
                            </div>
                            <p className="text-sm text-gray-500 leading-snug">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                 </div>
               </div>

               <div className="bg-primary-50/50 rounded-3xl p-8 border border-primary-100/50">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                     <Gem className="w-5 h-5 text-primary-500" /> 终章点缀 (可多选)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {advanced.finalTouch.map((item, idx) => {
                       const selected = isAddonSelected(item.name);
                       return (
                         <div 
                            key={idx} 
                            onClick={() => handleAddonToggle('Final Touch', item)}
                            className={`
                              p-3 rounded-xl shadow-sm flex items-center gap-3 cursor-pointer transition-all border group
                              ${selected
                                ? 'bg-white border-primary-500 ring-1 ring-primary-500'
                                : 'bg-white border-transparent hover:border-gray-200'
                              }
                            `}
                          >
                            <div className="w-12 h-12 rounded-lg bg-gray-50 shrink-0 overflow-hidden border border-gray-100">
                               {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                            </div>
                            <div>
                               <div className="font-bold text-gray-700 text-sm mb-1">{item.name}</div>
                               <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded font-medium">{item.price}</span>
                            </div>
                            {selected && <Check className="w-4 h-4 text-primary-500 ml-auto" />}
                         </div>
                       );
                     })}
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* FULFILLMENT / CONTRACT */}
        {/* ========================================================= */}
        <div className="border-t-2 border-dashed border-gray-100 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {FULFILLMENT_CONTENT.sectionTitle}
              <span className="text-gray-400 font-light ml-2 text-xl block md:inline mt-2 md:mt-0">{FULFILLMENT_CONTENT.sectionSubtitle}</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* 1. Production Time & Rush Orders */}
            <div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
                 <h3 className="text-xl font-bold text-gray-800 mb-4">{FULFILLMENT_CONTENT.production.title}</h3>
                 <p className="text-gray-600 mb-4 leading-relaxed">{FULFILLMENT_CONTENT.production.cycle}</p>
                 <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                   {FULFILLMENT_CONTENT.production.cancellation}
                 </div>
              </div>

              <div className={`rounded-3xl p-8 transition-colors duration-300 ${isBusy ? 'bg-gray-50' : 'bg-gradient-to-br from-indigo-50 to-purple-50'}`}>
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{FULFILLMENT_CONTENT.rush.title}</h3>
                      <p className="text-gray-500 text-sm">{FULFILLMENT_CONTENT.rush.subtitle}</p>
                    </div>
                    {isBusy && (
                      <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 self-start md:self-auto">
                        <Coffee className="w-3 h-3" /> 爆肝模式生效中
                      </span>
                    )}
                 </div>
                 
                 <p className="text-gray-600 mb-4">{FULFILLMENT_CONTENT.rush.intro}</p>
                 <div className="text-xs text-gray-500 mb-8 bg-white/50 inline-block px-3 py-2 rounded-lg border border-black/5">
                   {FULFILLMENT_CONTENT.rush.warning}
                 </div>

                 {/* Rush Tiers Grid */}
                 <div className={`grid md:grid-cols-3 gap-4 mb-8 ${isBusy ? 'opacity-70 grayscale-[0.5]' : ''}`}>
                   {FULFILLMENT_CONTENT.rush.tiers.map((tier, idx) => {
                     const isSelected = selectedRush?.name === tier.name;
                     return (
                       <div 
                         key={idx} 
                         onClick={() => !isBusy && selectRush(tier)} // Disable click if busy
                         className={`
                           border rounded-2xl p-5 relative overflow-hidden bg-white transition-all
                           ${isBusy ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
                           ${isSelected ? `ring-2 ring-offset-2 ring-primary-400 border-primary-400 ${getRushColor(tier.color)}` : getRushColor(tier.color)}
                         `}
                       >
                          {isSelected && <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-0.5"><Check className="w-3 h-3" /></div>}
                          <div className="flex justify-between items-start mb-3">
                             <span className="text-2xl">{tier.icon}</span>
                             <span className="text-xl font-bold">{tier.fee}</span>
                          </div>
                          <h4 className="font-bold text-gray-800 mb-1">{tier.name}</h4>
                          <div className="text-xs font-bold bg-white/50 inline-block px-2 py-1 rounded mb-3">
                            ⏱️ {tier.time}
                          </div>
                          <p className="text-xs text-gray-500 leading-snug">
                            {tier.desc}
                          </p>
                       </div>
                     );
                   })}
                 </div>

                 {/* Dynamic Status Info */}
                 <div className="bg-white rounded-xl p-6 border border-gray-100">
                    <h5 className="font-bold text-gray-800 text-sm mb-4">当前状态说明：</h5>
                    <div className="space-y-3 text-sm">
                      <div className={`flex gap-2 ${!isBusy ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                         <span className={!isBusy ? 'opacity-100' : 'opacity-50'}>🍵</span>
                         <span>{FULFILLMENT_CONTENT.rush.status.idle}</span>
                      </div>
                      <div className={`flex gap-2 ${isBusy ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
                         <span className={isBusy ? 'animate-pulse' : 'opacity-50'}>🔥</span>
                         <span>{FULFILLMENT_CONTENT.rush.status.busy}</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* 2. Shipping Process */}
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -z-10 hidden md:block"></div>
              <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-16">
                
                {/* Step 1 */}
                <div className="flex flex-col md:items-end md:text-right">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:mr-8 relative">
                     <div className="absolute top-6 -right-3 w-6 h-6 bg-white rotate-45 border-t border-r border-gray-100 hidden md:block"></div>
                     <div className="flex items-center gap-3 md:flex-row-reverse mb-2 text-primary-500 font-bold">
                       <Camera className="w-5 h-5" />
                       {FULFILLMENT_CONTENT.shipping.confirm.title}
                     </div>
                     <p className="text-gray-600 text-sm">{FULFILLMENT_CONTENT.shipping.confirm.desc}</p>
                  </div>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-sm mt-8"></div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:items-start md:text-left mt-8 md:mt-24">
                   {/* Timeline dot */}
                   <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-sm mt-8"></div>
                   
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:ml-8 relative">
                     <div className="absolute top-6 -left-3 w-6 h-6 bg-white -rotate-45 border-t border-l border-gray-100 hidden md:block"></div>
                     <div className="flex items-center gap-3 mb-2 text-gray-800 font-bold">
                       <Truck className="w-5 h-5" />
                       {FULFILLMENT_CONTENT.shipping.send.title}
                     </div>
                     <p className="text-gray-600 text-sm">{FULFILLMENT_CONTENT.shipping.send.desc}</p>
                   </div>
                </div>

              </div>
            </div>

            {/* 3. Packaging Options */}
            <div className="grid md:grid-cols-2 gap-8">
               {FULFILLMENT_CONTENT.packaging.map((pack, idx) => {
                 const isSelected = selectedPackaging?.title === pack.title || (!selectedPackaging && idx === 0);
                 return (
                 <div 
                   key={idx} 
                   onClick={() => selectPackaging(pack)}
                   className={`
                     bg-white rounded-3xl overflow-hidden shadow-md group hover:shadow-xl transition-all border cursor-pointer flex flex-col
                     ${isSelected ? 'ring-2 ring-primary-500 scale-[1.02] border-primary-500' : 'border-gray-100 hover:border-gray-200'}
                   `}
                 >
                    <div className="h-48 overflow-hidden relative">
                      <img src={pack.image} alt={pack.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${pack.isUpgrade ? 'bg-gray-900 text-white' : 'bg-white text-gray-500'}`}>
                        {pack.tag}
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 bg-primary-900/10 flex items-center justify-center">
                          <div className="bg-white text-primary-600 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                            <Package className="w-4 h-4" /> 已选择
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">{pack.title}</h4>
                      <p className="text-xs text-gray-400 font-mono mb-3">{pack.engName}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{pack.desc}</p>
                    </div>
                 </div>
               )})}
            </div>

          </div>
        </div>

        {/* ✨ WISH MODAL */}
        {showWishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowWishModal(false)}>
            <div className="bg-white rounded-[2rem] max-w-sm w-full p-8 relative animate-scale-up" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowWishModal(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600">
                 <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow">
                   <Star className="w-8 h-8 fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">检测到小狼的馈赠！</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  恭喜！你选择了“随身卡包级”，已触发免费的 <span className="text-primary-500 font-bold">星辰点缀</span> 福利！
                </p>
                
                <div className="space-y-3">
                  <button className="w-full bg-primary-500 text-white font-bold py-3 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-200" onClick={() => {
                     setConsultationMode(true);
                     toggleModal(true);
                     setShowWishModal(false);
                  }}>
                    开启许愿模式 (免费)
                  </button>
                  <button className="w-full bg-gray-50 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-100 transition-colors" onClick={() => setShowWishModal(false)}>
                    我再看看别的
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
};

export default Process;
