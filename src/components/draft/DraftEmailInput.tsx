import { Input } from "@/components/ui/input";

interface DraftEmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  disabled?: boolean;
}

export default function DraftEmailInput({ email, setEmail, disabled }: DraftEmailInputProps) {
  return (
    <Input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => {
        console.log("Email input changed:", e.target.value);
        setEmail(e.target.value);
      }}
      disabled={disabled}
      className="w-full"
    />
  );
}