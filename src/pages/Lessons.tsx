import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const modules = [
  {
    name: "Introduction to Learning Science",
    topics: ["What is Neuroplasticity?", "History of Learning Research", "The Modern Learner"],
  },
  {
    name: "Memory & Encoding",
    topics: ["Working Memory", "Long-Term Memory Formation", "Encoding Strategies", "Schema Building"],
  },
  {
    name: "Active Recall & Retrieval Practice",
    topics: ["The Testing Effect", "Flashcard Systems", "Self-Testing Protocols"],
  },
  {
    name: "Spaced Repetition",
    topics: ["Forgetting Curves", "Optimal Review Intervals", "SRS Algorithms"],
  },
  {
    name: "Focus & Attention",
    topics: ["90-Minute Focus Blocks", "Acetylcholine & Focus", "Distraction Management"],
  },
  {
    name: "Sleep & Consolidation",
    topics: ["Sleep Architecture", "Memory Consolidation During Sleep", "NSDR Protocols"],
  },
  {
    name: "Cognitive Load Management",
    topics: ["Intrinsic vs Extraneous Load", "Chunking Strategies", "Scaffolding Techniques"],
  },
  {
    name: "Motivation & Habit Formation",
    topics: ["Identity-Based Habits", "Implementation Intentions", "Dopamine & Reward Systems"],
  },
  {
    name: "Metacognition & Self-Regulation",
    topics: ["Planning & Monitoring", "Reflection Practices", "Calibration of Confidence"],
  },
  {
    name: "Study Environment & Tools",
    topics: ["Environmental Cue Engineering", "Digital Tools for Learning", "Accountability Systems"],
  },
];

const Lessons = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleAll = (state: boolean) => {
    const next: Record<number, boolean> = {};
    modules.forEach((_, i) => (next[i] = state));
    setExpanded(next);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Lessons</h1>

      <Tabs defaultValue="contents">
        <TabsList>
          <TabsTrigger value="contents">Table of Contents</TabsTrigger>
          <TabsTrigger value="confidence">Confidence Levels</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
        </TabsList>

        <TabsContent value="contents" className="mt-4 space-y-2">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Contents</span>
            <div className="flex gap-2 text-sm">
              <Button variant="link" size="sm" onClick={() => toggleAll(true)}>
                Expand All
              </Button>
              <span className="text-muted-foreground">|</span>
              <Button variant="link" size="sm" onClick={() => toggleAll(false)}>
                Collapse All
              </Button>
            </div>
          </div>

          {modules.map((mod, i) => (
            <div key={i}>
              <button
                className="w-full flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-colors"
                onClick={() =>
                  setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))
                }
              >
                <span>{mod.name}</span>
                {expanded[i] ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {expanded[i] && (
                <div className="ml-4 border-l-2 border-primary/20 pl-4 py-2 space-y-2">
                  {mod.topics.map((topic) => (
                    <div
                      key={topic}
                      className="text-sm text-muted-foreground hover:text-primary cursor-pointer py-1 transition-colors"
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </TabsContent>

        {["confidence", "notes", "bookmarks", "highlights"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <p className="text-center text-muted-foreground py-12 capitalize">
              Your {tab} will appear here as you study.
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Lessons;
