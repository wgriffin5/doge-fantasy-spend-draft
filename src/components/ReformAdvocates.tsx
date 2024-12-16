import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";

export default function ReformAdvocates() {
  const [descriptionIndex, setDescriptionIndex] = useState(0);
  const [playHover] = useSound('/sounds/select.mp3', { volume: 0.5 });

  const advocates = [
    {
      name: "Lonnie Rockets",
      image: "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png",
      titles: ["Rocket Bro", "Mars Guy", "X Man", "Autistic African Immigrant", "Billionaire"],
      color: "doge-gold",
      gradient: "from-doge-gold/20 to-transparent"
    },
    {
      name: "Donny Fairways",
      image: "/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png",
      titles: ["Melania's Husband", "Baron's Dad", "Casino Owner", "Reality TV Star", "You're Fired", "Billionaire"],
      color: "doge-purple",
      gradient: "from-doge-purple/20 to-transparent"
    },
    {
      name: "V Brah",
      image: "/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png",
      titles: ["Bio Billionaire", "Hair Product Model"],
      color: "doge-blue",
      gradient: "from-doge-blue/20 to-transparent"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDescriptionIndex((prevIndex) => {
        const maxLength = Math.max(...advocates.map(a => a.titles.length));
        return (prevIndex + 1) % maxLength;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 py-4 sm:py-6 px-2">
      <AnimatePresence>
        {advocates.map((advocate, index) => (
          <motion.div
            key={advocate.name}
            className="text-center group cursor-pointer w-24 sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => playHover()}
          >
            <motion.div 
              className="relative mx-auto"
              whileHover={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-${advocate.color} transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${advocate.color}/30`}>
                <motion.img 
                  src={advocate.image} 
                  alt={advocate.name}
                  className="w-full h-full object-cover transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${advocate.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
            
            <motion.h3 
              className={`mt-2 sm:mt-3 font-bold text-sm sm:text-base text-${advocate.color}`}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {advocate.name}
            </motion.h3>
            
            <AnimatePresence mode="wait">
              <motion.p 
                key={advocate.titles[descriptionIndex % advocate.titles.length]}
                className="text-xs sm:text-sm text-muted-foreground h-4 sm:h-5"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {advocate.titles[descriptionIndex % advocate.titles.length]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}