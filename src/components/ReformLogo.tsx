import { Scissors, Axe, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function ReformLogo() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="grid grid-cols-3 gap-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Elon with scissors */}
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png"
              alt="Elon"
              className="w-8 h-8 rounded-full hover:ring-2 hover:ring-doge-gold transition-all"
            />
            <Scissors className="text-doge-gold mt-1 w-4 h-4" />
          </motion.div>
          
          {/* Donald with flame */}
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png"
              alt="Donald"
              className="w-8 h-8 rounded-full hover:ring-2 hover:ring-doge-purple transition-all"
            />
            <Flame className="text-doge-purple mt-1 w-4 h-4" />
          </motion.div>
          
          {/* Vivek with axe */}
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src="/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png"
              alt="Vivek"
              className="w-8 h-8 rounded-full hover:ring-2 hover:ring-doge-blue transition-all"
            />
            <Axe className="text-doge-blue mt-1 w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}