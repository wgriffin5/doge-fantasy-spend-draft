import EmailSubmission from "../common/EmailSubmission";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

interface WelcomeFormProps {
  onSuccess: () => void;
}

export default function WelcomeForm({ onSuccess }: WelcomeFormProps) {
  const { toast } = useToast();

  const handleSuccess = (email: string) => {
    localStorage.setItem("hasSeenWelcomePopup", "true");
    
    toast({
      title: "Welcome to Fantasy D.O.G.E.!",
      description: (
        <div className="space-y-2">
          <p>Your journey begins now!</p>
          <p className="flex items-center gap-2 font-medium text-doge-gold">
            Check your email for next steps <ArrowRight className="h-4 w-4 animate-pulse" />
          </p>
        </div>
      ),
      duration: 5000,
    });
    
    console.log("Welcome form submission successful:", email);
    onSuccess();
  };

  return (
    <div className="space-y-4">
      <EmailSubmission
        type="welcome"
        buttonText="Start Tracking Predictions"
        successMessage="Welcome to Fantasy D.O.G.E.! Check your email for next steps."
        onSuccess={handleSuccess}
        className="w-full"
      />
    </div>
  );
}