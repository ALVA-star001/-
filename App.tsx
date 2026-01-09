import React, { useState, useEffect } from 'react';
// 导入业务组件
import Header from './components/Header';
import Hero from './components/Hero';
import Process from './components/Process';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
// 导入视觉特效组件
import ParticleBackground from './components/ParticleBackground';
import ClickSparkle from './components/ClickSparkle';
// 导入功能性全局组件
import StickyFooter from './components/StickyFooter';
import LoadingScreen from './components/LoadingScreen';
import CheckoutModal from './components/CheckoutModal';
import ModificationPolicy from './components/ModificationPolicy';
import Showcase from './components/Showcase';
// 导入新增的产品介绍组件
import ProductIntro from './components/ProductIntro';
// 导入订单状态上下文
import { OrderProvider } from './contexts/OrderContext';

/**
 * App 组件：应用程序的根组件
 * 负责整体布局结构、全局状态初始化以及首屏加载逻辑的协调
 */
function App() {
  // 控制首屏加载动画的状态，初始值为 true
  const [loading, setLoading] = useState(true);

  // 副作用处理：模拟资源加载过程
  useEffect(() => {
    // 设置一个 2.5 秒的定时器，模拟从服务器获取创意数据或加载大型资产的时间
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    // 组件卸载时清除定时器，防止内存泄漏
    return () => clearTimeout(timer);
  }, []);

  return (
    /* OrderProvider 提供订单相关的上下文环境，使嵌套的子组件能访问和修改订单状态 */
    <OrderProvider>
      {/* 
          最外层容器：
          - font-sans: 应用自定义的 Quicksand/Noto Sans 字体栈
          - antialiased: 开启抗锯齿，使字体在屏幕上更清晰
          - selection:*: 自定义用户选中文本时的背景色（浅粉色）和文字颜色
          - bg-[#fff1f2]: 整个视口的基础背景色
      */}
      <div className="font-sans antialiased text-gray-900 selection:bg-primary-200 selection:text-primary-900 relative bg-[#fff1f2] min-h-screen">
        
        {/* 加载遮罩层：拥有极高的 z-index，当 isLoading 为 true 时覆盖全屏 */}
        <LoadingScreen isLoading={loading} />
        
        {/* 
            主内容包装器：
            - transition-opacity: 控制透明度的平滑过渡
            - duration-1000: 动画持续时间 1 秒
            - 根据 loading 状态切换 opacity-0 (隐藏) 到 opacity-100 (显示)
        */}
        <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            {/* 全局粒子背景：在底层渲染缓慢下落的“星尘”效果 */}
            <ParticleBackground />
            {/* 点击火花特效：捕获全局点击事件并渲染粒子扩散动画 */}
            <ClickSparkle />
            
            {/* 
                主内容响应式容器：
                - max-w-screen-2xl: 限制在大屏幕上的最大宽度，防止布局过散
                - mx-auto: 容器水平居中
                - bg-white/50: 半透明白色背景，增强内容可读性同时透出底层的粒子效果
                - shadow-2xl: 为整个主容器添加深邃的阴影，营造“纸张”浮在背景上的质感
            */}
            <div className="max-w-screen-2xl mx-auto bg-white/50 relative shadow-2xl min-h-screen">
              {/* 顶部导航栏：常驻页面顶部 */}
              <Header />
              
              {/* 
                  主要内容区块：
                  - relative z-10: 提升层级，确保内容位于背景粒子之上
              */}
              <main className="relative z-10">
                {/* 英雄区块：首屏核心展示，包含 Slogan 和 CTA 按钮 */}
                <Hero />
                
                {/* 产品介绍：承上启下，介绍流麻定义与目标用户 */}
                <ProductIntro />

                {/* 作品画廊：展示已完成的定制案例 */}
                <Gallery />
                {/* 定制流程：核心交互区域，用户在此选择尺寸、配方和配件 */}
                <Process />
                {/* 修改政策：详细说明定制过程中的修改规则和注意事项 */}
                <ModificationPolicy />
                {/* 社区秀场：滚动展示用户的评价和返图 */}
                <Showcase />
              </main>

              {/* 页脚：包含站点信息和社交媒体链接 */}
              <Footer />
              
              {/* 底部悬浮条：移动端优先的快速结算和价格预览工具 */}
              <StickyFooter />
              
              {/* 结算弹窗：用户点击“去结算”后弹出的详细清单预览及契约签署界面 */}
              <CheckoutModal />
            </div>
        </div>
      </div>
    </OrderProvider>
  );
}

export default App;
