import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialLink } from "./SocialLink";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

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
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={imageError ? "/placeholder.svg" : imageSrc}
            alt={name}
            className="object-cover"
            onError={() => setImageError(true)}
          />
          <AvatarFallback className="text-lg">
            {name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <CardTitle>{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
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