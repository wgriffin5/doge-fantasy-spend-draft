import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Instagram, Linkedin, Twitter, Youtube, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">About Fantasy D.O.G.E.</h1>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="/lovable-uploads/8df60eec-b1aa-426f-8d5c-256945d7b7d0.png"
              alt="William Griffin"
              className="object-cover"
            />
            <AvatarFallback>WG</AvatarFallback>
          </Avatar>
          <CardTitle>William Griffin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Founder of Fantasy D.O.G.E., William Griffin is passionate about promoting government efficiency and fiscal responsibility through innovative gamification.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open("https://x.com/WPG803", "_blank")}
            >
              <Twitter className="h-4 w-4" />
              Follow on X
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open("https://www.linkedin.com/in/william-griffin-giraffe-laugh/", "_blank")}
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open("https://www.tiktok.com/@realwilliamgriffin", "_blank")}
            >
              <MessageSquare className="h-4 w-4" />
              Follow on TikTok
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open("https://www.instagram.com/williamperringriffin/", "_blank")}
            >
              <Instagram className="h-4 w-4" />
              Follow on Instagram
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open("https://www.youtube.com/@williamgriffin61", "_blank")}
            >
              <Youtube className="h-4 w-4" />
              Subscribe on YouTube
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open("https://www.reddit.com/r/FantasyDoge/", "_blank")}
            >
              <Github className="h-4 w-4" />
              Join our Reddit Community
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="/lovable-uploads/c673cccd-9961-42c2-9bc2-4d150ae3152d.png"
              alt="Ben McIntosh"
              className="object-cover"
            />
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>
          <CardTitle>Ben McIntosh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg text-muted-foreground">
            Evangelist and First Outside Investor of Fantasy D.O.G.E., Ben McIntosh brings valuable experience and vision to our mission of promoting government efficiency.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open("https://www.linkedin.com/in/ben-mcintosh-1443b725/", "_blank")}
            >
              <Linkedin className="h-4 w-4" />
              Connect on LinkedIn
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Fantasy D.O.G.E. was born from the idea that making government spending oversight engaging and competitive could drive real change in how we approach fiscal responsibility.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Involved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Join our growing community of fiscal efficiency advocates. Follow us on social media, participate in discussions, and help shape the future of government spending oversight.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}