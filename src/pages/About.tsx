import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";
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
              src="https://pbs.twimg.com/profile_images/1711444297683746816/GS91k4D3_400x400.jpg"
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
              onClick={() => window.open("https://www.reddit.com/r/FantasyDoge/", "_blank")}
            >
              <Github className="h-4 w-4" />
              Join our Reddit Community
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