import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import PdfUpload from "@/components/PdfUpload";

type Flashcard = { id: string; term: string; definition: string; sort_order: number };
type FlashcardSet = { id: string; title: string; source_filename: string | null; created_at: string };

const sampleCards = [
  { id: "s1", term: "Neuroplasticity", definition: "The brain's ability to reorganise itself by forming new neural connections throughout life." },
  { id: "s2", term: "Spaced Repetition", definition: "A learning technique where review intervals increase over time to optimise long-term retention." },
  { id: "s3", term: "Active Recall", definition: "A study method that involves actively stimulating memory during the learning process by retrieving information." },
  { id: "s4", term: "Cognitive Load Theory", definition: "A theory that describes the load imposed on working memory during instruction and problem-solving." },
  { id: "s5", term: "Feynman Technique", definition: "A four-step method for understanding concepts by explaining them in simple language." },
];

const Flashcards = () => {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sets, setSets] = useState<FlashcardSet[]>([]);
  const [activeSet, setActiveSet] = useState<string | null>(null);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);

  const fetchSets = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("flashcard_sets")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSets(data);
  };

  useEffect(() => {
    fetchSets();
  }, [user]);

  const loadSet = async (setId: string) => {
    setLoadingCards(true);
    setActiveSet(setId);
    setCurrentIndex(0);
    setShowAnswer(false);
    const { data } = await supabase
      .from("flashcards")
      .select("*")
      .eq("set_id", setId)
      .order("sort_order");
    if (data) setCards(data);
    setLoadingCards(false);
  };

  const deleteSet = async (setId: string) => {
    await supabase.from("flashcard_sets").delete().eq("id", setId);
    if (activeSet === setId) {
      setActiveSet(null);
      setCards([]);
    }
    fetchSets();
  };

  const displayCards = activeSet ? cards : sampleCards.map((c) => ({ ...c, sort_order: 0 }));
  const card = displayCards[currentIndex];

  const next = () => {
    setShowAnswer(false);
    setCurrentIndex((i) => (i + 1) % displayCards.length);
  };
  const prev = () => {
    setShowAnswer(false);
    setCurrentIndex((i) => (i - 1 + displayCards.length) % displayCards.length);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Flashcards</h1>

      <Tabs defaultValue="study">
        <TabsList>
          <TabsTrigger value="study">Study</TabsTrigger>
          <TabsTrigger value="my-sets">My Sets</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="study" className="mt-4 space-y-4">
          {/* Set selector */}
          {sets.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={!activeSet ? "default" : "outline"}
                size="sm"
                onClick={() => { setActiveSet(null); setCurrentIndex(0); setShowAnswer(false); }}
              >
                Sample Set
              </Button>
              {sets.map((s) => (
                <Button
                  key={s.id}
                  variant={activeSet === s.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => loadSet(s.id)}
                >
                  {s.title}
                </Button>
              ))}
            </div>
          )}

          {displayCards.length > 0 && card ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Shuffle className="w-4 h-4 mr-1" /> Shuffle
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setCurrentIndex(0); setShowAnswer(false); }}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Reset
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {currentIndex + 1} of {displayCards.length}
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
            </>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              {loadingCards ? "Loading…" : "No flashcards yet. Upload a PDF to get started!"}
            </p>
          )}
        </TabsContent>

        <TabsContent value="my-sets" className="mt-4 space-y-3">
          {sets.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No sets yet. Upload a PDF to generate your first set!
            </p>
          ) : (
            sets.map((s) => (
              <Card key={s.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div
                    className="cursor-pointer flex-1"
                    onClick={() => loadSet(s.id)}
                  >
                    <p className="font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.source_filename && `From: ${s.source_filename} · `}
                      {new Date(s.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteSet(s.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          {user ? (
            <PdfUpload onComplete={fetchSets} />
          ) : (
            <p className="text-center text-muted-foreground py-12">
              Please log in to upload study materials.
            </p>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <div className="space-y-2">
            {displayCards.map((c, i) => (
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
