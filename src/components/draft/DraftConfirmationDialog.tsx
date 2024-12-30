import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DraftConfirmationDialogProps {
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  programCount: number;
  totalBudget: number;
  formatBudget: (budget: number) => string;
  open: boolean;
}

export default function DraftConfirmationDialog({
  onCancel,
  onConfirm,
  isSubmitting,
  programCount,
  totalBudget,
  formatBudget,
  open,
}: DraftConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Draft Submission</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to submit {programCount} programs with a total budget cut of{" "}
            {formatBudget(totalBudget)}. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-2">
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}