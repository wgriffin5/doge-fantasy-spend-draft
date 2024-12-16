import { motion } from "framer-motion";

interface ReformReactionProps {
  type: "success" | "warning" | "error";
}

export default function ReformReaction({ type }: ReformReactionProps) {
  const getImage = () => {
    switch (type) {
      case "success":
        return "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png"; // Elon for success
      case "warning":
        return "/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png"; // Donald for warning
      case "error":
        return "/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png"; // Vivek for error
      default:
        return "/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png";
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <img
        src={getImage()}
        alt="Reform Reaction"
        className="w-12 h-12 rounded-full shadow-lg"
      />
    </motion.div>
  );
}