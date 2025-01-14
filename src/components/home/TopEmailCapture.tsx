import EmailSubmission from "../common/EmailSubmission";
import { toast } from "sonner";
import { ArrowDown, Bell } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-r from-doge-gold/10 via-doge-purple/10 to-doge-blue/10 py-6 sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-muted-foreground">
                Join 1,000+ players tracking $50B+ in potential budget cuts
              </p>
            </div>
            <EmailSubmission
              type="welcome"
              buttonText="Get Started"
              buttonIcon={<Bell className="mr-2 h-4 w-4" />}
              successMessage="Welcome aboard! Check your email for next steps."
              onSuccess={handleSuccess}
              variant="C"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}