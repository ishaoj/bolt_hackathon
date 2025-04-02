import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface NinjaBackgroundProps {
  onAction?: boolean;
}

const NinjaBackground: React.FC<NinjaBackgroundProps> = ({ onAction }) => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const ninjaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Create particle effects
    gsap.to('.ninja-particle', {
      y: 'random(-100, 100)',
      x: 'random(-100, 100)',
      opacity: 0,
      duration: gsap.utils.random(1, 2),
      stagger: 0.1,
      repeat: -1,
      repeatDelay: gsap.utils.random(0, 2)
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (onAction) {
      // Ninja dash animation
      controls.start({
        x: ['-100vw', '0vw', '100vw'],
        opacity: [0, 1, 0],
        rotate: [-45, 0, 45],
        transition: { duration: 0.5, ease: 'easeInOut' }
      });

      // Particle burst effect
      if (containerRef.current) {
        const particles = containerRef.current.querySelectorAll('.ninja-particle');
        gsap.to(particles, {
          scale: 2,
          duration: 0.5,
          stagger: 0.1,
          opacity: 1,
          yoyo: true,
          repeat: 1
        });
      }
    }
  }, [onAction, controls]);

  // Random ninja appearance
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAppear = Math.random() > 0.7;
      if (randomAppear) {
        controls.start({
          opacity: [0, 1, 0],
          scale: [0.8, 1, 0.8],
          transition: { duration: 1 }
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Ninja particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="ninja-particle absolute w-1 h-1 bg-[#00FFFF] rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Animated ninja */}
      <motion.div
        ref={ninjaRef}
        animate={controls}
        className="absolute ninja-shadow"
        style={{
          width: 100,
          height: 100,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M50 10C30 10 15 25 15 45C15 65 30 80 50 80C70 80 85 65 85 45C85 25 70 10 50 10Z"
            stroke="#00FFFF"
            strokeWidth="2"
          />
          <path
            d="M35 40H65M40 50H60"
            stroke="#00FFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M30 30L40 40M70 30L60 40"
            stroke="#FF007F"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Data stream effect */}
      <div className="absolute inset-0 data-stream opacity-20" />
    </div>
  );
};

export default NinjaBackground; 