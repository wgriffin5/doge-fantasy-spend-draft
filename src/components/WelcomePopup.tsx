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

      // Function to check if user is actively engaged
      const isUserEngaged = () => {
        // Check if user has selected any programs
        const draftPicks = document.querySelector("#draft-picks");
        if (draftPicks) {
          const selectedPrograms = draftPicks.querySelectorAll("[data-selected='true']");
          if (selectedPrograms.length > 0) {
            return true;
          }
        }

        // Check if user is typing in any input
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
          return true;
        }

        return false;
      };

      // Show popup after delay if user hasn't seen it and isn't engaged
      const timer = setTimeout(() => {
        if (!isUserEngaged()) {
          setOpen(true);
        } else {
          // If user is engaged, mark as seen
          localStorage.setItem("hasSeenWelcomePopup", "true");
        }
      }, 30000);

      return () => clearTimeout(timer);
    };

    checkUserStatus();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white relative z-50">
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