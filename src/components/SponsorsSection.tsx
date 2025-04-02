import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Database, Cloud, Shield, Bug, Mail, Coins, Brain, Users } from 'lucide-react';
import './SponsorsSection.css';

const sponsors = [
  {
    name: "Supabase",
    handle: "@Supabase",
    title: "Open Source Firebase Alternative",
    icon: <Database className="w-12 h-12" />,
    description: "The Open Source Firebase Alternative"
  },
  {
    name: "Netlify",
    handle: "@Netlify",
    title: "Modern Web Deployment",
    icon: <Cloud className="w-12 h-12" />,
    description: "The Modern Web Deployment Platform"
  },
  {
    name: "Cloudflare",
    handle: "@CloudflareDev",
    title: "Internet Security & Speed",
    icon: <Shield className="w-12 h-12" />,
    description: "Securing & Speeding Up the Internet"
  },
  {
    name: "Sentry",
    handle: "@GetSentry",
    title: "Application Monitoring",
    icon: <Bug className="w-12 h-12" />,
    description: "Application Monitoring for Developers"
  },
  {
    name: "Loops",
    handle: "@Loops",
    title: "Email Marketing Automation",
    icon: <Mail className="w-12 h-12" />,
    description: "Automated Email Marketing for Startups"
  },
  {
    name: "Algo Foundation",
    handle: "@AlgoFoundation",
    title: "Next-Gen Blockchain",
    icon: <Coins className="w-12 h-12" />,
    description: "Pioneering the Next-Gen Blockchain"
  },
  {
    name: "Exa AI Labs",
    handle: "@ExaAILabs",
    title: "AI Research & Development",
    icon: <Brain className="w-12 h-12" />,
    description: "Cutting-Edge AI Research & Development"
  },
  {
    name: "Hacker House",
    handle: "@hsrhackerhouse",
    title: "Innovator Community",
    icon: <Users className="w-12 h-12" />,
    description: "A Community for Startup Founders & Innovators"
  }
];

interface SponsorCardProps {
  name: string;
  handle: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ name, handle, title, description, icon, delay }) => {
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
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/10 to-[#FF007F]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="text-[#00FFFF] mb-4 transform group-hover:rotate-360 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-2 text-white">{name}</h3>
        <div className="text-lg font-bold mb-2 text-[#FF007F]">{handle}</div>
        <div className="text-sm text-gray-400 mb-4">{title}</div>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* Holographic scanline effect */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent absolute top-0 left-0 animate-scan" />
      </div>

      {/* Glitch effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-[#00FFFF]/5 animate-glitch" />
      </div>
    </motion.div>
  );
};

const SponsorsSection = () => {
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

    // Floating particles
    gsap.to('.sponsor-particle', {
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

    // Data stream animation
    gsap.to('.data-stream', {
      x: '100%',
      duration: 3,
      repeat: -1,
      ease: "none"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen py-20 relative" id="sponsors">
      {/* Background particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="sponsor-particle absolute w-2 h-2 bg-gradient-to-r from-[#00FFFF] to-[#FF007F] rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 neon-text">
            Powerhouses
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join forces with the tech industry's most innovative companies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <SponsorCard
              key={sponsor.handle}
              {...sponsor}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Data stream decoration */}
        <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none opacity-20">
          <div className="data-stream w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;