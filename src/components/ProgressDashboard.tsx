import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Flame, Award, CheckCircle } from "lucide-react";

const ProgressDashboard = () => {
  const stats = [
    {
      icon: Flame,
      label: "Study Streak",
      value: "14 days",
      progress: 70,
      color: "text-destructive",
    },
    {
      icon: CheckCircle,
      label: "Sessions Completed",
      value: "42/50",
      progress: 84,
      color: "text-success",
    },
    {
      icon: TrendingUp,
      label: "Retention Rate",
      value: "87%",
      progress: 87,
      color: "text-accent",
    },
    {
      icon: Award,
      label: "Learning Efficiency",
      value: "A+",
      progress: 95,
      color: "text-primary",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Track Your Progress</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Data-driven insights show how neuroplasticity protocols accelerate your learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 shadow-card hover:shadow-elevated transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
                <Progress value={stat.progress} className="h-2" />
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 p-8 shadow-elevated">
          <h3 className="text-2xl font-bold mb-6">Weekly Learning Analytics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Active Recall Success</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Focus Duration (avg)</span>
                <span className="text-sm text-muted-foreground">82 min</span>
              </div>
              <Progress value={91} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">NSDR Completion</span>
                <span className="text-sm text-muted-foreground">12/14 days</span>
              </div>
              <Progress value={86} className="h-3" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProgressDashboard;
