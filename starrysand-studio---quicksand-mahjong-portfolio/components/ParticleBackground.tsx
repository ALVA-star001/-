import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      swaySpeed: number;
      swayRange: number;
      swayOffset: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        // Quicksand moves downwards slowly
        this.speedY = Math.random() * 0.5 + 0.2; 
        
        // Horizontal sway parameters
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayRange = Math.random() * 20 + 10;
        this.swayOffset = Math.random() * Math.PI * 2;

        this.opacity = Math.random() * 0.5 + 0.2;
        // Gold, Pink, White palette for "StarrySand"
        const colors = ['254, 205, 211', '255, 255, 255', '255, 241, 242', '253, 224, 71']; 
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number) {
        // Fall down
        this.y += this.speedY;
        
        // Sway horizontally
        this.x += Math.sin(time * this.swaySpeed + this.swayOffset) * 0.5;

        // Twinkle
        this.opacity += (Math.random() - 0.5) * 0.01;
        if (this.opacity < 0.1) this.opacity = 0.1;
        if (this.opacity > 0.7) this.opacity = 0.7;

        // Reset if off screen
        if (this.y > canvas!.height) {
          this.y = -10;
          this.x = Math.random() * canvas!.width;
        }
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000); // slightly denser
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;
      particles.forEach(p => {
        p.update(time);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resize();
      init();
    });

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen" 
    />
  );
};

export default ParticleBackground;