import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trophy, ArrowUp, Combine, Zap } from "lucide-react";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
}

interface AdvancedPredictionFormProps {
  program: Program;
  onClose: () => void;
  userEmail: string;
}

export default function AdvancedPredictionForm({
  program,
  onClose,
  userEmail,
}: AdvancedPredictionFormProps) {
  const [predictionType, setPredictionType] = useState<string>("cut");
  const [predictedAmount, setPredictedAmount] = useState<string>("");
  const [confidenceLevel, setConfidenceLevel] = useState<string>("1");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case "cut":
        return Trophy;
      case "reduction":
        return ArrowUp;
      case "merger":
        return Combine;
      case "efficiency":
        return Zap;
      default:
        return Trophy;
    }
  };

  const handleSubmit = async () => {
    if (!userEmail) {
      toast.error("Please provide your email first");
      return;
    }

    setIsSubmitting(true);
    const PredictionIcon = getPredictionIcon(predictionType);

    try {
      const { error } = await supabase.from("reform_predictions").insert({
        email: userEmail,
        program_id: program.id,
        prediction_type: predictionType,
        predicted_amount:
          predictionType !== "cut" ? Number(predictedAmount) : null,
        confidence_level: Number(confidenceLevel),
        notes,
      });

      if (error) throw error;

      toast.success(
        <div className="flex items-center gap-2">
          <PredictionIcon className="h-5 w-5" />
          <span>Prediction submitted successfully!</span>
        </div>
      );
      onClose();
    } catch (error) {
      console.error("Error submitting prediction:", error);
      toast.error("Failed to submit prediction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Select value={predictionType} onValueChange={setPredictionType}>
        <SelectTrigger>
          <SelectValue placeholder="Select prediction type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cut">Full Program Cut</SelectItem>
          <SelectItem value="reduction">Partial Budget Reduction</SelectItem>
          <SelectItem value="merger">Program Merger</SelectItem>
          <SelectItem value="efficiency">Efficiency Improvement</SelectItem>
        </SelectContent>
      </Select>

      {predictionType !== "cut" && predictionType !== "efficiency" && (
        <Input
          type="number"
          placeholder="Predicted amount ($)"
          value={predictedAmount}
          onChange={(e) => setPredictedAmount(e.target.value)}
        />
      )}

      <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
        <SelectTrigger>
          <SelectValue placeholder="Select confidence level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Low Confidence (1x)</SelectItem>
          <SelectItem value="2">Medium Confidence (2x)</SelectItem>
          <SelectItem value="3">High Confidence (3x)</SelectItem>
          <SelectItem value="4">Very High Confidence (4x)</SelectItem>
          <SelectItem value="5">Extremely Confident (5x)</SelectItem>
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Add notes or justification for your prediction..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-doge-gold hover:bg-doge-gold/90"
        >
          {isSubmitting ? "Submitting..." : "Submit Prediction"}
        </Button>
      </div>
    </div>
  );
}