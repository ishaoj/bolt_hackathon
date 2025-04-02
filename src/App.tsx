import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrizesSection from './components/PrizesSection';
import JudgesSection from './components/JudgesSection';
import SponsorsSection from './components/SponsorsSection';
import NinjaTransition from './components/NinjaTransition';
import HackerConsole from './components/HackerConsole';
import NinjaBackground from './components/NinjaBackground';
import ThemesSection from './components/ThemesSection';
import NinjaEffect from './components/NinjaEffect';
import './styles/cyberpunk.css';

// Main content component
const MainContent = ({ isNavigating, showInitialAnimation, showHackerConsole, handleNavigation, onHackerConsoleClose }: {
  isNavigating: boolean;
  showInitialAnimation: boolean;
  showHackerConsole: boolean;
  handleNavigation: () => void;
  onHackerConsoleClose: () => void;
}) => {
  const [ninjaAction, setNinjaAction] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      setNinjaAction(true);
      setTimeout(() => setNinjaAction(false), 500);
    }
  }, [isNavigating]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 cyber-grid opacity-10" />
      <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 to-black/40" />
      
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 fog-animation" />
      </div>

      <NinjaBackground onAction={ninjaAction} />

      {showInitialAnimation && <NinjaTransition isInitial />}
      {isNavigating && <NinjaTransition isNavigating />}
      {showHackerConsole && <HackerConsole onClose={onHackerConsoleClose} />}

      <Navbar onNavClick={handleNavigation} />
      <main className="relative pt-16 z-10">
        <Hero />
        <PrizesSection />
        <ThemesSection />
        <JudgesSection />
        <SponsorsSection />
      </main>
    </div>
  );
};

// Registration page component with cyberpunk styling
const RegisterPage = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
    <div className="fixed inset-0 cyber-grid opacity-10" />
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900/20 to-black/40" />
    
    <div className="max-w-md w-full p-8 holographic rounded-lg relative z-10">
      <h2 className="text-3xl font-bold mb-8 text-center neon-text">Register for the Hackathon</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 terminal-text">Hacker Name</label>
          <input
            type="text"
            className="w-full bg-black/50 border border-[#00FFFF] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF007F] transition-all"
            placeholder="Enter your hacker alias"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 terminal-text">Email</label>
          <input
            type="email"
            className="w-full bg-black/50 border border-[#00FFFF] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF007F] transition-all"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 terminal-text">Skills</label>
          <input
            type="text"
            className="w-full bg-black/50 border border-[#00FFFF] rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FF007F] transition-all"
            placeholder="Your ninja skills"
          />
        </div>
        <button
          type="submit"
          className="w-full cyber-button bg-gradient-to-r from-[#FF007F] to-[#00FFFF] text-black font-bold py-3 rounded-lg"
        >
          JOIN THE CLAN
        </button>
      </form>
    </div>
  </div>
);

function App() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const [showHackerConsole, setShowHackerConsole] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [ninjaTrigger, setNinjaTrigger] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 2000);
  
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'h') {
        setShowHackerConsole(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleNavigation = () => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 1000);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setNinjaTrigger(Date.now().toString());
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainContent 
              isNavigating={isNavigating}
              showInitialAnimation={showInitialAnimation}
              showHackerConsole={showHackerConsole}
              handleNavigation={handleNavigation}
              onHackerConsoleClose={() => setShowHackerConsole(false)}
            />
          } 
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <NinjaEffect trigger={ninjaTrigger} />
    </Router>
  );
}

export default App;