import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, ArrowUp, Combine, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AdvancedFeaturesTutorial() {
  const features = [
    {
      icon: Trophy,
      title: "Full Program Cuts",
      description:
        "Predict which programs will be completely eliminated for maximum points.",
    },
    {
      icon: ArrowUp,
      title: "Budget Reductions",
      description:
        "Forecast partial budget cuts and earn points proportional to the reduction.",
    },
    {
      icon: Combine,
      title: "Program Mergers",
      description:
        "Identify opportunities for program consolidation and efficiency gains.",
    },
    {
      icon: Zap,
      title: "Efficiency Improvements",
      description:
        "Spot potential administrative reforms and operational improvements.",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-doge-gold/5 to-transparent">
      <CardHeader>
        <CardTitle>Advanced Features Unlocked! 🎉</CardTitle>
        <CardDescription>
          You now have access to more sophisticated ways to predict government
          efficiency improvements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                <Icon className="h-6 w-6 text-doge-gold" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}