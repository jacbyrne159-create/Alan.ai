import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, isSameDay, startOfWeek, addDays } from "date-fns";
import { Plus, CalendarDays } from "lucide-react";

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex h-full gap-6 p-6">
      <div className="flex flex-col gap-4 w-72 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="h-6 w-6" /> Calendar
          </h1>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(d) => d && setSelectedDate(d)}
          className="rounded-md border"
        />

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2">
            {format(selectedDate, "EEEE, MMM d")}
          </h2>
          <p className="text-sm text-muted-foreground">
            Use the Study Plan to schedule your blocks and connect calendars.
          </p>
        </div>
      </div>

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

        <div className="grid grid-cols-8">
          {HOURS.map((hour) => (
            <div key={`row-${hour}`} className="contents">
              <div className="border-b border-r p-1 text-xs text-muted-foreground text-right pr-2 h-14">
                {hour === 0 ? "" : `${hour}:00`}
              </div>
              {weekDays.map((day) => (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={`border-b border-r h-14 p-0.5 ${isSameDay(day, selectedDate) ? "bg-primary/5" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
