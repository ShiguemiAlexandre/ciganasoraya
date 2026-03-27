import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  const isLongWait = timeLeft.days > 3;

  return (
    <div className="inline-flex items-center space-x-2 bg-purple-950/60 border border-purple-500/50 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.3)] animate-pulse mb-2 backdrop-blur-sm">
      <Clock size={14} className="text-purple-400" />
      <span className="text-[10px] font-bold text-purple-200 uppercase tracking-wider">
        {isLongWait ? (
          <>Revelação em: <span className="text-white font-mono text-xs">{timeLeft.days} dias</span></>
        ) : (
          <>Revelação em: <span className="text-white font-mono text-xs">{String(timeLeft.hours + (timeLeft.days * 24)).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span></>
        )}
      </span>
    </div>
  );
};

export default CountdownTimer;
