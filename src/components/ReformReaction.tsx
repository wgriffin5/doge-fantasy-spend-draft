import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";

interface ReformReactionProps {
  type: "success" | "warning" | "error";
}

export default function ReformReaction({ type }: ReformReactionProps) {
  const [playHover] = useSound('/sounds/select.mp3', { volume: 0.5 });

  const getImage = () => {
    switch (type) {
      case "success":
        return {
          src: "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png",
          color: "doge-gold"
        };
      case "warning":
        return {
          src: "/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png",
          color: "doge-purple"
        };
      case "error":
        return {
          src: "/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png",
          color: "doge-blue"
        };
      default:
        return {
          src: "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png",
          color: "doge-gold"
        };
    }
  };

  const image = getImage();

  const variants = {
    initial: { 
      scale: 0,
      opacity: 0,
      y: 50,
      rotate: -180
    },
    animate: { 
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    exit: { 
      scale: 0,
      opacity: 0,
      y: 50,
      rotate: 180,
      transition: {
        duration: 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        onHoverStart={() => playHover()}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.div 
          className={`relative w-12 h-12 rounded-full overflow-hidden border-2 border-${image.color} shadow-lg hover:shadow-${image.color}/30 transition-shadow duration-300`}
        >
          <motion.img
            src={image.src}
            alt="Reform Reaction"
            className="w-full h-full object-cover"
          />
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-t from-${image.color}/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300`}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}