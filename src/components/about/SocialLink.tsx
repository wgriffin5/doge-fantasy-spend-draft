import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  icon: LucideIcon;
  label: string;
  url: string;
}

export function SocialLink({ icon: Icon, label, url }: SocialLinkProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => window.open(url, "_blank")}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
}