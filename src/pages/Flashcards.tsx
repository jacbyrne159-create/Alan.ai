import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, List } from "lucide-react";

const sampleCards = [
  { id: 1, term: "Neuroplasticity", definition: "The brain's ability to reorganise itself by forming new neural connections throughout life." },
  { id: 2, term: "Spaced Repetition", definition: "A learning technique where review intervals increase over time to optimise long-term retention." },
  { id: 3, term: "Active Recall", definition: "A study method that involves actively stimulating memory during the learning process by retrieving information." },
  { id: 4, term: "Cognitive Load Theory", definition: "A theory that describes the load imposed on working memory during instruction and problem-solving." },
  { id: 5, term: "Feynman Technique", definition: "A four-step method for understanding concepts by explaining them in simple language." },
  { id: 6, term: "NSDR (Non-Sleep Deep Rest)", definition: "A protocol involving deep relaxation to accelerate learning and memory consolidation without actual sleep." },
  { id: 7, term: "Interleaving", definition: "A study strategy that mixes different topics or types of problems within a single study session." },
  { id: 8, term: "Elaborative Interrogation", definition: "A learning technique that involves generating explanations for why stated facts are true." },
];

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const card = sampleCards[currentIndex];

  const next = () => {
    setShowAnswer(false);
    setCurrentIndex((i) => (i + 1) % sampleCards.length);
  };

  const prev = () => {
    setShowAnswer(false);
    setCurrentIndex((i) => (i - 1 + sampleCards.length) % sampleCards.length);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Flashcards</h1>

      <Tabs defaultValue="study">
        <TabsList>
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="my-sets">My Sets</TabsTrigger>
          <TabsTrigger value="community">Community Sets</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Shuffle className="w-4 h-4 mr-1" /> Shuffle
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </Button>
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {currentIndex + 1} of {sampleCards.length}
            </span>
          </div>

          <Card
            className="min-h-[320px] flex items-center justify-center cursor-pointer hover:shadow-elevated transition-shadow"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <CardContent className="text-center py-12 px-8">
              {!showAnswer ? (
                <h2 className="text-3xl md:text-4xl font-bold">{card.term}</h2>
              ) : (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {card.definition}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-6">
                {showAnswer ? "Click to see term" : "Click to reveal answer"}
              </p>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prev}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-destructive/10">Incorrect</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-accent/10">Kinda Correct</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-success/10">Correct</Badge>
            </div>
            <Button variant="outline" onClick={next}>
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="my-sets" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <p>Upload CSV files in the Game Center to create your own sets.</p>
          </div>
        </TabsContent>

        <TabsContent value="community" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <p>Community flashcard sets will appear here.</p>
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <div className="space-y-2">
            {sampleCards.map((c, i) => (
              <div key={c.id} className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50">
                <span className="text-sm font-medium text-muted-foreground w-6">{i + 1}</span>
                <div>
                  <div className="font-medium">{c.term}</div>
                  <div className="text-sm text-muted-foreground">{c.definition}</div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Flashcards;
