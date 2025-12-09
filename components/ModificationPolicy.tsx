import React from 'react';
import { FileSearch, Wind, Hammer, Maximize, AlertTriangle } from 'lucide-react';
import { MODIFICATION_POLICY_CONTENT } from '../content';

const ModificationPolicy: React.FC = () => {
  const { sectionTitle, sectionSubtitle, stages, emptiness } = MODIFICATION_POLICY_CONTENT;

  const getIcon = (type: string) => {
    switch (type) {
      case 'blueprint': return <FileSearch className="w-5 h-5" />;
      case 'chaos': return <Wind className="w-5 h-5" />;
      case 'wrench': return <Hammer className="w-5 h-5" />;
      default: return <FileSearch className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {sectionTitle}
            <span className="text-primary-400 font-light ml-2 text-xl md:text-2xl">{sectionSubtitle}</span>
          </h2>
          <div className="w-20 h-1 bg-gray-200 mx-auto rounded-full"></div>
        </div>

        {/* 3 Stages Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {stages.map((stage, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative border border-gray-100 overflow-hidden group">
              {/* Step Number Background */}
              <div className="absolute -right-3 -top-3 text-8xl font-bold text-gray-50 opacity-50 select-none group-hover:text-primary-50 transition-colors">
                {idx + 1}
              </div>
              
              <div className="relative z-10">
                <div className="w-10 h-10 bg-primary-50 text-primary-500 rounded-lg flex items-center justify-center mb-3">
                  {getIcon(stage.icon)}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{stage.title}</h3>
                <p className="text-xs text-primary-400 font-bold tracking-widest uppercase mb-3">{stage.engTitle}</p>
                
                <p className="text-gray-600 text-sm leading-snug mb-3">
                  {stage.desc}
                </p>

                {stage.warning && (
                  <div className="bg-red-50 text-red-500 text-xs px-3 py-2 rounded-lg font-bold flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="leading-tight">{stage.warning}</span>
                  </div>
                )}

                {stage.list && (
                  <ul className="space-y-2 mt-3">
                    {stage.list.map((item, i) => (
                      <li key={i} className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 leading-tight">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Emptiness Note */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-5 md:p-6 border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
           <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 shrink-0">
              <Maximize className="w-6 h-6" />
           </div>
           <div className="flex-1 text-center md:text-left">
             <h3 className="text-base font-bold text-gray-800 mb-1">{emptiness.title}</h3>
             <p className="text-gray-600 text-sm leading-snug">
               {emptiness.desc}
             </p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default ModificationPolicy;