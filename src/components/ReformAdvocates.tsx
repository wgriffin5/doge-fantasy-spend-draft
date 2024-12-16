import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function ReformAdvocates() {
  const [descriptionIndex, setDescriptionIndex] = useState(0);

  const advocates = [
    {
      name: "Lonnie Rockets",
      image: "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png",
      titles: ["Rocket Bro", "Mars Guy", "X Man", "Autistic African Immigrant", "Billionaire"],
      color: "doge-gold"
    },
    {
      name: "Donny Fairways",
      image: "/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png",
      titles: ["Melania's Husband", "Baron's Dad", "Casino Owner", "Reality TV Star", "You're Fired", "Billionaire"],
      color: "doge-purple"
    },
    {
      name: "V Brah",
      image: "/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png",
      titles: ["Bio Billionaire", "Hair Product Model"],
      color: "doge-blue"
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
    <div className="flex justify-center gap-8 py-6">
      {advocates.map((advocate) => (
        <motion.div
          key={advocate.name}
          className="text-center group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="relative"
            whileHover={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className={`w-24 h-24 border-4 border-${advocate.color} transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${advocate.color}/30`}>
              <AvatarImage 
                src={advocate.image} 
                alt={advocate.name}
                className="transition-all duration-300"
              />
              <AvatarFallback>{advocate.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent rounded-b-full" />
          </motion.div>
          <motion.h3 
            className="mt-2 font-bold"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {advocate.name}
          </motion.h3>
          <motion.p 
            className="text-sm text-muted-foreground"
            key={advocate.titles[descriptionIndex % advocate.titles.length]}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {advocate.titles[descriptionIndex % advocate.titles.length]}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}