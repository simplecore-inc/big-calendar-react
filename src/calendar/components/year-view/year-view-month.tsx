import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format, isSameDay, parseISO, getDaysInMonth, startOfMonth, startOfWeek, addDays } from "date-fns";
import { useTranslation } from "react-i18next";

import { useCalendarDate } from "@/stores/calendar-store";
import { getDateLocale } from "@/lib/date-locale";

import { YearViewDayCell } from "@/calendar/components/year-view/year-view-day-cell";

import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  month: Date;
  events: IEvent[];
}

export function YearViewMonth({ month, events }: IProps) {
  const navigate = useNavigate();
  const { setSelectedDate } = useCalendarDate();
  const { i18n } = useTranslation();
  const locale = getDateLocale(i18n.language);

  const monthName = format(month, "MMMM", { locale });

  const daysInMonth = useMemo(() => {
    const totalDays = getDaysInMonth(month);
    const monthStart = startOfMonth(month);
    const weekStart = startOfWeek(monthStart, { locale });
    const firstDayOffset = (monthStart.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24);

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const blanks = Array(firstDayOffset).fill(null);

    return [...blanks, ...days];
  }, [month, locale]);

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { locale });
    return Array.from({ length: 7 }, (_, i) => {
      const day = addDays(weekStart, i);
      return format(day, "EEE", { locale });
    });
  }, [locale]);

  const handleClick = () => {
    setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 1));
    navigate({ to: "/calendar/month" });
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={handleClick}
        className="w-full rounded-t-lg border px-3 py-2 text-sm font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {monthName}
      </button>

      <div className="flex-1 space-y-2 rounded-b-lg border border-t-0 p-3">
        <div className="grid grid-cols-7 gap-x-0.5 text-center">
          {weekDays.map((day, index) => (
            <div key={index} className="text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-x-0.5 gap-y-2">
          {daysInMonth.map((day, index) => {
            if (day === null) return <div key={`blank-${index}`} className="h-10" />;

            const date = new Date(month.getFullYear(), month.getMonth(), day);
            const dayEvents = events.filter(event => isSameDay(parseISO(event.startDate), date) || isSameDay(parseISO(event.endDate), date));

            return <YearViewDayCell key={`day-${day}`} day={day} date={date} events={dayEvents} />;
          })}
        </div>
      </div>
    </div>
  );
}
