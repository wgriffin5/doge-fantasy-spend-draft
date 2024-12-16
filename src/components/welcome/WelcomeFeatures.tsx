import { motion } from "framer-motion";
import { Trophy, Bell, Share2 } from "lucide-react";

export default function WelcomeFeatures() {
  return (
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
  );
}