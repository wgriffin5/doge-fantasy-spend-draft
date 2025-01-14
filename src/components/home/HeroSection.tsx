import { useEffect, useState } from "react";
import SocialShare from "@/components/SocialShare";
import InaugurationCountdown from "@/components/InaugurationCountdown";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Trophy, DollarSign, Users } from "lucide-react";
import useSound from "use-sound";

export default function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showCharacterTip, setShowCharacterTip] = useState(false);
  const [playHover] = useSound('/sounds/select.mp3', { volume: 0.5 });
  
  const phrases = [
    '"If I made a game, Fantasy DOGE would be it!" - Elon Musk',
    'Fantasy DOGE is like fantasy football, but instead of drafting football players, you draft the federal spending programs you think Most Likely to get cut by the Department of Government Efficiency.',
    'Fantasy DOGE - the game where you draft the federal spending programs that you think are most ripe for cuts by the Department of Government Efficiency. When they get cut, you earn points, compete, and win.'
  ];

  const characters = [
    {
      name: "Doge",
      image: "/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png",
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

  const [currentCharacter, setCurrentCharacter] = useState(characters[0]); // Start with Doge

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
            className="mb-8 relative max-w-2xl mx-auto"
          >
            <img
              src="/lovable-uploads/bdbfdeaa-9954-4832-b038-ef022726e8c4.png"
              alt="Uncle Elon Needs You"
              className="mx-auto rounded-lg shadow-lg"
            />
            
            <AnimatePresence>
              {showCharacterTip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute -right-2 md:right-0 top-1/2 transform -translate-y-1/2 max-w-[200px] z-10"
                >
                  <div className="relative">
                    <motion.img
                      src={currentCharacter.image}
                      alt={currentCharacter.name}
                      className="w-16 h-16 rounded-full border-2 border-doge-gold shadow-lg"
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                      onHoverStart={() => playHover()}
                    />
                    <motion.div 
                      className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="text-sm font-medium">{currentCharacter.quote}</div>
                      <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 rotate-45 w-4 h-4 bg-white dark:bg-gray-800" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

          <p className="text-lg md:text-xl font-medium text-foreground">
            You Draft the Waste, DOGE Cuts the Fat!
          </p>
          
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
                className="w-full sm:w-auto bg-gradient-to-r from-doge-gold to-doge-purple hover:from-doge-gold/90 hover:to-doge-purple/90 group relative"
                onMouseEnter={() => playHover()}
              >
                Start Drafting Now
                <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-doge-gold rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Button>
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
