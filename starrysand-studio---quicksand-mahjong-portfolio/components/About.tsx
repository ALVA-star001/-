import React from 'react';
import { Sparkles, Layers, Palette } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Layers className="w-6 h-6 text-white" />,
      title: "分层结构",
      desc: "利用高透亚克力板将画面分为前景与后景，营造出独特的立体景深感。",
      color: "bg-blue-400"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: "流沙注油",
      desc: "中间层注入专业流沙油与定制闪粉，晃动时如星河流动，静止时如尘埃落定。",
      color: "bg-primary-500"
    },
    {
      icon: <Palette className="w-6 h-6 text-white" />,
      title: "表面工艺",
      desc: "可叠加镭射、烫金或滴胶穹顶，增加手感与视觉层次。",
      color: "bg-purple-400"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">关于流沙麻将</h2>
          <div className="w-16 h-1 bg-primary-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600">
            这不仅仅是一枚麻将，更是一个微缩的流动世界。通过精密的激光切割与手工层叠组装，
            将静态的插画与动态的流沙结合，创造出既可爱又解压的掌心玩物。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 rounded-3xl p-8 hover:bg-primary-50 transition-colors duration-300 border border-transparent hover:border-primary-100">
              <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center shadow-lg shadow-gray-200 mb-6 transform rotate-3`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;