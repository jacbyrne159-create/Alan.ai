import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format, isSameDay, startOfWeek, addDays } from "date-fns";
import { Plus, Clock, Trash2, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalendarEvent {
  id: string;
  title: string;
  start_at: string;
  end_at: string | null;
  all_day: boolean;
  location: string | null;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    allDay: false,
  });

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", user!.id)
      .order("start_at", { ascending: true });

    if (error) {
      toast({ title: "Error loading events", description: error.message, variant: "destructive" });
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  }

  async function createEvent() {
    if (!newEvent.title.trim()) {
      toast({ title: "Please enter a title", variant: "destructive" });
      return;
    }

    const start_at = newEvent.allDay
      ? `${newEvent.date}T00:00:00`
      : `${newEvent.date}T${newEvent.startTime}:00`;
    const end_at = newEvent.allDay
      ? null
      : `${newEvent.date}T${newEvent.endTime}:00`;

    const { error } = await supabase.from("calendar_events").insert({
      user_id: user!.id,
      title: newEvent.title,
      start_at,
      end_at,
      all_day: newEvent.allDay,
    });

    if (error) {
      toast({ title: "Error creating event", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Study block added! 🎯" });
      setDialogOpen(false);
      setNewEvent({ title: "", date: format(new Date(), "yyyy-MM-dd"), startTime: "09:00", endTime: "10:00", allDay: false });
      fetchEvents();
    }
  }

  async function deleteEvent(id: string) {
    const { error } = await supabase.from("calendar_events").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting event", description: error.message, variant: "destructive" });
    } else {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  }

  // Week view helpers
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  function getEventsForDayAndHour(day: Date, hour: number) {
    return events.filter((e) => {
      const start = new Date(e.start_at);
      return isSameDay(start, day) && start.getHours() === hour;
    });
  }

  function getEventsForDay(day: Date) {
    return events.filter((e) => isSameDay(new Date(e.start_at), day));
  }

  const selectedDayEvents = getEventsForDay(selectedDate);

  return (
    <div className="flex h-full gap-6 p-6">
      {/* Left sidebar */}
      <div className="flex flex-col gap-4 w-72 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="h-6 w-6" /> Calendar
          </h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Study Block</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 pt-2">
                <div>
                  <Label>Title</Label>
                  <Input
                    placeholder="e.g. Deep Work – Finance"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Label>Start</Label>
                    <Input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      disabled={newEvent.allDay}
                    />
                  </div>
                  <div className="flex-1">
                    <Label>End</Label>
                    <Input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      disabled={newEvent.allDay}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="allday"
                    checked={newEvent.allDay}
                    onChange={(e) => setNewEvent({ ...newEvent, allDay: e.target.checked })}
                  />
                  <Label htmlFor="allday">All day</Label>
                </div>
                <Button onClick={createEvent}>Save Block</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mini calendar */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(d) => d && setSelectedDate(d)}
          className="rounded-md border"
          modifiers={{ hasEvent: events.map((e) => new Date(e.start_at)) }}
          modifiersClassNames={{ hasEvent: "font-bold underline decoration-primary" }}
        />

        {/* Selected day events */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">
            {format(selectedDate, "EEEE, MMM d")}
          </h2>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : selectedDayEvents.length === 0 ? (
            <p className="text-sm text-muted-foreground">No blocks — free to study! 📚</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {selectedDayEvents.map((e) => (
                <li key={e.id} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    {!e.all_day && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(e.start_at), "HH:mm")}
                        {e.end_at && ` – ${format(new Date(e.end_at), "HH:mm")}`}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteEvent(e.id)}>
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Week view */}
      <div className="flex-1 overflow-auto rounded-md border">
        <div className="grid grid-cols-8 sticky top-0 bg-background z-10 border-b">
          <div className="p-2 text-xs text-muted-foreground" />
          {weekDays.map((day) => (
            <div
              key={day.toISOString()}
              className={`p-2 text-center text-xs font-medium cursor-pointer hover:bg-accent ${isSameDay(day, selectedDate) ? "bg-primary/10 text-primary" : ""}`}
              onClick={() => setSelectedDate(day)}
            >
              <div>{format(day, "EEE")}</div>
              <div className={`text-lg font-bold ${isSameDay(day, new Date()) ? "text-primary" : ""}`}>
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-8">
          {HOURS.map((hour) => (
            <>
              <div key={`hour-${hour}`} className="border-b border-r p-1 text-xs text-muted-foreground text-right pr-2 h-14">
                {hour === 0 ? "" : `${hour}:00`}
              </div>
              {weekDays.map((day) => {
                const cellEvents = getEventsForDayAndHour(day, hour);
                return (
                  <div
                    key={`${day.toISOString()}-${hour}`}
                    className={`border-b border-r h-14 p-0.5 ${isSameDay(day, selectedDate) ? "bg-primary/5" : ""}`}
                  >
                    {cellEvents.map((e) => (
                      <div
                        key={e.id}
                        className="bg-primary text-primary-foreground text-xs rounded px-1 py-0.5 truncate cursor-pointer"
                        title={e.title}
                        onClick={() => deleteEvent(e.id)}
                      >
                        {e.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
