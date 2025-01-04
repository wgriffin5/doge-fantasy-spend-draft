import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { X, ArrowRight } from "lucide-react";
import useSound from "use-sound";

interface Step {
  target: string;
  title: string;
  message: string;
  position: "top" | "bottom" | "left" | "right";
  action?: string;
}

const steps: Step[] = [
  {
    target: "#how-to-play",
    title: "Welcome to Fantasy D.O.G.E!",
    message: "Your mission is to pick the 7 federal spending programs that you think are the most wasteful, bloated, useless and likely to be cut. If or when DOGE cuts your drafted programs, you'll earn points!",
    position: "bottom",
    action: "Let's get started!"
  },
  {
    target: "#program-grid",
    title: "Browse Programs",
    message: "Here are the government spending programs you can draft. Each program has a description and a risk level indicating how likely it is to be cut by DOGE. Look for programs you think are wasteful or vulnerable!",
    position: "left",
    action: "Show me how to draft"
  },
  {
    target: "#draft-picks",
    title: "Your Draft Picks",
    message: "This is your picks basket. You can draft up to 7 programs you predict will be cut or streamlined. Choose wisely - you can remove programs if you change your mind!",
    position: "left",
    action: "Got it!"
  },
  {
    target: "#email-input",
    title: "Save Your Picks",
    message: "Once you've selected your programs, enter your email to save your draft and track your predictions. We'll notify you when DOGE makes cuts!",
    position: "top",
    action: "Start drafting!"
  },
];

export default function GuidedTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [playSelect] = useSound('/sounds/select.mp3', { volume: 0.5 });

  useEffect(() => {
    // Check localStorage immediately on mount
    const hasSeenTour = localStorage.getItem("hasSeenDOGETour");
    if (!hasSeenTour) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    playSelect();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem("hasSeenDOGETour", "true");
    setIsVisible(false);
  };

  const handleSkip = () => {
    playSelect();
    handleComplete();
  };

  if (!isVisible) return null;

  const currentTarget = document.querySelector(steps[currentStep].target);
  if (!currentTarget) return null;

  const { top, left, width, height } = currentTarget.getBoundingClientRect();
  const scrollY = window.scrollY;

  let spotlightPosition = { x: left, y: top + scrollY };
  switch (steps[currentStep].position) {
    case "bottom":
      spotlightPosition.y += height + 20;
      break;
    case "top":
      spotlightPosition.y -= 100;
      break;
    case "left":
      spotlightPosition.x -= 320;
      break;
    case "right":
      spotlightPosition.x += width + 20;
      break;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div className="absolute inset-0 bg-black/50" />
        
        <motion.div
          className="absolute"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: spotlightPosition.x,
            y: spotlightPosition.y,
          }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-80 bg-white rounded-lg shadow-xl pointer-events-auto">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">{steps[currentStep].message}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${
                        index === currentStep
                          ? "bg-doge-gold"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <Button 
                  onClick={handleNext} 
                  className="bg-doge-gold hover:bg-doge-gold/90 flex items-center gap-2"
                >
                  {steps[currentStep].action || "Next"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            x: currentTarget ? left - 4 : 0,
            y: currentTarget ? top + scrollY - 4 : 0,
            width: currentTarget ? width + 8 : 0,
            height: currentTarget ? height + 8 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: "0 0 0 4000px rgba(0, 0, 0, 0.5)",
            border: "2px solid #F2A900",
            borderRadius: "8px",
          }}
        />
      </div>
    </AnimatePresence>
  );
}