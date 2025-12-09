import React, { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
}

const ClickSparkle: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSparkles: Sparkle[] = [];
      const colors = ['#f43f5e', '#fda4af', '#fb7185', '#e11d48', '#FFD700'];
      
      const count = 12;
      for (let i = 0; i < count; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: e.pageX,
          y: e.pageY,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: (i / count) * 360,
        });
      }
      
      setSparkles(prev => [...prev, ...newSparkles]);
      
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[9999] overflow-hidden" style={{ height: '100vh', width: '100vw', position: 'fixed' }}>
      {sparkles.map((sparkle) => (
         <div
           key={sparkle.id}
           className="absolute w-1.5 h-1.5 rounded-full"
           style={{
             left: sparkle.x,
             top: sparkle.y,
             backgroundColor: sparkle.color,
             transform: `rotate(${sparkle.angle}deg) translate(0, 0)`,
             animation: `sparkle-burst 0.8s ease-out forwards`,
           }}
         />
      ))}
      <style>{`
        @keyframes sparkle-burst {
          0% { transform: rotate(var(--tw-rotate)) translate(0, 0); opacity: 1; }
          100% { transform: rotate(var(--tw-rotate)) translate(60px, 0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ClickSparkle;