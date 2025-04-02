import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NinjaEffectProps {
  trigger?: string;
  slashDuration?: number;
  transitionDuration?: number;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const NinjaEffect: React.FC<NinjaEffectProps> = ({
  trigger = 'default',
  slashDuration = 600,
  transitionDuration = 800,
  colors = {
    primary: '#4f46e5',
    secondary: '#8b5cf6',
    accent: '#ef4444',
  }
}) => {
  const [slashes, setSlashes] = useState<Array<{id: number; x: number; y: number; angle: number}>>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const slashIdRef = useRef(0);
  
  // Handle mouse move to track cursor position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  }, []);
  
  // Create a slash effect at click position
  const createSlash = useCallback((x: number, y: number) => {
    const newSlash = {
      id: slashIdRef.current++,
      x,
      y,
      angle: Math.random() * 360
    };
    
    setSlashes(prev => [...prev, newSlash]);
    
    // Remove slash after animation completes
    setTimeout(() => {
      setSlashes(prev => prev.filter(slash => slash.id !== newSlash.id));
    }, slashDuration);
  }, [slashDuration]);
  
  // Trigger transition effect
  const triggerTransition = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [transitionDuration]);
  
  // Handle click to create slash and trigger transition
  const handleClick = useCallback((e: MouseEvent) => {
    createSlash(e.clientX, e.clientY);
    triggerTransition();
  }, [createSlash, triggerTransition]);
  
  // Handle scroll events
  const handleScroll = useCallback(() => {
    triggerTransition();
    // Create slash at random position during scroll
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    createSlash(randomX, randomY);
  }, [createSlash, triggerTransition]);
  
  // Handle hover states
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);
  
  // Set up event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleClick, handleScroll, handleMouseEnter, handleMouseLeave, trigger]);
  
  return (
    <>
      {/* Full-screen transition effect */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="fixed inset-0 pointer-events-none z-50 bg-black bg-opacity-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionDuration / 1000 }}
          />
        )}
      </AnimatePresence>
      
      {/* Slash effects */}
      {slashes.map(slash => (
        <motion.div 
          key={slash.id}
          className="absolute pointer-events-none z-50"
          style={{ top: slash.y, left: slash.x }}
          initial={{ scale: 0, opacity: 0, rotate: slash.angle }}
          animate={{ 
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            rotate: [`${slash.angle}deg`, `${slash.angle + 45}deg`]
          }}
          transition={{ 
            duration: slashDuration / 1000,
            times: [0, 0.3, 1]
          }}
        >
          <div className="relative">
            <div 
              className="absolute h-px w-24 -translate-x-1/2 -translate-y-1/2"
              style={{ background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)` }}
            />
            <div 
              className="absolute h-24 w-px -translate-x-1/2 -translate-y-1/2"
              style={{ background: `linear-gradient(to bottom, transparent, ${colors.accent}, transparent)` }}
            />
          </div>
        </motion.div>
      ))}
      
      {/* Cursor glow effect */}
      <motion.div 
        className="fixed pointer-events-none z-40 w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{ 
          x: cursorPosition.x,
          y: cursorPosition.y,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3
        }}
        transition={{ type: "spring", damping: 15 }}
        style={{ 
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 100%)`,
          boxShadow: `0 0 20px ${colors.primary}`
        }}
      />
    </>
  );
};

export default NinjaEffect;