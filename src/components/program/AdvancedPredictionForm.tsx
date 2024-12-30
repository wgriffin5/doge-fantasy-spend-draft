import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [predictionType, setPredictionType] = useState("cut");
  const [predictedAmount, setPredictedAmount] = useState(0);
  const [confidenceLevel, setConfidenceLevel] = useState(50);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reform_predictions").insert([
        {
          email: userEmail,
          program_id: program.id,
          prediction_type: predictionType,
          predicted_amount: predictedAmount,
          confidence_level: confidenceLevel,
          notes,
        },
      ]);

      if (error) throw error;

      toast.success("Prediction submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting prediction:", error);
      toast.error("Failed to submit prediction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-background p-4 rounded-lg border">
      <div className="space-y-2">
        <Label>Prediction Type</Label>
        <select
          value={predictionType}
          onChange={(e) => setPredictionType(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="cut">Complete Cut</option>
          <option value="reduction">Budget Reduction</option>
          <option value="merger">Program Merger</option>
          <option value="efficiency">Efficiency Improvement</option>
        </select>
      </div>

      {predictionType !== "cut" && (
        <div className="space-y-2">
          <Label>Predicted Amount ($)</Label>
          <Input
            type="number"
            value={predictedAmount}
            onChange={(e) => setPredictedAmount(Number(e.target.value))}
            min={0}
            max={program.annual_budget}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Confidence Level: {confidenceLevel}%</Label>
        <Slider
          value={[confidenceLevel]}
          onValueChange={(value) => setConfidenceLevel(value[0])}
          min={0}
          max={100}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Prediction"}
        </Button>
      </div>
    </form>
  );
}