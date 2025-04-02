import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Trophy, Gift, Award, PartyPopper, Sparkles} from 'lucide-react';

interface PrizeCardProps {
  title: string;
  amount: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ title, amount, description, icon, delay }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          duration: 1,
          delay
        }
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      className="holographic p-6 rounded-lg relative group"
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/10 to-[#FF007F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="text-[#00FFFF] mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        <div className="text-3xl font-bold mb-4 text-[#FF007F]">{amount}</div>
        <p className="text-gray-300">{description}</p>
        
        {/* Celebration button */}
        <motion.button 
          className="mt-4 px-4 py-2 bg-gradient-to-r from-[#FF007F] to-[#00FFFF] rounded-full text-white font-bold flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PartyPopper className="w-4 h-4" />
          Celebrate
        </motion.button>
      </div>

      {/* Holographic scanline effect */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent absolute top-0 left-0 animate-scan" />
      </div>
      
      {/* Celebratory confetti corners */}
      <div className="absolute -top-2 -right-2 text-yellow-400 transform rotate-12">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute -bottom-2 -left-2 text-pink-400 transform -rotate-12">
        <Sparkles className="w-6 h-6" />
      </div>
    </motion.div>
  );
};

const PrizesSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const confettiRef = useRef(null);

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

    // Floating particles
    gsap.to('.prize-particle', {
      y: 'random(-50, 50)',
      x: 'random(-50, 50)',
      rotation: 'random(180, 720)',
      duration: gsap.utils.random(2, 4),
      opacity: gsap.utils.random(0.3, 0.7),
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    
    // Confetti animation
    gsap.to('.confetti', {
      y: 'random(100, 300)',
      x: 'random(-100, 100)',
      rotation: 'random(180, 720)',
      scale: 'random(0.5, 1.5)',
      duration: gsap.utils.random(2, 6),
      opacity: 0,
      stagger: 0.1,
      repeat: -1,
      ease: "power1.in",
      onRepeat: function(confetti) {
        gsap.set(confetti.targets, {
          y: 'random(-50, 0)',
          x: 'random(-150, 150)',
          opacity: 1
        });
      }
    });
    
    // Trophy shine effect
    gsap.to('.trophy-shine', {
      x: '150%',
      duration: 1.5,
      repeat: -1,
      repeatDelay: 3,
      ease: "power2.inOut"
    });
    
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen py-20 relative overflow-hidden" id="prizes">
      {/* Background particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="prize-particle absolute w-2 h-2 bg-gradient-to-r from-[#00FFFF] to-[#FF007F] rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
      
      {/* Celebration confetti */}
      <div ref={confettiRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="confetti absolute w-3 h-3 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              backgroundColor: ['#FF007F', '#00FFFF', '#FFFF00', '#FF00FF', '#00FF00', '#FFA500'][Math.floor(Math.random() * 6)],
              clipPath: ['circle(50%)', 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'][Math.floor(Math.random() * 2)]
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <div className="flex justify-center items-center mb-6">
            <Sparkles className="w-8 h-8 text-[#FF007F] mr-4" />
            <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold neon-text inline-block">
              Prizes Worth $1M+
            </h2>
            <Sparkles className="w-8 h-8 text-[#00FFFF] ml-4" />
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Compete for glory and claim your share of the bounty in this legendary hackathon
          </p>
        </div>
        
        {/* Trophy showcase */}
        <div className="relative w-20 h-20 mx-auto mb-10">
          <div className="relative">
            <Trophy className="w-20 h-20 text-yellow-400" />
            <div className="trophy-shine absolute top-0 left-0 w-10 h-full -translate-x-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform rotate-15 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PrizeCard
            title="First Place"
            amount="$500,000"
            description="The ultimate prize for the most innovative and groundbreaking project"
            icon={<Trophy className="w-12 h-12" />}
            delay={0}
          />
          <PrizeCard
            title="Second Place"
            amount="$300,000"
            description="Runner-up prize for exceptional creativity and execution"
            icon={<Gift className="w-12 h-12" />}
            delay={0.2}
          />
          <PrizeCard
            title="Third Place"
            amount="$200,000"
            description="Bronze tier reward for outstanding achievement"
            icon={<Award className="w-12 h-12" />}
            delay={0.4}
          />
        </div>

        {/* Data stream decoration */}
        <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none opacity-20">
          <div className="data-stream w-full h-full" />
        </div>
        
        {/* Celebration ribbon */}
        <div className="absolute -top-4 right-0 w-32 h-32 overflow-hidden">
          <div className="absolute transform rotate-45 bg-gradient-to-r from-[#FF007F] to-[#00FFFF] text-white font-bold py-2 w-48 text-center" style={{ top: '16px', right: '-16px' }}>
            Celebrate!
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesSection;