import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trophy, Bell, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
      if (!hasSeenPopup) {
        setOpen(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("player_levels")
        .insert([{ email, level: "rookie" }]);

      if (error) throw error;

      localStorage.setItem("hasSeenWelcomePopup", "true");
      toast.success("Welcome to Fantasy D.O.G.E.! You'll receive updates about your predictions.");
      setOpen(false);
    } catch (error) {
      console.error("Error saving email:", error);
      toast.error("Failed to save your email. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join the Reform Movement!</DialogTitle>
          <DialogDescription>
            Get notified when your predictions come true and compete for the top spot.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Trophy className="h-5 w-5 text-doge-gold" />
              <span>Track your prediction accuracy</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Bell className="h-5 w-5 text-doge-gold" />
              <span>Get notified of budget cuts</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <Share2 className="h-5 w-5 text-doge-gold" />
              <span>Join exclusive reform leagues</span>
            </motion.div>
          </div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-gradient-to-r from-doge-gold to-doge-purple">
            Start Tracking Predictions
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}