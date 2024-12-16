import { Github, Instagram, Linkedin, Twitter, Youtube, MessageSquare } from "lucide-react";
import { TeamMember } from "@/components/about/TeamMember";
import { InfoSection } from "@/components/about/InfoSection";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">About Fantasy D.O.G.E.</h1>

      <TeamMember
        name="William Griffin"
        imageSrc="/lovable-uploads/8df60eec-b1aa-426f-8d5c-256945d7b7d0.png"
        role="Founder"
        description="Founder of Fantasy D.O.G.E., William Griffin is passionate about promoting government efficiency and fiscal responsibility through innovative gamification."
        socials={[
          {
            icon: Twitter,
            label: "Follow on X",
            url: "https://x.com/WPG803"
          },
          {
            icon: Linkedin,
            label: "Connect on LinkedIn",
            url: "https://www.linkedin.com/in/william-griffin-giraffe-laugh/"
          },
          {
            icon: MessageSquare,
            label: "Follow on TikTok",
            url: "https://www.tiktok.com/@realwilliamgriffin"
          },
          {
            icon: Instagram,
            label: "Follow on Instagram",
            url: "https://www.instagram.com/williamperringriffin/"
          },
          {
            icon: Youtube,
            label: "Subscribe on YouTube",
            url: "https://www.youtube.com/@williamgriffin61"
          },
          {
            icon: Github,
            label: "Join our Reddit Community",
            url: "https://www.reddit.com/r/FantasyDoge/"
          }
        ]}
      />

      <TeamMember
        name="Ben McIntosh"
        imageSrc="/lovable-uploads/62d7ee9d-6255-45a7-9796-b404dd5b73bc.png"
        role="Evangelist and First Outside Investor"
        description="Evangelist and First Outside Investor of Fantasy D.O.G.E., Ben McIntosh brings valuable experience and vision to our mission of promoting government efficiency."
        socials={[
          {
            icon: Linkedin,
            label: "Connect on LinkedIn",
            url: "https://www.linkedin.com/in/ben-mcintosh-1443b725/"
          }
        ]}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <InfoSection
          title="Our Story"
          content="Fantasy D.O.G.E. was born from the idea that making government spending oversight engaging and competitive could drive real change in how we approach fiscal responsibility."
        />
        <InfoSection
          title="Get Involved"
          content="Join our growing community of fiscal efficiency advocates. Follow us on social media, participate in discussions, and help shape the future of government spending oversight."
        />
      </div>
    </div>
  );
}