import { Card } from "@/components/ui/card";
import { Calendar, BookOpen } from "lucide-react";
import StudySessionCard from "./StudySessionCard";

const StudyPlanner = () => {
  const sessions = [
    {
      id: 1,
      title: "Deep Learning Block",
      duration: 90,
      type: "focus" as const,
    },
    {
      id: 2,
      title: "Micro-Rest Period",
      duration: 5,
      type: "rest" as const,
    },
    {
      id: 3,
      title: "NSDR Consolidation",
      duration: 20,
      type: "nsdr" as const,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Neuroplasticity Super-Protocol</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Your Daily Study Protocol</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-optimized sessions based on your learning patterns and Huberman's research
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {sessions.map((session) => (
            <StudySessionCard key={session.id} {...session} />
          ))}
        </div>

        <Card className="p-8 bg-gradient-primary text-primary-foreground shadow-elevated">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-white/10">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Today's Learning Goal</h3>
              <p className="text-primary-foreground/90 mb-4">
                Complete 3 focus blocks with active recall testing. Your brain is primed for optimal learning between 9 AM - 12 PM.
              </p>
              <div className="flex gap-2 text-sm">
                <span className="px-3 py-1 rounded-full bg-white/10">Calculus Chapter 5</span>
                <span className="px-3 py-1 rounded-full bg-white/10">Chemistry Review</span>
                <span className="px-3 py-1 rounded-full bg-white/10">History Essay</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default StudyPlanner;
