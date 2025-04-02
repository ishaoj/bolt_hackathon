import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Sword } from 'lucide-react';

const Hero = () => {
  const typedRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    // Glitch effect for title
    const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    glitchTimeline.to(titleRef.current, {
      skewX: 20,
      duration: 0.1,
      ease: "power1.inOut"
    })
    .to(titleRef.current, {
      skewX: 0,
      duration: 0.1,
      ease: "power1.inOut"
    })
    .to(titleRef.current, {
      opacity: 0.8,
      duration: 0.1,
      ease: "power1.inOut"
    })
    .to(titleRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: "power1.inOut"
    });

    // Floating particles animation
    gsap.to('.cyber-particle', {
      y: 'random(-100, 100)',
      x: 'random(-100, 100)',
      rotation: 'random(180, 720)',
      duration: gsap.utils.random(2, 4),
      opacity: 0,
      stagger: 0.1,
      repeat: -1,
      repeatDelay: gsap.utils.random(0, 2),
      ease: "power1.inOut"
    });

    // Circuit pattern animation
    gsap.to('.circuit-line', {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut",
      stagger: 0.2
    });
  }, { scope: containerRef });

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'Enter the Grid.',
        'Code from the Shadows.',
        'Become a Digital Shinobi.',
        'Join the Elite Hackers.',
        'Shape the Future.'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true
    });

    return () => typed.destroy();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center relative px-4" id="home">
      {/* Circuit pattern background */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <path
            className="circuit-line"
            d="M10 10h30v30h-30z"
            fill="none"
            stroke="rgba(0, 255, 255, 0.1)"
            strokeWidth="0.5"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <circle
            className="circuit-line"
            cx="25"
            cy="25"
            r="5"
            fill="none"
            stroke="rgba(255, 0, 127, 0.1)"
            strokeWidth="0.5"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="cyber-particle absolute w-2 h-2 bg-gradient-to-r from-[#00FFFF] to-[#FF007F] rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        <div className="mb-8">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 neon-text flex items-center justify-center gap-4"
          >
            <Sword className="w-8 h-8 md:w-12 md:h-12 text-[#FF007F]" />
            THE WORLD'S LARGEST HACKATHON
            <Sword className="w-8 h-8 md:w-12 md:h-12 text-[#FF007F] transform rotate-180" />
          </h1>
        </div>

        <div className="terminal-text text-lg sm:text-xl mb-12 min-h-[2em]">
          <span ref={typedRef}></span>
        </div>

        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cyber-button px-8 py-4 text-lg font-bold relative overflow-hidden group"
          >
            JOIN THE CLAN ljlk
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-[#00FFFF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(1px)'
                  }}
                />
              ))}
            </div>
          </motion.button>

          <div className="w-full max-w-2xl">
            {/* <CountdownTimer /> */}
          </div>
        </motion.div>
      </motion.div>

      {/* Scrolling data stream */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none">
        <div className="data-stream w-full h-full opacity-10" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce text-[#00FFFF]">
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;