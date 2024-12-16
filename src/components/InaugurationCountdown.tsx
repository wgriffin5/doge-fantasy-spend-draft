import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import NotificationSignup from "./NotificationSignup";

export default function InaugurationCountdown() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const inaugurationDate = new Date("2025-01-20");
    const today = new Date();
    setDaysLeft(differenceInDays(inaugurationDate, today));
  }, []);

  return (
    <div className="text-center space-y-4">
      <div className="text-4xl font-bold">
        <span className="text-doge-gold">{daysLeft}</span> Days
        <span className="block text-xl text-muted-foreground">
          Until the Next Inauguration
        </span>
      </div>
      <NotificationSignup />
    </div>
  );
}