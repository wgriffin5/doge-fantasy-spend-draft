import { Button } from "@/components/ui/button";

interface DraftConfirmationDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  programCount: number;
  totalBudget: number;
  formatBudget: (budget: number) => string;
}

export default function DraftConfirmationDialog({
  onCancel,
  onConfirm,
  isSubmitting,
  programCount,
  totalBudget,
  formatBudget,
}: DraftConfirmationDialogProps) {
  console.log("Rendering confirmation dialog:", {
    isSubmitting,
    programCount,
    totalBudget,
  });

  return (
    <div className="border rounded-lg p-4 bg-card">
      <h3 className="font-semibold mb-2">Confirm Your Draft Submission</h3>
      <p className="text-sm text-muted-foreground mb-4">
        You are about to submit {programCount} programs with a total budget cut of{" "}
        {formatBudget(totalBudget)}. This action cannot be undone.
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("Confirm button clicked in dialog");
            onConfirm();
          }}
          disabled={isSubmitting}
          className="bg-doge-gold hover:bg-doge-gold/90"
        >
          {isSubmitting ? "Submitting..." : "Confirm Submission"}
        </Button>
      </div>
    </div>
  );
}