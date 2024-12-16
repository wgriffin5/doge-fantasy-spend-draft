import EmailSubmission from "../common/EmailSubmission";

interface WelcomeFormProps {
  onSuccess: () => void;
}

export default function WelcomeForm({ onSuccess }: WelcomeFormProps) {
  const handleSuccess = (email: string) => {
    localStorage.setItem("hasSeenWelcomePopup", "true");
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