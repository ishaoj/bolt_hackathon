import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Brain, Terminal, Palette, Leaf, Users, Globe } from 'lucide-react';
import './ThemesSection.css';

interface Theme {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const themes: Theme[] = [
  {
    name: "GenAI",
    description: "The rise of AI creativity",
    icon: <Brain className="w-12 h-12" />,
    color: "#00ffff",
    glowColor: "rgba(0, 255, 255, 0.5)"
  },
  {
    name: "Prompt Engineering",
    description: "Command AI like a pro",
    icon: <Terminal className="w-12 h-12" />,
    color: "#00ff00",
    glowColor: "rgba(0, 255, 0, 0.5)"
  },
  {
    name: "Creativity",
    description: "Innovate beyond imagination",
    icon: <Palette className="w-12 h-12" />,
    color: "#ff0000",
    glowColor: "rgba(255, 0, 0, 0.5)"
  },
  {
    name: "Sustainability",
    description: "Building for the future planet",
    icon: <Leaf className="w-12 h-12" />,
    color: "#4CAF50",
    glowColor: "rgba(76, 175, 80, 0.5)"
  },
  {
    name: "Community",
    description: "Collaborative growth together",
    icon: <Users className="w-12 h-12" />,
    color: "#9C27B0",
    glowColor: "rgba(156, 39, 176, 0.5)"
  },
  {
    name: "Build in Public",
    description: "Share progress, gain insights",
    icon: <Globe className="w-12 h-12" />,
    color: "#FF9800",
    glowColor: "rgba(255, 152, 0, 0.5)"
  }
];

const ThemeCube: React.FC<{ theme: Theme; index: number }> = ({ theme, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        rotateY: 0,
        transition: {
          type: "spring",
          duration: 1,
          delay: index * 0.2
        }
      });
    }
  }, [controls, inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0, rotateY: 180 }}
      animate={controls}
      className="theme-cube relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cube-face front">
        <div className="theme-icon" style={{ color: theme.color }}>
          {theme.icon}
        </div>
        <h3 className="theme-title" style={{ color: theme.color }}>
          {theme.name}
        </h3>
      </div>
      <div className="cube-face back">
        <p className="theme-description">{theme.description}</p>
      </div>
      <div className="cube-face right" style={{ backgroundColor: theme.color }} />
      <div className="cube-face left" style={{ backgroundColor: theme.color }} />
      <div className="cube-face top" style={{ backgroundColor: theme.color }} />
      <div className="cube-face bottom" style={{ backgroundColor: theme.color }} />
      
      {/* Glow effect */}
      <div 
        className="theme-glow"
        style={{ 
          boxShadow: `0 0 20px ${theme.glowColor}`,
          opacity: isHovered ? 1 : 0
        }}
      />
    </motion.div>
  );
};

const ThemesSection = () => {
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
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen py-20 relative" id="themes">
      {/* Background effects */}
      <div className="cyber-background">
        <div className="cyber-grid" />
        <div className="cyber-particles" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            Theme Cubes
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose your path in the digital realm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {themes.map((theme, index) => (
            <ThemeCube key={theme.name} theme={theme} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemesSection;