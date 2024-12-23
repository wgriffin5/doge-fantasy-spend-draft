import { Bell } from "lucide-react";
import EmailSubmission from "./common/EmailSubmission";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function NotificationSignup() {
  const [variant, setVariant] = useState<"A" | "B" | "C">("A");
  const { toast } = useToast();

  useEffect(() => {
    // Randomly assign user to a variant
    const variants: ("A" | "B" | "C")[] = ["A", "B", "C"];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setVariant(randomVariant);
  }, []);

  const handleSuccess = (email: string) => {
    toast({
      title: "Notifications Enabled!",
      description: (
        <div className="space-y-2">
          <p>You'll be notified of important updates!</p>
          <p className="font-medium text-doge-gold">
            Check your email for confirmation and next steps.
          </p>
        </div>
      ),
      duration: 5000,
    });
    console.log("Notification signup successful:", email);
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <EmailSubmission
        type="notification"
        buttonText="Get Notified"
        buttonIcon={<Bell className="mr-2 h-4 w-4" />}
        successMessage="You'll be notified of important updates! Check your email for confirmation."
        onSuccess={handleSuccess}
        variant={variant}
      />
    </div>
  );
}