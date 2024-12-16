import { Input } from "@/components/ui/input";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
}

export default function EmailInput({ email, setEmail, isSubmitting }: EmailInputProps) {
  return (
    <Input
      type="email"
      placeholder="Enter your email to save picks"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      disabled={isSubmitting}
    />
  );
}