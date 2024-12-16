import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2, Instagram, Video } from "lucide-react";
import { toast } from "sonner";

export default function SocialShare() {
  const shareUrl = "https://www.reddit.com/r/FantasyDoge/";
  const shareText = "Join Fantasy D.O.G.E. - The Government Efficiency Fantasy League! Draft federal spending programs and compete with friends to cut wasteful spending. 🚀✂️💰";
  const instagramText = "I'm playing Fantasy D.O.G.E., a game where you predict government spending cuts! Join my league and let's compete! 🎮💰 #FantasyDOGE #GovernmentSpending";
  const tiktokText = "Check out Fantasy D.O.G.E. - where we turn government spending into a competitive game! 🎯 Join me in predicting budget cuts! #FantasyDOGE #GovernmentReform";

  const handleShare = async (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "instagram":
        // Copy Instagram-specific text to clipboard since Instagram doesn't have a direct share URL
        await navigator.clipboard.writeText(instagramText);
        toast.success("Instagram caption copied! Open Instagram to share");
        return;
      case "tiktok":
        // Copy TikTok-specific text to clipboard since TikTok doesn't have a direct share URL
        await navigator.clipboard.writeText(tiktokText);
        toast.success("TikTok caption copied! Open TikTok to share");
        return;
      case "reddit":
        url = `https://reddit.com/r/FantasyDoge`;
        break;
      default:
        // Copy link to clipboard for other platforms
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Link copied to clipboard!");
        return;
    }
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
        onClick={() => handleShare("twitter")}
      >
        <Twitter className="mr-2 h-4 w-4" />
        Share on X
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
        onClick={() => handleShare("facebook")}
      >
        <Facebook className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90"
        onClick={() => handleShare("instagram")}
      >
        <Instagram className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-black text-white hover:bg-black/90"
        onClick={() => handleShare("tiktok")}
      >
        <Video className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
        onClick={() => handleShare("linkedin")}
      >
        <Linkedin className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-[#FF4500] text-white hover:bg-[#FF4500]/90"
        onClick={() => handleShare("reddit")}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Join Community
      </Button>
    </div>
  );
}