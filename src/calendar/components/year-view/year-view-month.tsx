import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { format, isSameDay, parseISO, getDaysInMonth, startOfMonth, addDays } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { YearViewDayCell } from "@/calendar/components/year-view/year-view-day-cell";

import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  month: Date;
  events: IEvent[];
}

export function YearViewMonth({ month, events }: IProps) {
  const { push } = useRouter();
  const { setSelectedDate } = useCalendar();

  const monthName = format(month, "MMMM");

  const daysInMonth = useMemo(() => {
    const totalDays = getDaysInMonth(month);
    const firstDay = startOfMonth(month).getDay();

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const blanks = Array(firstDay).fill(null);

    return [...blanks, ...days];
  }, [month]);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfMonth(month), i + 1 - startOfMonth(month).getDay()));

  const handleClick = () => {
    setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 1));
    push("/month-view");
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      <button type="button" onClick={handleClick} className="w-full border-b px-3 py-2 text-sm font-semibold hover:bg-bg-primary-hover">
        {monthName}
      </button>

      <div className="space-y-2 p-3">
        <div className="grid grid-cols-7 gap-x-0.5 text-center">
          {weekDays.map((day, index) => (
            <div key={index} className="text-xs font-medium text-t-quaternary">
              {format(day, "EE")}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-x-0.5 gap-y-2">
          {daysInMonth.map((day, index) => {
            if (day === null) return <div key={index} className="h-10" />;

            const date = new Date(month.getFullYear(), month.getMonth(), day);
            const dayEvents = events.filter(event => isSameDay(parseISO(event.startDate), date) || isSameDay(parseISO(event.endDate), date));

            return <YearViewDayCell key={day} day={day} date={date} events={dayEvents} />;
          })}
        </div>
      </div>
    </div>
  );
}
