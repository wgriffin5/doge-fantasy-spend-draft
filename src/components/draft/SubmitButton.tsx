import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
}

export default function SubmitButton({ isSubmitting, onClick }: SubmitButtonProps) {
  return (
    <Button
      className="w-full bg-gradient-to-r from-doge-gold to-doge-purple hover:from-doge-gold/90 hover:to-doge-purple/90 h-12 text-lg"
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Saving...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          <span>Save Draft Picks</span>
        </div>
      )}
    </Button>
  );
}