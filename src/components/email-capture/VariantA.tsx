import { BaseEmailForm } from "./BaseEmailForm";

interface VariantAProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  buttonIcon?: React.ReactNode;
}

export function VariantA(props: VariantAProps) {
  return (
    <BaseEmailForm 
      {...props} 
      className="flex gap-2"
    />
  );
}