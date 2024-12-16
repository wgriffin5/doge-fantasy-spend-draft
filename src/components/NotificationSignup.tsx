import { Bell } from "lucide-react";
import EmailSubmission from "./common/EmailSubmission";

export default function NotificationSignup() {
  return (
    <div className="max-w-md mx-auto mt-4">
      <EmailSubmission
        type="notification"
        buttonText={
          <>
            <Bell className="mr-2 h-4 w-4" />
            Get Notified
          </>
        }
        successMessage="You'll be notified of important updates! Check your email for confirmation."
        onSuccess={() => {}}
      />
    </div>
  );
}