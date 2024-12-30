import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Your Draft Submission</DialogTitle>
          <DialogDescription>
            You are about to submit {programCount} programs with a total budget cut of{" "}
            {formatBudget(totalBudget)}. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="bg-doge-gold hover:bg-doge-gold/90"
          >
            {isSubmitting ? "Submitting..." : "Confirm Submission"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}