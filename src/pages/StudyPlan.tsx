import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  Target,
  Plus,
  Check,
  Trash2,
  Link as LinkIcon,
  Calendar,
  Brain,
  Zap,
  Moon,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format, addDays, startOfWeek, isSameDay, parseISO } from "date-fns";

// ─── Types ─────────────────────────────────────────────────────────────────

type BlockType = "focus" | "rest" | "nsdr";

interface StudyBlock {
  id: string;
  title: string;
  subject: string | null;
  block_date: string;
  start_time: string;
  block_type: BlockType;
  completed: boolean;
}

interface StudyTarget {
  id?: string;
  weekly_deep_work_sessions: number;
  session_duration_minutes: number;
}

interface CalendarConnection {
  id: string;
  connection_type: string;
  ical_url: string | null;
  display_name: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

const BLOCK_META: Record<BlockType, { label: string; color: string; icon: typeof Brain }> = {
  focus: { label: "Deep Work", color: "bg-primary/20 border-primary/40 text-primary", icon: Brain },
  rest:  { label: "Micro-Rest", color: "bg-accent/20 border-accent/40 text-accent", icon: Zap },
  nsdr:  { label: "NSDR", color: "bg-purple-500/20 border-purple-500/40 text-purple-400", icon: Moon },
};

const TIME_SLOTS = Array.from({ length: 28 }, (_, i) => {
  const hour = Math.floor(i / 2) + 6;
  const min = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${min}`;
});

// ─── Weekly Calendar strip ─────────────────────────────────────────────────

function WeekStrip({
  week,
  selected,
  blocks,
  onSelect,
  onPrev,
  onNext,
}: {
  week: Date[];
  selected: Date;
  blocks: StudyBlock[];
  onSelect: (d: Date) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          {format(week[0], "MMMM yyyy")}
        </h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={onPrev} className="h-7 w-7">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} className="h-7 w-7">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-center text-xs text-muted-foreground py-1">
            {d}
          </div>
        ))}
        {week.map((day) => {
          const hasBlocks = blocks.some((b) => b.block_date === format(day, "yyyy-MM-dd"));
          const isSelected = isSameDay(day, selected);
          const isToday = isSameDay(day, new Date());
          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelect(day)}
              className={`relative flex flex-col items-center justify-center h-12 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : isToday
                  ? "bg-primary/15 text-primary"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              {format(day, "d")}
              {hasBlocks && (
                <span
                  className={`absolute bottom-1.5 w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-primary-foreground" : "bg-primary"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Add Block Dialog ──────────────────────────────────────────────────────

function AddBlockDialog({
  selectedDate,
  onSave,
}: {
  selectedDate: Date;
  onSave: () => void;
}) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [blockType, setBlockType] = useState<BlockType>("focus");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user || !title.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("study_blocks").insert({
      user_id: user.id,
      title: title.trim(),
      subject: subject.trim() || null,
      block_date: format(selectedDate, "yyyy-MM-dd"),
      start_time: startTime,
      block_type: blockType,
    });
    setSaving(false);
    if (error) {
      toast.error("Failed to save block");
    } else {
      toast.success("Block scheduled!");
      setOpen(false);
      setTitle(""); setSubject(""); setStartTime("09:00"); setBlockType("focus");
      onSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" /> Add Block
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule a Study Block</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="text-sm text-muted-foreground">
            {format(selectedDate, "EEEE, MMMM d")}
          </div>
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              placeholder="e.g. Calculus Chapter 5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Subject / Module</Label>
            <Input
              placeholder="e.g. Mathematics"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-56">
                  {TIME_SLOTS.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Block Type</Label>
              <Select value={blockType} onValueChange={(v) => setBlockType(v as BlockType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="focus">Deep Work (90 min)</SelectItem>
                  <SelectItem value="rest">Micro-Rest (5 min)</SelectItem>
                  <SelectItem value="nsdr">NSDR (20 min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving || !title.trim()} className="w-full">
            {saving ? "Saving…" : "Schedule Block"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Calendar Connect Dialog ───────────────────────────────────────────────

function CalendarConnectDialog({ onSaved }: { onSaved: () => void }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"choose" | "ical" | "google">("choose");
  const [icalUrl, setIcalUrl] = useState("");
  const [displayName, setDisplayName] = useState("My Calendar");
  const [saving, setSaving] = useState(false);

  const saveIcal = async () => {
    if (!user || !icalUrl.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("calendar_connections").insert({
      user_id: user.id,
      connection_type: "ical",
      ical_url: icalUrl.trim(),
      display_name: displayName.trim() || "My Calendar",
    });
    setSaving(false);
    if (error) {
      toast.error("Failed to save calendar link");
    } else {
      toast.success("Calendar connected!");
      setOpen(false);
      setMode("choose");
      setIcalUrl("");
      onSaved();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setMode("choose"); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <LinkIcon className="w-4 h-4" /> Connect Calendar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect a Calendar</DialogTitle>
        </DialogHeader>

        {mode === "choose" && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setMode("google")}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <img
                src="https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_48dp.png"
                alt="Google Calendar"
                className="w-10 h-10"
              />
              <span className="text-sm font-medium">Google Calendar</span>
            </button>
            <button
              onClick={() => setMode("ical")}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Calendar className="w-10 h-10 text-muted-foreground" />
              <span className="text-sm font-medium">iCal / Outlook / Apple</span>
            </button>
          </div>
        )}

        {mode === "google" && (
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">
              To sync Google Calendar, get your private iCal link:
            </p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Open <strong className="text-foreground">Google Calendar</strong> on the web</li>
              <li>Click the <strong className="text-foreground">⋮</strong> next to a calendar → <strong className="text-foreground">Settings</strong></li>
              <li>Scroll to <strong className="text-foreground">Secret address in iCal format</strong></li>
              <li>Copy that URL and paste it below</li>
            </ol>
            <a
              href="https://calendar.google.com/calendar/r/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Open Google Calendar Settings <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="space-y-2">
              <Label>Calendar Name</Label>
              <Input
                placeholder="e.g. Google Calendar"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Secret iCal URL</Label>
              <Input
                placeholder="https://calendar.google.com/calendar/ical/…"
                value={icalUrl}
                onChange={(e) => setIcalUrl(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setMode("choose")} className="flex-1">Back</Button>
              <Button onClick={saveIcal} disabled={saving || !icalUrl.trim()} className="flex-1">
                {saving ? "Saving…" : "Connect"}
              </Button>
            </div>
          </div>
        )}

        {mode === "ical" && (
          <div className="space-y-4 pt-2">
            <p className="text-sm text-muted-foreground">
              Paste any public or secret iCal (.ics) URL from Outlook, Apple Calendar, or any other calendar app.
            </p>
            <div className="space-y-2">
              <Label>Calendar Name</Label>
              <Input
                placeholder="e.g. University Timetable"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>iCal URL</Label>
              <Input
                placeholder="webcal:// or https://…"
                value={icalUrl}
                onChange={(e) => setIcalUrl(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setMode("choose")} className="flex-1">Back</Button>
              <Button onClick={saveIcal} disabled={saving || !icalUrl.trim()} className="flex-1">
                {saving ? "Saving…" : "Connect"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

const StudyPlan = () => {
  const { user } = useAuth();

  // Calendar state
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const week = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfWeek(addDays(new Date(), weekOffset * 7), { weekStartsOn: 1 }), i)
  );

  // Data state
  const [blocks, setBlocks] = useState<StudyBlock[]>([]);
  const [target, setTarget] = useState<StudyTarget>({ weekly_deep_work_sessions: 5, session_duration_minutes: 90 });
  const [targetId, setTargetId] = useState<string | null>(null);
  const [connections, setConnections] = useState<CalendarConnection[]>([]);
  const [savingTarget, setSavingTarget] = useState(false);

  const fetchData = async () => {
    if (!user) return;
    const [blocksRes, targetRes, connRes] = await Promise.all([
      supabase.from("study_blocks").select("*").eq("user_id", user.id).order("start_time"),
      supabase.from("study_targets").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("calendar_connections").select("*").eq("user_id", user.id),
    ]);
    if (blocksRes.data) setBlocks(blocksRes.data as StudyBlock[]);
    if (targetRes.data) {
      setTarget({ weekly_deep_work_sessions: targetRes.data.weekly_deep_work_sessions, session_duration_minutes: targetRes.data.session_duration_minutes });
      setTargetId(targetRes.data.id);
    }
    if (connRes.data) setConnections(connRes.data);
  };

  useEffect(() => { fetchData(); }, [user]);

  // Selected day blocks
  const dayBlocks = blocks.filter(
    (b) => b.block_date === format(selectedDay, "yyyy-MM-dd")
  );

  // Week focus blocks progress
  const weekFocusBlocks = blocks.filter((b) => {
    const d = parseISO(b.block_date);
    return week.some((w) => isSameDay(w, d)) && b.block_type === "focus";
  });
  const completedFocusBlocks = weekFocusBlocks.filter((b) => b.completed).length;
  const progressPct = Math.min(100, Math.round((completedFocusBlocks / target.weekly_deep_work_sessions) * 100));

  const toggleComplete = async (block: StudyBlock) => {
    const { error } = await supabase
      .from("study_blocks")
      .update({ completed: !block.completed })
      .eq("id", block.id);
    if (!error) fetchData();
  };

  const deleteBlock = async (id: string) => {
    const { error } = await supabase.from("study_blocks").delete().eq("id", id);
    if (!error) fetchData();
  };

  const saveTarget = async () => {
    if (!user) return;
    setSavingTarget(true);
    if (targetId) {
      await supabase.from("study_targets").update(target).eq("id", targetId);
    } else {
      const { data } = await supabase.from("study_targets").insert({ ...target, user_id: user.id }).select().single();
      if (data) setTargetId(data.id);
    }
    setSavingTarget(false);
    toast.success("Target saved!");
  };

  const deleteConnection = async (id: string) => {
    await supabase.from("calendar_connections").delete().eq("id", id);
    fetchData();
    toast.success("Calendar disconnected");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Study Plan</h1>
          <p className="text-sm text-muted-foreground">Schedule your 90-min deep work blocks &amp; track your weekly targets</p>
        </div>
        <div className="flex gap-2">
          <CalendarConnectDialog onSaved={fetchData} />
          <AddBlockDialog selectedDate={selectedDay} onSave={fetchData} />
        </div>
      </div>

      <Tabs defaultValue="planner">
        <TabsList>
          <TabsTrigger value="planner">
            <CalendarDays className="w-4 h-4 mr-1.5" /> Planner
          </TabsTrigger>
          <TabsTrigger value="targets">
            <Target className="w-4 h-4 mr-1.5" /> Weekly Targets
          </TabsTrigger>
          <TabsTrigger value="calendars">
            <LinkIcon className="w-4 h-4 mr-1.5" /> Calendars
          </TabsTrigger>
        </TabsList>

        {/* ── Planner tab ────────────────────────────── */}
        <TabsContent value="planner" className="space-y-4 mt-4">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Calendar strip */}
            <Card className="lg:col-span-1">
              <CardContent className="pt-4">
                <WeekStrip
                  week={week}
                  selected={selectedDay}
                  blocks={blocks}
                  onSelect={setSelectedDay}
                  onPrev={() => setWeekOffset((p) => p - 1)}
                  onNext={() => setWeekOffset((p) => p + 1)}
                />
              </CardContent>
            </Card>

            {/* Day view */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{format(selectedDay, "EEEE, MMMM d")}</span>
                  <Badge variant="secondary">{dayBlocks.length} block{dayBlocks.length !== 1 ? "s" : ""}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dayBlocks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Brain className="w-10 h-10 text-muted-foreground/40 mb-3" />
                    <p className="text-muted-foreground text-sm">No blocks scheduled</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Click "Add Block" to schedule a session</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {dayBlocks
                      .sort((a, b) => a.start_time.localeCompare(b.start_time))
                      .map((block) => {
                        const meta = BLOCK_META[block.block_type];
                        const Icon = meta.icon;
                        return (
                          <div
                            key={block.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${meta.color} ${block.completed ? "opacity-50" : ""}`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium text-sm ${block.completed ? "line-through" : ""}`}>
                                {block.title}
                              </p>
                              <p className="text-xs opacity-70">
                                {block.start_time.slice(0, 5)} · {meta.label}
                                {block.subject ? ` · ${block.subject}` : ""}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleComplete(block)}
                                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                                  block.completed ? "bg-primary border-primary text-primary-foreground" : "border-current opacity-40 hover:opacity-70"
                                }`}
                              >
                                {block.completed && <Check className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => deleteBlock(block.id)}
                                className="w-7 h-7 rounded-full flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Targets tab ────────────────────────────── */}
        <TabsContent value="targets" className="mt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Progress card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">This Week's Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-bold text-primary">{completedFocusBlocks}</p>
                    <p className="text-sm text-muted-foreground">
                      of {target.weekly_deep_work_sessions} deep work sessions
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-muted-foreground">{progressPct}%</p>
                </div>
                <Progress value={progressPct} className="h-3" />
                <div className="grid grid-cols-7 gap-1 pt-2">
                  {week.map((day, i) => {
                    const dayFocusDone = blocks.filter(
                      (b) => b.block_date === format(day, "yyyy-MM-dd") && b.block_type === "focus" && b.completed
                    ).length;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">{format(day, "EEE")[0]}</span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            dayFocusDone > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {dayFocusDone || "·"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Target setter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Set Weekly Target</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Deep work sessions per week</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={14}
                      value={target.weekly_deep_work_sessions}
                      onChange={(e) =>
                        setTarget((t) => ({ ...t, weekly_deep_work_sessions: Number(e.target.value) }))
                      }
                      className="flex-1 accent-primary"
                    />
                    <span className="w-8 text-center font-bold text-primary">
                      {target.weekly_deep_work_sessions}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {target.weekly_deep_work_sessions <= 5 ? "Sustainable for most students" : target.weekly_deep_work_sessions <= 9 ? "High performer territory" : "Elite mode — ensure you're sleeping enough!"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Session length (minutes)</Label>
                  <div className="flex gap-2">
                    {[60, 90, 120].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setTarget((t) => ({ ...t, session_duration_minutes: mins }))}
                        className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${
                          target.session_duration_minutes === mins
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    90 min matches a single ultradian rhythm cycle — the sweet spot per Huberman.
                  </p>
                </div>

                <Button onClick={saveTarget} disabled={savingTarget} className="w-full">
                  {savingTarget ? "Saving…" : "Save Target"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Weekly block breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Week Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {week.map((day) => {
                  const dayStr = format(day, "yyyy-MM-dd");
                  const dayBlks = blocks.filter((b) => b.block_date === dayStr);
                  const focusCount = dayBlks.filter((b) => b.block_type === "focus").length;
                  const doneCount = dayBlks.filter((b) => b.completed).length;
                  return (
                    <button
                      key={dayStr}
                      onClick={() => { setSelectedDay(day); }}
                      className={`flex flex-col items-center p-3 rounded-xl border transition-all hover:border-primary/50 cursor-pointer ${
                        isSameDay(day, selectedDay) ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <span className="text-xs text-muted-foreground">{format(day, "EEE")}</span>
                      <span className="text-lg font-bold text-foreground">{format(day, "d")}</span>
                      <span className="mt-1 text-xs font-medium text-primary">{focusCount > 0 ? `${doneCount}/${dayBlks.length}` : "—"}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Calendars tab ───────────────────────────── */}
        <TabsContent value="calendars" className="mt-4 space-y-4">
          {connections.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <h3 className="font-semibold text-foreground mb-1">No calendars connected</h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-6">
                  Connect Google Calendar, Outlook, Apple Calendar or any iCal feed to see your existing events alongside your study blocks.
                </p>
                <CalendarConnectDialog onSaved={fetchData} />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {connections.map((conn) => (
                <Card key={conn.id}>
                  <CardContent className="flex items-center gap-4 py-4">
                    {conn.connection_type === "ical" && conn.ical_url?.includes("google") ? (
                      <img
                        src="https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_48dp.png"
                        alt="Google Calendar"
                        className="w-8 h-8"
                      />
                    ) : (
                      <Calendar className="w-8 h-8 text-primary" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{conn.display_name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {conn.ical_url}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteConnection(conn.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-end">
                <CalendarConnectDialog onSaved={fetchData} />
              </div>
            </div>
          )}

          <Card className="border-dashed">
            <CardContent className="py-4">
              <h4 className="font-medium text-sm text-foreground mb-2">Supported Calendars</h4>
              <div className="flex flex-wrap gap-2">
                {["Google Calendar", "Apple Calendar", "Outlook", "Notion Calendar", "Fantastical", "Any iCal feed"].map((c) => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyPlan;
