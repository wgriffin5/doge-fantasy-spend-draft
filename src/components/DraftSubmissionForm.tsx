import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useSound from "use-sound";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface DraftSubmissionFormProps {
  selectedPrograms: Program[];
  totalBudget: number;
  formatBudget: (budget: number) => string;
  onEmailSubmit: (email: string) => void;
}

export default function DraftSubmissionForm({
  selectedPrograms,
  totalBudget,
  formatBudget,
  onEmailSubmit,
}: DraftSubmissionFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [playSuccess] = useSound("/sounds/success.mp3", { volume: 0.5 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);
    
    if (!email) {
      console.log("Email validation failed - empty email");
      toast.error("Please enter your email address");
      return;
    }
    
    if (selectedPrograms.length !== 7) {
      console.log("Program count validation failed:", selectedPrograms.length);
      toast.error("Please select exactly 7 programs before submitting");
      return;
    }
    
    setIsSubmitting(true);
    console.log("Starting submission process...");
    
    try {
      console.log("Calling onEmailSubmit with programs:", selectedPrograms);
      await onEmailSubmit(email);
      console.log("Email submission successful");
      playSuccess();
      toast.success("Your draft picks have been submitted!");
      setEmail("");
    } catch (error) {
      console.error("Email submission failed:", error);
      toast.error("Failed to submit draft picks. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("Submission process completed");
    }
  };

  if (selectedPrograms.length === 0) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        {selectedPrograms.length < 7 && (
          <div className="text-sm text-muted-foreground">
            Select {7 - selectedPrograms.length} more program{selectedPrograms.length === 6 ? '' : 's'} to complete your draft
          </div>
        )}
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            type="submit"
            className="w-full bg-doge-gold hover:bg-doge-gold/90"
            disabled={isSubmitting || selectedPrograms.length !== 7}
          >
            {isSubmitting ? "Submitting..." : "Submit Draft Picks"}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}