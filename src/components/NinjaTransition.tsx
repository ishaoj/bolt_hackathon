import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface NinjaTransitionProps {
  isNavigating?: boolean;
  duration?: number;
  colors?: {
    primary: string;
    secondary: string;
    glow: string;
  };
  size?: 'sm' | 'md' | 'lg';
  onAnimationComplete?: () => void;
}

const NinjaTransition: React.FC<NinjaTransitionProps> = ({
  isNavigating = false,
  duration = 1,
  colors = {
    primary: '#06b6d4', // cyan-500
    secondary: '#ef4444', // red-500
    glow: '#06b6d4', // cyan-500
  },
  size = 'md',
  onAnimationComplete,
}) => {
  const ninjaRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Determine size values
  const sizes = {
    sm: { ninja: 'w-16 h-16', glow: 'w-24 h-24', slash: 'h-0.5' },
    md: { ninja: 'w-24 h-24', glow: 'w-32 h-32', slash: 'h-1' },
    lg: { ninja: 'w-32 h-32', glow: 'w-40 h-40', slash: 'h-2' },
  };
  
  // Create memoized animation function
  const runAnimation = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) onAnimationComplete();
      }
    });
    
    const animationSpeed = {
      enter: duration * 0.3,
      slash: duration * 0.2,
      exit: duration * 0.3,
      delay: duration * 0.2,
    };
    
    if (isNavigating) {
      // Navigation animation - horizontal entry
      tl.set(containerRef.current, { visibility: 'visible' })
        .fromTo(ninjaRef.current,
          { x: '-100%', opacity: 0, rotate: -10 },
          { x: '0%', opacity: 1, rotate: 0, duration: animationSpeed.enter, ease: "power2.out" }
        )
        .fromTo(slashRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: animationSpeed.slash, ease: "power3.inOut" }
        )
        .to([ninjaRef.current, slashRef.current],
          { opacity: 0, duration: animationSpeed.exit, delay: animationSpeed.delay }
        )
        .set(containerRef.current, { visibility: 'hidden' });
    } else {
      // Initial animation - zoom in
      tl.set(containerRef.current, { visibility: 'visible' })
        .fromTo(ninjaRef.current,
          { scale: 0, opacity: 0, rotate: -30 },
          { scale: 1, opacity: 1, rotate: 0, duration: animationSpeed.enter, ease: "back.out(1.7)" }
        )
        .fromTo(slashRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: animationSpeed.slash, ease: "power4.out" }
        )
        .to([ninjaRef.current, slashRef.current],
          { opacity: 0, duration: animationSpeed.exit, delay: animationSpeed.delay }
        )
        .set(containerRef.current, { visibility: 'hidden' });
    }
    
    return tl;
  }, [isNavigating, duration, onAnimationComplete]);
  
  useEffect(() => {
    const timeline = runAnimation();
    
    return () => {
      timeline.kill();
    };
  }, [isNavigating, runAnimation]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      aria-hidden="true"
    >
      <div 
        ref={ninjaRef}
        className="relative flex items-center justify-center"
      >
        {/* Glow effect */}
        <div 
          className={`${sizes[size].glow} rounded-full blur-lg absolute`}
          style={{ backgroundColor: `${colors.glow}33` /* 20% opacity */ }}
        />
        
        {/* Ninja silhouette */}
        <svg 
          className={`${sizes[size].ninja} absolute`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill={colors.primary}
          />
          <path 
            d="M15 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" 
            fill={colors.primary}
          />
          <path 
            d="M9 8.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" 
            fill={colors.primary}
          />
          <path 
            d="M12 16c-1.5 0-2.5-1-2.5-1l-1 1s1.5 2 3.5 2 3.5-2 3.5-2l-1-1s-1 1-2.5 1z" 
            fill={colors.primary}
          />
        </svg>
      </div>
      
      <div
        ref={slashRef}
        className="absolute inset-0 flex items-center justify-center transform origin-center"
      >
        <div 
          className={`w-full ${sizes[size].slash} blur-sm`}
          style={{ 
            background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` 
          }} 
        />
      </div>
    </div>
  );
};

export default NinjaTransition;