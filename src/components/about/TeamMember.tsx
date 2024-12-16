import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialLink } from "./SocialLink";
import { LucideIcon } from "lucide-react";

interface TeamMemberProps {
  name: string;
  imageSrc: string;
  role: string;
  description: string;
  socials: Array<{
    icon: LucideIcon;
    label: string;
    url: string;
  }>;
}

export function TeamMember({ name, imageSrc, role, description, socials }: TeamMemberProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={imageSrc}
            alt={name}
            className="object-cover"
          />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap gap-4">
          {socials.map((social, index) => (
            <SocialLink key={index} {...social} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}