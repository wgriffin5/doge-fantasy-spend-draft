import { Scissors, Axe, Flame } from "lucide-react";
import { motion } from "framer-motion";
import CharacterAvatar from "./characters/CharacterAvatar";

const characters = [
  {
    image: "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png",
    alt: "Lonnie",
    color: "doge-gold",
    Icon: Scissors,
    iconAnimation: { scale: 1.2, rotate: 360 }
  },
  {
    image: "/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png",
    alt: "Donny",
    color: "doge-purple",
    Icon: Flame,
    iconAnimation: { scale: 1.2, rotate: [0, -45, 45, -45, 0] }
  },
  {
    image: "/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png",
    alt: "V",
    color: "doge-blue",
    Icon: Axe,
    iconAnimation: { scale: 1.2, rotateY: 180 }
  }
];

export default function ReformLogo() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="grid grid-cols-3 gap-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {characters.map((character) => (
            <CharacterAvatar
              key={character.alt}
              {...character}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}