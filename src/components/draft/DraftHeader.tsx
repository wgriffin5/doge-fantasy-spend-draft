import { motion } from "framer-motion";

interface DraftHeaderProps {
  selectedCount: number;
  remainingCount: number;
}

export default function DraftHeader({ selectedCount, remainingCount }: DraftHeaderProps) {
  return (
    <div className="flex items-center justify-between text-lg sm:text-xl">
      <div className="flex items-center gap-2">
        Your Draft Picks
        <motion.div
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
            selectedCount === 7 ? "bg-green-500" : "bg-doge-gold"
          } text-white text-sm font-medium`}
          animate={{
            scale: selectedCount > 0 ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {selectedCount}
        </motion.div>
      </div>
      {remainingCount > 0 && (
        <motion.span 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {remainingCount} more to go
        </motion.span>
      )}
    </div>
  );
}