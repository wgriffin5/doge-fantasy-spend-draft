import { useEffect, useState } from "react";
import SocialShare from "@/components/SocialShare";
import InaugurationCountdown from "@/components/InaugurationCountdown";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Trophy, DollarSign, Users, Bell } from "lucide-react";
import useSound from "use-sound";
import { useIsMobile } from "@/hooks/use-mobile";
import NotificationSignup from "@/components/NotificationSignup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showCharacterTip, setShowCharacterTip] = useState(false);
  const [playHover] = useSound('/sounds/select.mp3', { volume: 0.5 });
  const isMobile = useIsMobile();
  
  const phrases = [
    '"If I made a game, Fantasy DOGE would be it!" - Elon Musk',
    'Fantasy DOGE is like fantasy football, but instead of drafting football players, you draft the federal spending programs you think Most Likely to get cut by the Department of Government Efficiency.',
    'Fantasy DOGE - the game where you draft the federal spending programs that you think are most ripe for cuts by the Department of Government Efficiency. When they get cut, you earn points, compete, and win.'
  ];

  const characters = [
    {
      name: "Doge",
      image: "/lovable-uploads/9337db98-0b92-4b9e-8aab-f85f6b4078c1.png",
      quote: "Wow! Much game. Very efficiency. Click to play!"
    },
    {
      name: "Elon",
      image: "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png",
      quote: "First principles approach: Eliminate inefficiency, redesign government. Much innovation!"
    },
    {
      name: "Donny",
      image: "/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png",
      quote: "This game is tremendous. The best game ever made. Believe me!"
    }
  ];

  const [currentCharacter, setCurrentCharacter] = useState(characters[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCharacterTip(true), 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCharacter((prev) => {
        const currentIndex = characters.findIndex(char => char.name === prev.name);
        const nextIndex = (currentIndex + 1) % characters.length;
        return characters[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToPrograms = () => {
    const programGrid = document.getElementById("program-grid");
    if (programGrid) {
      programGrid.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Title Section */}
          <div className="relative z-30 mb-12">
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

            <p className="text-lg md:text-xl font-medium text-foreground">
              You Draft the Waste, DOGE Cuts the Fat!
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {/* Elon Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-2xl mx-auto"
            >
              <img
                src="/lovable-uploads/bdbfdeaa-9954-4832-b038-ef022726e8c4.png"
                alt="Uncle Elon Needs You"
                className="mx-auto rounded-lg shadow-lg"
              />
            </motion.div>
            
            {/* Character Tip Section */}
            <AnimatePresence>
              {showCharacterTip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8"
                >
                  <motion.img
                    src={currentCharacter.image}
                    alt={currentCharacter.name}
                    className="w-16 h-16 rounded-full border-2 border-doge-gold shadow-lg"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                    onHoverStart={() => playHover()}
                  />
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-sm font-medium">{currentCharacter.quote}</div>
                    {!isMobile && (
                      <div 
                        className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-gray-800"
                      />
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-12">
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

          <div className="mb-6 md:mb-8 space-y-4">
            <InaugurationCountdown />
            
            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="min-h-[48px] w-full sm:w-auto bg-gradient-to-r from-doge-gold to-doge-purple hover:from-doge-gold/90 hover:to-doge-purple/90 group relative touch-manipulation"
                    onMouseEnter={() => playHover()}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Bell className="h-5 w-5" />
                      Get Notified & Start Playing
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Get Notified</DialogTitle>
                    <DialogDescription>
                      Stay updated on game events and your predictions!
                    </DialogDescription>
                  </DialogHeader>
                  <NotificationSignup />
                </DialogContent>
              </Dialog>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>1,000+ Active Players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-doge-gold animate-pulse"></div>
                <span>$50B+ Budget Cuts Predicted</span>
              </div>
            </div>
          </div>
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
