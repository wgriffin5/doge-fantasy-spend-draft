import EmailSubmission from "../common/EmailSubmission";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";

export default function TopEmailCapture() {
  const handleSuccess = (email: string) => {
    // Scroll to program grid
    document.getElementById("program-grid")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });

    toast.success("Welcome aboard!", {
      description: (
        <div className="space-y-2">
          <p>Check your email for next steps.</p>
          <p className="flex items-center gap-2 font-medium text-doge-gold">
            Now, let's draft your programs! <ArrowDown className="h-4 w-4 animate-bounce" />
          </p>
        </div>
      ),
      duration: 5000,
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
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}