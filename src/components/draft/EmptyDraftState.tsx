import { motion } from "framer-motion";

export default function EmptyDraftState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
    >
      <p className="text-sm sm:text-base text-muted-foreground">
        Drag and drop programs here to draft them.
        <br />
        Draft 7 programs to cut from the federal budget.
      </p>
    </motion.div>
  );
}