import { useEffect, useState } from "react";
import { Card } from "./ui/card";

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
    <Card className="p-6 bg-gradient-to-br from-doge-purple/10 to-doge-blue/10">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Countdown to Inauguration Day
      </h3>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-xs text-muted-foreground">Days</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs text-muted-foreground">Hours</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs text-muted-foreground">Minutes</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs text-muted-foreground">Seconds</div>
        </div>
      </div>
    </Card>
  );
}