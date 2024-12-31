import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skull, PartyPopper, DollarSign } from "lucide-react";
import { useState } from "react";
import AdvancedPredictionForm from "./AdvancedPredictionForm";
import { motion } from "framer-motion";

interface Program {
  id: string;
  name: string;
  description: string;
  annual_budget: number;
  department: string;
  is_cut: boolean;
}

interface ProgramCardProps {
  program: Program;
  isSelected: boolean;
  onSelect: () => void;
  selectedCount: number;
  formatBudget: (budget: number) => string;
  userEmail?: string;
  showAdvancedFeatures?: boolean;
}

export default function ProgramCard({
  program,
  isSelected,
  onSelect,
  selectedCount,
  formatBudget,
  userEmail,
  showAdvancedFeatures = false,
}: ProgramCardProps) {
  const [showAdvancedForm, setShowAdvancedForm] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getFrivolityRating = (budget: number) => {
    if (budget > 10000000000) return { icon: Skull, label: "Extremely Wasteful" };
    if (budget > 1000000000) return { icon: PartyPopper, label: "Very Frivolous" };
    return { icon: DollarSign, label: "Somewhat Wasteful" };
  };

  const handleDragStart = (e: React.DragEvent) => {
    if ((selectedCount >= 7 && !isSelected) || program.is_cut) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    e.dataTransfer.setData("programId", program.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const frivolity = getFrivolityRating(program.annual_budget);
  const FrivolityIcon = frivolity.icon;

  return (
    <motion.div
      animate={{ scale: isDragging ? 0.95 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`transform transition-all cursor-move ${
          isSelected ? "border-doge-gold" : ""
        } ${isDragging ? "opacity-50" : ""}`}
        draggable={!program.is_cut && (selectedCount < 7 || isSelected)}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{program.name}</CardTitle>
            <Badge variant={program.is_cut ? "destructive" : "secondary"}>
              {program.is_cut ? "Cut" : "Active"}
            </Badge>
          </div>
          <CardDescription>{program.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FrivolityIcon className="h-5 w-5 text-doge-gold" />
                <span className="text-sm font-medium">{frivolity.label}</span>
              </div>
              <span className="font-bold text-doge-gold">
                {formatBudget(program.annual_budget)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <Badge variant="outline">{program.department}</Badge>
              {showAdvancedFeatures && (
                <Button
                  variant="outline"
                  className="border-doge-gold text-doge-gold hover:bg-doge-gold hover:text-white"
                  onClick={() => setShowAdvancedForm(!showAdvancedForm)}
                >
                  Advanced
                </Button>
              )}
            </div>
            {showAdvancedFeatures && showAdvancedForm && (
              <div className="mt-4 p-4 border rounded-lg">
                <AdvancedPredictionForm
                  program={program}
                  onClose={() => setShowAdvancedForm(false)}
                  userEmail={userEmail || ""}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}