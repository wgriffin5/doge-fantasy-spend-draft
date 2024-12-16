import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import useSound from "use-sound";

interface CharacterAvatarProps {
  image: string;
  alt: string;
  color: string;
  Icon: LucideIcon;
  iconAnimation: {
    scale?: number;
    rotate?: number | number[];
    rotateY?: number;
  };
}

export default function CharacterAvatar({
  image,
  alt,
  color,
  Icon,
  iconAnimation,
}: CharacterAvatarProps) {
  const [playHover] = useSound('/sounds/select.mp3', { volume: 0.5 });

  return (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ 
        scale: 1.2,
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.5 }
      }}
      onHoverStart={() => playHover()}
    >
      <motion.div className="relative">
        <motion.img
          src={image}
          alt={alt}
          className={`w-10 h-10 rounded-full shadow-lg hover:ring-2 hover:ring-${color} transition-all`}
          whileHover={{ 
            boxShadow: `0 0 25px ${color}`,
          }}
        />
        <motion.div
          className={`absolute -bottom-1 -right-1 bg-${color} rounded-full p-1`}
          whileHover={iconAnimation}
          transition={{ duration: 0.5 }}
        >
          <Icon className="text-white w-3 h-3" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}