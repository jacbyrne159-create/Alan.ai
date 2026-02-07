import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Trophy, Gamepad2, Zap, Heart, Crosshair, Shuffle, Skull } from "lucide-react";

interface FlashcardSet {
  id: string;
  name: string;
  cardCount: number;
  createdBy: string;
  plays: number;
}

interface GameType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  topPlayers: { name: string; score: number }[];
  yourScore: number;
  yourRank: number;
}

const defaultGames: GameType[] = [
  {
    id: "card-picker",
    name: "Card Picker",
    icon: <Layers className="w-10 h-10 text-primary" />,
    description: "Pick the correct answer from multiple cards as fast as you can.",
    topPlayers: [
      { name: "Alex M.", score: 254643 },
      { name: "Sarah K.", score: 235145 },
      { name: "James W.", score: 172365 },
    ],
    yourScore: 0,
    yourRank: 0,
  },
  {
    id: "card-hunter",
    name: "Card Hunter",
    icon: <Crosshair className="w-10 h-10 text-success" />,
    description: "Find the matching definition before time runs out.",
    topPlayers: [
      { name: "Joshua C.", score: 1857 },
      { name: "Pablo G.", score: 1857 },
      { name: "Mallory K.", score: 1856 },
    ],
    yourScore: 0,
    yourRank: 0,
  },
  {
    id: "card-coupler",
    name: "Card Coupler",
    icon: <Heart className="w-10 h-10 text-destructive" />,
    description: "Match pairs of terms and definitions in the fastest time.",
    topPlayers: [
      { name: "Jérémie P.", score: 2758 },
      { name: "Dhruvakarsh K.", score: 2145 },
      { name: "Lohit S.", score: 1904 },
    ],
    yourScore: 0,
    yourRank: 0,
  },
  {
    id: "card-sweeper",
    name: "Card Sweeper",
    icon: <Zap className="w-10 h-10 text-accent" />,
    description: "Sweep through cards and categorise them correctly.",
    topPlayers: [
      { name: "Chinweoge O.", score: 28711 },
      { name: "Pierre-Luc C.", score: 17332 },
      { name: "Wei L.", score: 15890 },
    ],
    yourScore: 0,
    yourRank: 0,
  },
  {
    id: "sudden-death",
    name: "Sudden Death",
    icon: <Skull className="w-10 h-10 text-muted-foreground" />,
    description: "One wrong answer and it's game over. How far can you go?",
    topPlayers: [
      { name: "Alexander S.", score: 158 },
      { name: "Calib K.", score: 145 },
      { name: "Mia R.", score: 132 },
    ],
    yourScore: 0,
    yourRank: 0,
  },
  {
    id: "crossword",
    name: "Crossword",
    icon: <Shuffle className="w-10 h-10 text-primary-glow" />,
    description: "Solve crossword puzzles generated from your flashcards.",
    topPlayers: [
      { name: "Emma T.", score: 9500 },
      { name: "David H.", score: 8900 },
      { name: "Nina P.", score: 8200 },
    ],
    yourScore: 0,
    yourRank: 0,
  },
];

const sampleSets: FlashcardSet[] = [
  { id: "1", name: "Biology 101 - Cell Structure", cardCount: 45, createdBy: "Alex M.", plays: 234 },
  { id: "2", name: "Psychology - Cognitive Biases", cardCount: 30, createdBy: "Sarah K.", plays: 189 },
  { id: "3", name: "History - World War II Events", cardCount: 60, createdBy: "James W.", plays: 156 },
];

import { Layers } from "lucide-react";

const GameCenter = () => {
  const [uploadedSets, setUploadedSets] = useState<FlashcardSet[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").filter((l) => l.trim());
      const cardCount = Math.max(0, lines.length - 1); // minus header
      const newSet: FlashcardSet = {
        id: Date.now().toString(),
        name: file.name.replace(".csv", ""),
        cardCount,
        createdBy: "You",
        plays: 0,
      };
      setUploadedSets((prev) => [...prev, newSet]);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Game Center</h1>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="my-sets">My Card Sets</TabsTrigger>
          <TabsTrigger value="community">Community Sets</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            {defaultGames.map((game) => (
              <Card key={game.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">{game.name}</CardTitle>
                  <Button variant="default" size="sm">
                    Start Playing
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">{game.icon}</div>
                    <div className="space-y-2 flex-1">
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                      <div className="text-sm">
                        <span className="font-medium">Your highest score:</span> {game.yourScore}
                      </div>
                      <div className="text-sm text-primary font-medium cursor-pointer hover:underline">
                        <Trophy className="w-3.5 h-3.5 inline mr-1" />
                        Leaderboard
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {game.topPlayers.map((p, i) => (
                          <div key={i}>
                            Top {i + 1}: {p.name} – {p.score.toLocaleString()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-sets" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Flashcard Set (CSV)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload a CSV file with columns: <code className="bg-muted px-1 rounded">term</code>,{" "}
                <code className="bg-muted px-1 rounded">definition</code>. Each row becomes a flashcard.
              </p>
              <div className="flex gap-3">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="max-w-sm"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CSV
                </Button>
              </div>

              {uploadedSets.length > 0 && (
                <div className="space-y-3 mt-4">
                  <h3 className="font-semibold">Your Uploaded Sets</h3>
                  {uploadedSets.map((set) => (
                    <div
                      key={set.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div>
                        <div className="font-medium">{set.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {set.cardCount} cards
                        </div>
                      </div>
                      <Button size="sm">Play</Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4 mt-4">
          {sampleSets.map((set) => (
            <Card key={set.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <div className="font-medium">{set.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {set.cardCount} cards · Created by {set.createdBy} ·{" "}
                    <Badge variant="secondary">{set.plays} plays</Badge>
                  </div>
                </div>
                <Button size="sm">Play</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameCenter;
