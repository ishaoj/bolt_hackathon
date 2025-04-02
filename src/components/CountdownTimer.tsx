import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const CountdownTimer = () => {
  const targetDate = new Date('2024-12-31T23:59:59').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 flex flex-col items-center">
      <Clock className="w-8 h-8 text-red-500 mb-4" />
      <div className="flex justify-center space-x-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-2xl sm:text-4xl font-mono text-red-500 relative">
              {value.toString().padStart(2, '0')}
              <div className="absolute -inset-1 border border-red-500/20 rounded" />
            </span>
            <span className="text-xs sm:text-sm uppercase text-gray-400 mt-2">{unit}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;