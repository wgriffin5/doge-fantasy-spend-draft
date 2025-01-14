import { useEffect, useState } from "react";
import SocialShare from "@/components/SocialShare";
import InaugurationCountdown from "@/components/InaugurationCountdown";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Trophy, DollarSign, Users } from "lucide-react";

export default function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  const phrases = [
    '"If I made a game, Fantasy DOGE would be it!" - Elon Musk',
    'Fantasy DOGE is like fantasy football, but instead of drafting football players, you draft the federal spending programs you think Most Likely to get cut by the Department of Government Efficiency.',
    'Fantasy DOGE - the game where you draft the federal spending programs that you think are most ripe for cuts by the Department of Government Efficiency. When they get cut, you earn points, compete, and win.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const scrollToPrograms = () => {
    document.getElementById("program-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img
              src="/lovable-uploads/bdbfdeaa-9954-4832-b038-ef022726e8c4.png"
              alt="Uncle Elon Needs You"
              className="mx-auto max-w-md rounded-lg shadow-lg"
            />
          </motion.div>
          
          <h1 className="mb-4 md:mb-6 text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            Fantasy{" "}
            <span className="relative">
              <span className="relative z-10 doge-gradient-text">D.O.G.E.</span>
              <span
                className="absolute inset-0 doge-gradient opacity-75 blur-sm"
                aria-hidden="true"
              ></span>
            </span>
          </h1>

          <div className="mx-auto mb-8 max-w-2xl space-y-4">
            <p className="text-lg md:text-xl font-medium text-foreground">
              You Draft the Waste, DOGE Cuts the Fat!
            </p>
            
            <motion.p 
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-sm italic text-muted-foreground"
            >
              {phrases[currentPhraseIndex]}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="doge-card group hover:scale-105 transition-all">
                <Trophy className="mx-auto mb-2 h-6 w-6 text-doge-gold group-hover:scale-110 transition-all" />
                <p className="font-medium">Draft Programs</p>
                <p className="text-muted-foreground">Pick programs you think will be cut</p>
              </div>
              <div className="doge-card group hover:scale-105 transition-all">
                <DollarSign className="mx-auto mb-2 h-6 w-6 text-doge-purple group-hover:scale-110 transition-all" />
                <p className="font-medium">Earn Points</p>
                <p className="text-muted-foreground">Get rewarded for correct predictions</p>
              </div>
              <div className="doge-card group hover:scale-105 transition-all">
                <Users className="mx-auto mb-2 h-6 w-6 text-doge-blue group-hover:scale-110 transition-all" />
                <p className="font-medium">Compete & Win</p>
                <p className="text-muted-foreground">Rise to the top of the leaderboard</p>
              </div>
            </div>
          </div>

          <div className="mb-6 md:mb-8 space-y-4">
            <InaugurationCountdown />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToPrograms}
                className="w-full sm:w-auto bg-gradient-to-r from-doge-gold to-doge-purple hover:from-doge-gold/90 hover:to-doge-purple/90 group"
              >
                Start Drafting Now
                <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>1,000+ Active Players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-doge-gold animate-pulse"></div>
                <span>$50B+ Budget Cuts Predicted</span>
              </div>
            </motion.div>
          </div>

          <SocialShare />
        </div>
      </div>

      <div className="absolute -top-40 left-0 h-96 w-96 animate-float opacity-10">
        <div className="doge-gradient h-full w-full rounded-full blur-3xl"></div>
      </div>
      <div className="absolute -bottom-40 right-0 h-96 w-96 animate-float opacity-10">
        <div className="doge-gradient h-full w-full rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}