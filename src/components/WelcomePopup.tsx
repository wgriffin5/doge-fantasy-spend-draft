import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import WelcomeFeatures from "./welcome/WelcomeFeatures";
import WelcomeForm from "./welcome/WelcomeForm";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
      if (!hasSeenPopup) {
        setOpen(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join the Reform Movement!</DialogTitle>
          <DialogDescription>
            Get notified when your predictions come true and compete for the top spot.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <WelcomeFeatures />
          <WelcomeForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}