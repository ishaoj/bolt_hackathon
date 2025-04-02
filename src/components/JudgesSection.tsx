import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Twitter, Sword, Terminal, Code2, Brain, Zap, Users, Rocket } from 'lucide-react';
import './JudgesSection.css';

interface Judge {
  name: string;
  handle: string;
  role: string;
  bio: string;
  twitterImage?: string;
  icon: React.ReactNode;
  color: string;
  effect: string;
}

const judges: Judge[] = [
  {
    name: "Logan Kilpatrick",
    handle: "@OfficialLoganK",
    role: "Lead Product for Google AI Studio",
    bio: "Working on Gemini API & AGI. Formerly at OpenAI, Microsoft, and NASA. Building the future of AI.",
    icon: <Brain className="w-12 h-12" />,
    color: "#00ff00",
    effect: "matrix"
  },
  {
    name: "Pieter Levels",
    handle: "@levelsio",
    role: "Indie Hacker",
    bio: "Creator of Fly.pieter.com, RemoteOK, PhotoAI, InteriorAI, Nomads.com, and more.",
    icon: <Rocket className="w-12 h-12" />,
    color: "#ff00ff",
    effect: "hologram"
  },
  {
    name: "Sarah Guo",
    handle: "@saranormous",
    role: "Startup Investor",
    bio: "Founder of Conviction, accelerating AI adoption.",
    icon: <Zap className="w-12 h-12" />,
    color: "#00ffff",
    effect: "binary"
  },
  {
    name: "Theo",
    handle: "@theo",
    role: "CEO of t3.gg",
    bio: "YouTuber, investor, and developer.",
    icon: <Code2 className="w-12 h-12" />,
    color: "#ffa500",
    effect: "flames"
  },
  {
    name: "Evan You",
    handle: "@youyuxi",
    role: "Founder of VoidZeroDev",
    bio: "Creator of Vue.js & Vite.js",
    icon: <Terminal className="w-12 h-12" />,
    color: "#ff00ff",
    effect: "framework"
  },
  {
    name: "KP",
    handle: "@thisiskp_",
    role: "The 'Build In Public' Guy",
    bio: "AI Launchpad & Founder Relations at PaddleHQ",
    icon: <Users className="w-12 h-12" />,
    color: "#ff0000",
    effect: "ai"
  },
  {
    name: "Alex Albert",
    handle: "@alexalbert__",
    role: "Head of Claude Relations",
    bio: "At Anthropic AI",
    icon: <Brain className="w-12 h-12" />,
    color: "#ffff00",
    effect: "intelligence"
  },
  {
    name: "Ben Tossell",
    handle: "@bentossell",
    role: "AI Builder",
    bio: "Twin dad, ex-founder of Makerpad (acquired by Zapier)",
    icon: <Rocket className="w-12 h-12" />,
    color: "#00ff00",
    effect: "visionary"
  }
];

const JudgeCard: React.FC<{ judge: Judge; index: number }> = ({ judge, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const [isHovered, setIsHovered] = useState(false);
  const [bioText, setBioText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1,
          delay: index * 0.1
        }
      });
    }
  }, [controls, inView, index]);

  // Play terminal sound on hover
  useEffect(() => {
    if (isHovered) {
      const audio = new Audio('/sounds/terminal.mp3');
      audio.play().catch(() => {});
    }
  }, [isHovered]);

  useEffect(() => {
    if (isHovered && !isTyping) {
      setIsTyping(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < judge.bio.length) {
          setBioText(prev => prev + judge.bio[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered, judge.bio, isTyping]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      className="judge-card relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setBioText('');
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md rounded-lg" />
      
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`text-${judge.color} transform group-hover:rotate-360 transition-transform duration-500`}>
            {judge.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{judge.name}</h3>
            <div className="flex items-center gap-2 text-[#00ff00]">
              <Twitter className="w-4 h-4" />
              <span className="font-mono">{judge.handle}</span>
            </div>
          </div>
        </div>

        <div className="text-[#00ffff] font-mono mb-4">{judge.role}</div>
        
        <div className="terminal-text">
          {bioText}
          {isTyping && <span className="terminal-cursor">_</span>}
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <div className={`holographic-effect ${judge.effect}`} />
        <div className="scanline" />
      </div>

      {/* Katana reveal effect */}
      <div className="katana-reveal" />
    </motion.div>
  );
};

const JudgesSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [terminalText, setTerminalText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);

  const terminalLines = [
    "> decrypting judges...",
    "> retrieving elite cyber warriors...",
    "> access granted ✅"
  ];

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

    // Matrix code effect
    gsap.to('.matrix-code', {
      y: '100%',
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Katana reveal animation
    gsap.from('.katana-reveal', {
      x: '-100%',
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1
    });
  }, { scope: containerRef });

  useEffect(() => {
    if (currentLine < terminalLines.length) {
      const interval = setInterval(() => {
        setTerminalText(prev => {
          if (prev.length < terminalLines[currentLine].length) {
            return prev + terminalLines[currentLine][prev.length];
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setCurrentLine(prev => prev + 1);
              setTerminalText('');
            }, 1000);
            return prev;
          }
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentLine, terminalLines]);

  return (
    <div ref={containerRef} className="min-h-screen py-20 relative" id="judges">
      {/* Matrix code background */}
      <div className="matrix-background">
        <div className="matrix-code" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            Shadow Masters
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the legendary cyber ninjas guiding hackers through the shadows of innovation
          </p>
        </div>

        {/* Terminal effect */}
        <div className="terminal-container mb-12">
          <div className="terminal-text font-mono text-[#00ff00]">
            {terminalText}
            <span className="terminal-cursor">_</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {judges.map((judge, index) => (
            <JudgeCard key={judge.handle} judge={judge} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JudgesSection;