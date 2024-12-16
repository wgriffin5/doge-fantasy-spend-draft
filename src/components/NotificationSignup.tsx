import { Bell } from "lucide-react";
import EmailSubmission from "./common/EmailSubmission";
import { useEffect, useState } from "react";

export default function NotificationSignup() {
  const [variant, setVariant] = useState<"A" | "B" | "C">("A");

  useEffect(() => {
    // Randomly assign user to a variant
    const variants: ("A" | "B" | "C")[] = ["A", "B", "C"];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    setVariant(randomVariant);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-4">
      <EmailSubmission
        type="notification"
        buttonText="Get Notified"
        buttonIcon={<Bell className="mr-2 h-4 w-4" />}
        successMessage="You'll be notified of important updates! Check your email for confirmation."
        onSuccess={() => {}}
        variant={variant}
      />
    </div>
  );
}