import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

const exams = [
  { name: "Mock Exam A Session 1", questions: 90, time: "02:15:00", status: "Not Started" },
  { name: "Mock Exam A Session 2", questions: 90, time: "02:15:00", status: "Not Started" },
  { name: "Mock Exam B Session 1", questions: 90, time: "02:15:00", status: "Not Started" },
  { name: "Mock Exam B Session 2", questions: 90, time: "02:15:00", status: "Not Started" },
  { name: "Mock Exam C Session 1", questions: 90, time: "02:15:00", status: "Not Started", locked: true },
];

const MockExams = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Mock Exams</h1>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="confidence">Confidence Levels</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Completion</p>
                <Progress value={0} className="h-4" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">N/A</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="border-l pl-4">
                  <div className="text-lg font-semibold">0 of {exams.length}</div>
                  <div className="text-sm text-muted-foreground">Mock Exams Taken</div>
                </div>
                <div className="border-l pl-4">
                  <div className="text-lg font-semibold">00:00:00</div>
                  <div className="text-sm text-muted-foreground">Avg. Answer Time</div>
                </div>
                <div className="border-l pl-4">
                  <div className="text-lg font-semibold">00:00:00</div>
                  <div className="text-sm text-muted-foreground">Avg. Correct Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="exams">
            <TabsList>
              <TabsTrigger value="exams">Mock Exams</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="exams" className="mt-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 px-4 py-3 bg-muted text-sm font-medium">
                  <span className="col-span-2">Mock Exam Name</span>
                  <span className="text-center">Length</span>
                  <span className="text-center">Time</span>
                  <span className="text-center">Status</span>
                </div>
                {exams.map((exam) => (
                  <div
                    key={exam.name}
                    className="grid grid-cols-5 gap-4 px-4 py-3 border-t hover:bg-muted/50 transition-colors"
                  >
                    <span className="col-span-2 flex items-center gap-2">
                      {exam.locked && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                      <span className={exam.locked ? "italic text-muted-foreground" : ""}>
                        {exam.name}
                      </span>
                    </span>
                    <span className="text-center text-sm">{exam.questions} Questions</span>
                    <span className="text-center text-sm">{exam.time}</span>
                    <span className="text-center">
                      <Badge variant="secondary">{exam.status}</Badge>
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <p className="text-center text-muted-foreground py-8">
                Reports will appear after completing mock exams.
              </p>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {["confidence", "notes", "bookmarks"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <p className="text-center text-muted-foreground py-12 capitalize">
              Your {tab} will appear here.
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MockExams;
