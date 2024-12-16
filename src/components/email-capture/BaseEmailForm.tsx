import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BaseEmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  className?: string;
}

export function BaseEmailForm({
  email,
  setEmail,
  isSubmitting,
  onSubmit,
  buttonText,
  buttonIcon,
  className = "",
}: BaseEmailFormProps) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
        disabled={isSubmitting}
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-gradient-to-r from-doge-gold to-doge-purple"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Saving...</span>
          </div>
        ) : (
          <div className="flex items-center">
            {buttonIcon}
            <span>{buttonText}</span>
          </div>
        )}
      </Button>
    </form>
  );
}