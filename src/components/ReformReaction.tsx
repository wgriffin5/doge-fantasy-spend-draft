import { motion, AnimatePresence } from "framer-motion";

interface ReformReactionProps {
  type: "success" | "warning" | "error";
}

export default function ReformReaction({ type }: ReformReactionProps) {
  const getImage = () => {
    switch (type) {
      case "success":
        return "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png"; // Lonnie for success
      case "warning":
        return "/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png"; // Donny for warning
      case "error":
        return "/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png"; // V for error
      default:
        return "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png";
    }
  };

  const variants = {
    initial: { scale: 0, opacity: 0, y: 50 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
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
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.img
          src={getImage()}
          alt="Reform Reaction"
          className="w-12 h-12 rounded-full shadow-lg"
          whileHover={{ 
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 }
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}