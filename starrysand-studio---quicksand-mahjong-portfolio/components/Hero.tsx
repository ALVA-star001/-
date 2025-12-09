
import React from 'react';
import { ArrowDown, Star, Sparkles, PenTool, Sprout, MessageCircle } from 'lucide-react';
import { HERO_CONTENT } from '../content';
import { useOrder } from '../contexts/OrderContext';

const Hero: React.FC = () => {
  const { 
    welcomeTag, titleStart, titleHighlight, titleEnd, 
    description, buttons, heroImage, showcaseCard 
  } = HERO_CONTENT;

  const { setConsultationMode, toggleModal } = useOrder();

  const handleAction = (e: React.MouseEvent, action?: string) => {
    if (action === 'consult') {
      e.preventDefault();
      setConsultationMode(true);
      toggleModal(true);
    }
  };

  const getButtonStyle = (style: string) => {
    switch (style) {
      case 'dark':
        return "bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2";
      case 'primary':
        return "bg-primary-500 text-white px-8 py-3 rounded-full hover:bg-primary-600 transition-colors shadow-lg shadow-primary-200 flex items-center justify-center gap-2";
      case 'light':
      default:
        return "relative overflow-hidden bg-white text-primary-600 border border-primary-200 px-8 py-3 rounded-full hover:text-primary-700 transition-all shadow-lg shadow-primary-100/50 flex items-center justify-center gap-2 group";
    }
  };

  const getButtonIcon = (idx: number, style: string) => {
    if (style === 'dark') return <Sparkles className="w-4 h-4" />;
    if (style === 'primary') return <MessageCircle className="w-4 h-4" />;
    return <PenTool className="w-4 h-4 group-hover:rotate-12 transition-transform" />;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary-100 shadow-sm text-primary-600 text-sm font-medium">
            <Star className="w-4 h-4 fill-current" />
            <span>{welcomeTag}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            {titleStart}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500"> {titleHighlight}</span>
            <span className="text-gray-300 text-3xl md:text-4xl block mt-2 font-light">{titleEnd}</span>
          </h1>
          
          <div className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0 whitespace-pre-line">
            <p>{description}</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            {Array.isArray(buttons) && buttons.map((btn, idx) => (
              <a 
                key={idx}
                href={btn.href} 
                onClick={(e) => handleAction(e, btn.action)}
                className={getButtonStyle(btn.style)}
              >
                {/* Background effect for light buttons */}
                {btn.style === 'light' && (
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
                
                <span className="relative flex items-center gap-2 font-semibold">
                  {getButtonIcon(idx, btn.style)}
                  {btn.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Hero Image / Visualization */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-300 to-purple-300 rounded-[2.5rem] rotate-3 opacity-20 transform transition-transform group-hover:rotate-6 duration-500"></div>
          <div className="relative bg-white p-4 rounded-[2rem] shadow-xl transform transition-transform group-hover:-translate-y-2 duration-500 border border-white/50">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 relative">
               <img 
                 src={heroImage} 
                 alt="Hero Showcase" 
                 className="w-full h-full object-cover"
               />
               {/* Overlay mimicking reflection/shine */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 pointer-events-none"></div>
            </div>
            <div className="pt-4 flex justify-between items-center px-2">
               <div>
                 <h3 className="font-bold text-gray-800">{showcaseCard.title}</h3>
                 <p className="text-sm text-gray-400">{showcaseCard.subtitle}</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
                 <Sparkles className="w-5 h-5" />
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-primary-300">
        <ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
