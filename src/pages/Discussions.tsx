import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Filter, ThumbsUp, Clock } from "lucide-react";

interface Thread {
  id: string;
  author: string;
  initials: string;
  color: string;
  content: string;
  topic: string;
  university: string;
  replies: number;
  lastActivity: string;
  createdAt: string;
  likes: number;
}

const sampleThreads: Thread[] = [
  {
    id: "1",
    author: "Mailosi Nsikiimodzi",
    initials: "MN",
    color: "bg-destructive",
    content: "How does active recall work best when you have a huge volume of content to cover? I find it hard to keep up with spaced repetition for all my modules at once.",
    topic: "Study Techniques",
    university: "University of Edinburgh",
    replies: 3,
    lastActivity: "2 hours ago",
    createdAt: "1 day ago",
    likes: 12,
  },
  {
    id: "2",
    author: "Shamit Rakesh Doshi",
    initials: "SR",
    color: "bg-success",
    content: "Has anyone tried combining the Feynman Technique with flashcard games? I'd love to hear about your experience and whether it improved retention for complex topics.",
    topic: "Learning Methods",
    university: "University of Manchester",
    replies: 0,
    lastActivity: "5 hours ago",
    createdAt: "5 hours ago",
    likes: 4,
  },
  {
    id: "3",
    author: "Johan-Fisher Lalle Zate",
    initials: "JL",
    color: "bg-primary",
    content: "Looking for study group partners for Neuroscience BSc. We're meeting weekly on Zoom to quiz each other using flashcards. DM if interested!",
    topic: "Study Groups",
    university: "UCL",
    replies: 7,
    lastActivity: "30 minutes ago",
    createdAt: "3 days ago",
    likes: 23,
  },
  {
    id: "4",
    author: "Emily Chen",
    initials: "EC",
    color: "bg-accent",
    content: "Just uploaded a 200-card set for Organic Chemistry. Feel free to use it in the Game Center. Would appreciate feedback on any errors!",
    topic: "Shared Resources",
    university: "Imperial College London",
    replies: 5,
    lastActivity: "1 hour ago",
    createdAt: "2 days ago",
    likes: 31,
  },
  {
    id: "5",
    author: "Priya Patel",
    initials: "PP",
    color: "bg-destructive",
    content: "Does anyone have tips for maintaining a consistent study schedule during exam season? I always start strong but lose momentum after a week.",
    topic: "Study Habits",
    university: "University of Bristol",
    replies: 11,
    lastActivity: "15 minutes ago",
    createdAt: "4 days ago",
    likes: 45,
  },
];

const universities = [
  "All Universities",
  "University of Edinburgh",
  "University of Manchester",
  "UCL",
  "Imperial College London",
  "University of Bristol",
  "University of Oxford",
  "University of Cambridge",
];

const topics = [
  "General",
  "Study Techniques",
  "Learning Methods",
  "Study Groups",
  "Shared Resources",
  "Study Habits",
  "Module Help",
];

const Discussions = () => {
  const [newPost, setNewPost] = useState("");
  const [selectedUni, setSelectedUni] = useState("All Universities");
  const [selectedTopic, setSelectedTopic] = useState("General");

  const filteredThreads = sampleThreads.filter(
    (t) => selectedUni === "All Universities" || t.university === selectedUni
  );

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Discussions</h1>

      <Tabs defaultValue="public">
        <TabsList>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="my-threads">My Threads</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="space-y-6 mt-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedUni} onValueChange={setSelectedUni}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by university" />
              </SelectTrigger>
              <SelectContent>
                {universities.map((u) => (
                  <SelectItem key={u} value={u}>{u}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* New Discussion */}
          <Card>
            <CardContent className="pt-4 space-y-3">
              <p className="font-medium text-sm">Start a Discussion</p>
              <Textarea
                placeholder="What do you want to discuss... (required)"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button disabled={!newPost.trim()} onClick={() => setNewPost("")}>
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Threads */}
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <Card key={thread.id} className="hover:shadow-card transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex gap-3">
                    <Avatar className="shrink-0">
                      <AvatarFallback className={`${thread.color} text-white text-sm`}>
                        {thread.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm leading-relaxed">{thread.content}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="text-primary font-medium hover:underline cursor-pointer">
                          {thread.topic}
                        </span>
                        <span>{thread.university}</span>
                        <span>
                          <Clock className="w-3 h-3 inline mr-0.5" />
                          {thread.createdAt} by {thread.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-muted-foreground">
                          {thread.replies} {thread.replies === 1 ? "reply" : "replies"} · Last activity: {thread.lastActivity}
                        </span>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          {thread.likes}
                        </button>
                        <button className="text-primary hover:underline font-medium">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-threads" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>You haven't started any discussions yet.</p>
            <p className="text-sm">Join the conversation in the Public tab!</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Discussions;
