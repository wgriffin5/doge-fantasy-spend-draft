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

const getAvatarColors = (name: string) => {
  const colorPairs = [
    { bg: '#FEF7CD', border: '#F97316' }, // Soft Yellow with Bright Orange
    { bg: '#E5DEFF', border: '#8B5CF6' }, // Soft Purple with Vivid Purple
    { bg: '#D3E4FD', border: '#0EA5E9' }, // Soft Blue with Ocean Blue
    { bg: '#FFDEE2', border: '#D946EF' }, // Soft Pink with Magenta Pink
  ];
  
  // Use the first letter of the name to consistently pick a color pair
  const index = name.charCodeAt(0) % colorPairs.length;
  return colorPairs[index];
};

export function TeamMember({ name, imageSrc, role, description, socials }: TeamMemberProps) {
  const [imageError, setImageError] = useState(false);
  const colors = getAvatarColors(name);

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar 
          className="h-24 w-24 ring-4 transition-transform hover:scale-105"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            ringColor: colors.border
          }}
        >
          <AvatarImage
            src={imageError ? "/placeholder.svg" : imageSrc}
            alt={name}
            className="object-cover"
            onError={() => setImageError(true)}
          />
          <AvatarFallback 
            className="text-lg font-bold"
            style={{ color: colors.border }}
          >
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