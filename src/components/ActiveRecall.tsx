import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

const ActiveRecall = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    {
      question: "What is the optimal duration for a focused study session according to neuroplasticity research?",
      answer: "90 minutes - This aligns with ultradian rhythms and maximizes neuroplasticity while preventing cognitive fatigue.",
    },
    {
      question: "How do gap effects enhance learning?",
      answer: "Random 5-30 second micro-rests allow for rapid neural replay, increasing learning rates by 10-20% through memory consolidation during brief pauses.",
    },
    {
      question: "What is NSDR and why is it important?",
      answer: "Non-Sleep Deep Rest accelerates brain rewiring after learning sessions, equivalent to a 1-hour nap for memory consolidation without actual sleep.",
    },
  ];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Evidence-Based Testing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Active Recall Practice</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Self-testing reduces forgetting by 50%. Test yourself immediately after learning.
          </p>
        </div>

        <Card className="p-8 shadow-elevated border-2 border-primary/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Card {currentCard + 1} of {flashcards.length}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleNext}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          <div className="min-h-[200px] flex items-center justify-center">
            <div className="w-full">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Question:</p>
                <p className="text-lg font-medium leading-relaxed">
                  {flashcards[currentCard].question}
                </p>
              </div>

              {showAnswer && (
                <div className="mt-6 p-6 rounded-lg bg-accent/10 border border-accent/20 animate-fade-in">
                  <p className="text-sm text-accent-foreground font-medium mb-2">Answer:</p>
                  <p className="text-accent-foreground/90 leading-relaxed">
                    {flashcards[currentCard].answer}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            {!showAnswer ? (
              <Button 
                variant="hero" 
                size="lg" 
                className="flex-1"
                onClick={() => setShowAnswer(true)}
              >
                Reveal Answer
              </Button>
            ) : (
              <>
                <Button variant="outline" size="lg" className="flex-1">
                  Need Review
                </Button>
                <Button variant="accent" size="lg" className="flex-1" onClick={handleNext}>
                  Got It!
                </Button>
              </>
            )}
          </div>
        </Card>

        <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border">
          <h4 className="font-semibold mb-2">Spaced Repetition Algorithm Active</h4>
          <p className="text-sm text-muted-foreground">
            Questions you answer correctly will appear less frequently. Struggling concepts will be reviewed more often, 
            optimizing your learning curve based on your performance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ActiveRecall;
