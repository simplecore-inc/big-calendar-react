"use client";

import { useMemo } from "react";
import { isSameDay, parseISO } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { CalendarDayView } from "@/calendar/components/calendar-day-view";
import { CalendarWeekView } from "@/calendar/components/calendar-week-view";
import { CalendarHeader } from "@/calendar/components/header/calendar-header";
import { CalendarMonthView } from "@/calendar/components/calendar-month-view";

import type { TCalendarView } from "@/calendar/types";

interface IProps {
  view: TCalendarView;
}

export function ClientContainer({ view }: IProps) {
  const { selectedDate, selectedUserId, events } = useCalendar();

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const itemStartDate = new Date(event.startDate);
      const itemEndDate = new Date(event.endDate);

      const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

      const isInSelectedMonth = itemStartDate <= monthEnd && itemEndDate >= monthStart;
      const isUserMatch = selectedUserId === "all" || event.userId === selectedUserId;
      return isInSelectedMonth && isUserMatch;
    });
  }, [selectedDate, selectedUserId, events]);

  const singleDayEvents = filteredEvents.filter(event => {
    const startDate = parseISO(event.startDate);
    const endDate = parseISO(event.endDate);
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = filteredEvents.filter(event => {
    const startDate = parseISO(event.startDate);
    const endDate = parseISO(event.endDate);
    return !isSameDay(startDate, endDate);
  });

  return (
    <div className="rounded-xl border">
      <CalendarHeader view={view} events={filteredEvents} />
      {view === "month" && <CalendarMonthView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />}
      {view === "week" && <CalendarWeekView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />}
      {view === "day" && <CalendarDayView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />}
    </div>
  );
}
