import { format } from "date-fns";
import { useEffect, useState } from "react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

export function CalendarTimeline() {
  const { visibleHours } = useCalendar();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  const startTimeInMinutes = visibleHours.from * 60;
  const endTimeInMinutes = visibleHours.to * 60;
  const isInVisibleRange = currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;

  if (!isInVisibleRange) return null;

  const position = ((currentTimeInMinutes - startTimeInMinutes) / (endTimeInMinutes - startTimeInMinutes)) * 100;

  return (
    <div className="pointer-events-none absolute inset-x-0 z-50 border-t border-primary" style={{ top: `${position}%` }}>
      <div className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"></div>
      <div className="absolute -left-18 flex w-16 -translate-y-1/2 justify-end bg-background pr-1 text-xs font-medium text-primary">
        {format(currentTime, "h:mm a")}
      </div>
    </div>
  );
}
