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
import { supabase } from "@/integrations/supabase/client";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      // Check localStorage first
      const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
      if (hasSeenPopup) {
        return;
      }

      // Get user's email if they're logged in
      const { data: { session } } = await supabase.auth.getSession();
      const userEmail = session?.user?.email;

      if (userEmail) {
        // Check if user already exists in player_levels
        const { data: playerLevel } = await supabase
          .from("player_levels")
          .select("id")
          .eq("email", userEmail)
          .single();

        // If user exists in player_levels, don't show popup
        if (playerLevel) {
          localStorage.setItem("hasSeenWelcomePopup", "true");
          return;
        }
      }

      // Show popup after delay if user hasn't seen it and hasn't signed up
      const timer = setTimeout(() => {
        setOpen(true);
      }, 30000);

      return () => clearTimeout(timer);
    };

    checkUserStatus();
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