import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Hourglass } from "lucide-react";

export default function InaugurationCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const inaugurationDate = new Date("2025-01-20T12:00:00-05:00"); // EST time

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = inaugurationDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-4 bg-gradient-to-br from-doge-purple via-doge-gold to-doge-blue">
      <div className="relative">
        <div className="absolute -top-3 -right-3">
          <div className="animate-pulse">
            <Hourglass className="h-6 w-6 text-white" />
          </div>
        </div>
        <h3 className="text-base font-bold mb-3 text-white text-center">
          Time Until Reform
        </h3>
        <div className="grid grid-cols-4 gap-1 text-center">
          {[
            { label: "D", value: timeLeft.days },
            { label: "H", value: timeLeft.hours },
            { label: "M", value: timeLeft.minutes },
            { label: "S", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:scale-105 transition-transform"
            >
              <div className="text-xl font-bold text-white animate-pulse">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs text-white/80">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}