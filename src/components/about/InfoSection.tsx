import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoSectionProps {
  title: string;
  content: string;
}

export function InfoSection({ title, content }: InfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}