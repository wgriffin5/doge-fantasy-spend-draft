import SocialShare from "@/components/SocialShare";
import InaugurationCountdown from "@/components/InaugurationCountdown";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroSection() {
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
          <p className="mx-auto mb-6 md:mb-8 max-w-2xl text-base md:text-lg text-muted-foreground px-4">
            You Draft the Waste, DOGE Cuts the Fat!
          </p>
          
          <p className="mx-auto mb-6 md:mb-8 max-w-2xl text-sm italic text-muted-foreground">
            "If I made a game, Fantasy DOGE would be it!" - Elon Musk
          </p>

          <div className="mb-6 md:mb-8 space-y-4">
            <InaugurationCountdown />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToPrograms}
                className="w-full sm:w-auto bg-gradient-to-r from-doge-gold to-doge-purple hover:from-doge-gold/90 hover:to-doge-purple/90"
              >
                Start Drafting Now
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>1,000+ Active Players</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-doge-gold"></div>
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