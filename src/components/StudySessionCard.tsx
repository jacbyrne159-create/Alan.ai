import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, Brain } from "lucide-react";
import { useState } from "react";

interface StudySessionCardProps {
  title: string;
  duration: number;
  type: "focus" | "rest" | "nsdr";
  onStart?: () => void;
}

const StudySessionCard = ({ title, duration, type, onStart }: StudySessionCardProps) => {
  const [isActive, setIsActive] = useState(false);

  const typeConfig = {
    focus: {
      icon: Brain,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    rest: {
      icon: Pause,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    nsdr: {
      icon: Clock,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <Card className={`p-6 shadow-card hover:shadow-elevated transition-all border-2 ${config.borderColor} ${isActive ? 'ring-2 ring-ring' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${config.bgColor}`}>
            <Icon className={`w-6 h-6 ${config.color}`} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{duration} minutes</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {type === "focus" && "Deep work with micro-rests"}
            {type === "rest" && "Gap effects for neural replay"}
            {type === "nsdr" && "Memory consolidation protocol"}
          </span>
        </div>

        <Button
          variant={isActive ? "outline" : "default"}
          className="w-full"
          onClick={() => {
            setIsActive(!isActive);
            onStart?.();
          }}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4" />
              Pause Session
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Session
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default StudySessionCard;
