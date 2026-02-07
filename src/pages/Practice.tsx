import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Neuroscience Fundamentals", complete: 35, total: 50, pct: 78 },
  { name: "Memory & Learning", complete: 22, total: 30, pct: 85 },
  { name: "Cognitive Psychology", complete: 17, total: 40, pct: 62 },
  { name: "Behavioural Science", complete: 10, total: 25, pct: 80 },
  { name: "Research Methods", complete: 28, total: 35, pct: 90 },
  { name: "Statistics for Psychology", complete: 5, total: 20, pct: 55 },
];

const totalQuestions = categories.reduce((a, c) => a + c.total, 0);
const totalComplete = categories.reduce((a, c) => a + c.complete, 0);
const overallPct = Math.round((totalComplete / totalQuestions) * 100);

const Practice = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Practice</h1>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="confidence">Confidence Levels</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Dashboard</CardTitle>
                <Button variant="link" className="text-primary">
                  Reset Questions
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Completion</p>
                <Progress value={overallPct} className="h-4" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{overallPct}%</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="border-l pl-4">
                  <div className="text-lg font-semibold">
                    {totalComplete} of {totalQuestions}
                  </div>
                  <div className="text-sm text-muted-foreground">Questions Taken</div>
                </div>
                <div className="border-l pl-4">
                  <div className="text-lg font-semibold">00:01:06</div>
                  <div className="text-sm text-muted-foreground">Avg. Answer Time</div>
                </div>
                <div className="border-l pl-4">
                  <div className="text-lg font-semibold">00:01:08</div>
                  <div className="text-sm text-muted-foreground">Avg. Correct Time</div>
                </div>
                <div className="border-l pl-4">
                  <div className="text-lg font-semibold">00:01:03</div>
                  <div className="text-sm text-muted-foreground">Avg. Incorrect Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="categories">
            <TabsList>
              <TabsTrigger value="categories">Question Categories</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="categories" className="mt-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 gap-4 px-4 py-3 bg-muted text-sm font-medium">
                  <span>Category Name</span>
                  <span className="text-center">Complete</span>
                  <span className="text-center">% Correct</span>
                </div>
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="grid grid-cols-3 gap-4 px-4 py-3 border-t hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-primary font-medium hover:underline cursor-pointer">
                      {cat.name}
                    </span>
                    <span className="text-center text-sm">
                      {cat.complete} of {cat.total}
                    </span>
                    <span className="text-center text-sm">{cat.pct}%</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <p className="text-center text-muted-foreground py-8">
                Reports will be generated as you complete more practice questions.
              </p>
            </TabsContent>
          </Tabs>
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

export default Practice;
