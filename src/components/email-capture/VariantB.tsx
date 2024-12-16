import { BaseEmailForm } from "./BaseEmailForm";

interface VariantBProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  buttonIcon?: React.ReactNode;
}

export function VariantB(props: VariantBProps) {
  return (
    <BaseEmailForm 
      {...props} 
      className="flex flex-col gap-2"
    />
  );
}