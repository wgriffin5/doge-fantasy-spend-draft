import EmailSubmission from "../common/EmailSubmission";
import { useToast } from "@/components/ui/use-toast";

export default function TopEmailCapture() {
  const { toast } = useToast();

  const handleSuccess = (email: string) => {
    toast({
      title: "Welcome aboard!",
      description: "Check your email for next steps.",
    });
    console.log("Email submission successful:", email);
  };

  return (
    <div className="w-full bg-gradient-to-r from-doge-gold/10 via-doge-purple/10 to-doge-blue/10 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <EmailSubmission
              type="welcome"
              buttonText="Start Drafting"
              successMessage="Welcome aboard! Check your email for next steps."
              onSuccess={handleSuccess}
              variant="C"
            />
          </div>
        </div>
      </div>
    </div>
  );
}