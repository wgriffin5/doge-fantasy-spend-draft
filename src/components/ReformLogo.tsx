import { Scissors, Axe, Flame } from "lucide-react";
import { motion } from "framer-motion";

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
          {/* Lonnie with rockets */}
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <motion.img
              src="/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png"
              alt="Lonnie"
              className="w-10 h-10 rounded-full shadow-lg hover:ring-2 hover:ring-doge-gold transition-all"
              whileHover={{ 
                boxShadow: "0 0 25px rgba(242, 169, 0, 0.7)",
              }}
            />
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="mt-1"
            >
              <Scissors className="text-doge-gold w-4 h-4" />
            </motion.div>
          </motion.div>
          
          {/* Donny with flame */}
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <motion.img
              src="/lovable-uploads/574113f5-dcac-411e-8a5a-d310e7d6805c.png"
              alt="Donny"
              className="w-10 h-10 rounded-full shadow-lg hover:ring-2 hover:ring-doge-purple transition-all"
              whileHover={{ 
                boxShadow: "0 0 25px rgba(155, 135, 245, 0.7)",
              }}
            />
            <motion.div
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -45, 45, -45, 0],
              }}
              transition={{ duration: 0.5 }}
              className="mt-1"
            >
              <Flame className="text-doge-purple w-4 h-4" />
            </motion.div>
          </motion.div>
          
          {/* V with axe */}
          <motion.div 
            className="flex flex-col items-center"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <motion.img
              src="/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png"
              alt="V"
              className="w-10 h-10 rounded-full shadow-lg hover:ring-2 hover:ring-doge-blue transition-all"
              whileHover={{ 
                boxShadow: "0 0 25px rgba(40, 160, 240, 0.7)",
              }}
            />
            <motion.div
              whileHover={{ 
                scale: 1.2,
                rotateY: 180
              }}
              transition={{ duration: 0.5 }}
              className="mt-1"
            >
              <Axe className="text-doge-blue w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}