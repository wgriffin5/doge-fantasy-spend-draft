import { BaseEmailForm } from "./BaseEmailForm";

interface VariantCProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  buttonIcon?: React.ReactNode;
}

export function VariantC(props: VariantCProps) {
  return (
    <div className="bg-secondary/50 p-4 rounded-lg">
      <div className="text-sm font-medium mb-2">Join thousands of players!</div>
      <BaseEmailForm 
        {...props} 
        className="flex gap-2"
      />
    </div>
  );
}