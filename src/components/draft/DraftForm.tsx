import { useState } from "react";
import { Button } from "@/components/ui/button";
import DraftEmailInput from "./DraftEmailInput";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DraftFormProps {
  selectedProgramsCount: number;
  onSubmit: (email: string) => void;
  disabled?: boolean;
}

export default function DraftForm({ selectedProgramsCount, onSubmit, disabled }: DraftFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (selectedProgramsCount !== 7) {
      toast.error("Please select exactly 7 programs before submitting");
      return;
    }

    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        {selectedProgramsCount < 7 && (
          <div className="text-sm text-muted-foreground">
            Select {7 - selectedProgramsCount} more program
            {selectedProgramsCount === 6 ? "" : "s"} to complete your draft
          </div>
        )}
        <DraftEmailInput
          email={email}
          setEmail={setEmail}
          disabled={disabled}
        />
        <Button
          type="submit"
          className="w-full bg-doge-gold hover:bg-doge-gold/90"
          disabled={disabled || selectedProgramsCount !== 7}
        >
          {disabled ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            <span>Submit Draft Picks</span>
          )}
        </Button>
      </div>
    </form>
  );
}