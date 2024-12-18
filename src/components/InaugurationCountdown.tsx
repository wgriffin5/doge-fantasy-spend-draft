import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import NotificationSignup from "./NotificationSignup";

export default function InaugurationCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  useEffect(() => {
    const inaugurationDate = new Date("2025-01-20T12:00:00");
    
    const updateTimer = () => {
      const now = new Date();
      const days = differenceInDays(inaugurationDate, now);
      const hours = differenceInHours(inaugurationDate, now) % 24;
      const minutes = differenceInMinutes(inaugurationDate, now) % 60;
      const seconds = differenceInSeconds(inaugurationDate, now) % 60;
      const milliseconds = Math.floor((inaugurationDate.getTime() - now.getTime()) % 1000 / 100);
      
      setTimeLeft({ days, hours, minutes, seconds, milliseconds });
    };

    const timer = setInterval(updateTimer, 100);
    updateTimer();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-4">
      <div className="inline-block bg-black/5 backdrop-blur-sm rounded-lg p-4 shadow-inner">
        <h2 className="text-xl font-bold mb-2 text-doge-gold">
          D.O.G.E. Activation Countdown
        </h2>
        <div className="flex items-center justify-center gap-1 font-mono text-2xl md:text-4xl font-bold">
          <div className="bg-black/10 px-3 py-2 rounded">
            <span className="text-doge-gold">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="text-xs block">days</span>
          </div>
          <span className="text-doge-gold">:</span>
          <div className="bg-black/10 px-3 py-2 rounded">
            <span className="text-doge-purple">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-xs block">hrs</span>
          </div>
          <span className="text-doge-purple">:</span>
          <div className="bg-black/10 px-3 py-2 rounded">
            <span className="text-doge-blue">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-xs block">min</span>
          </div>
          <span className="text-doge-blue">:</span>
          <div className="bg-black/10 px-3 py-2 rounded">
            <span className="text-doge-gold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-xs block">sec</span>
          </div>
          <span className="text-doge-gold">.</span>
          <div className="bg-black/10 px-2 py-2 rounded">
            <span className="text-doge-purple">{timeLeft.milliseconds}</span>
          </div>
        </div>
      </div>
      <NotificationSignup />
    </div>
  );
}