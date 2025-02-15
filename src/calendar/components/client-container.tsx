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
  const { selectedDate, selectedUserId, calendarItems } = useCalendar();

  const filteredCalendarItens = useMemo(() => {
    return calendarItems.filter(item => {
      const itemStartDate = new Date(item.startDate);
      const itemEndDate = new Date(item.endDate);

      const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

      const isInSelectedMonth = itemStartDate <= monthEnd && itemEndDate >= monthStart;
      const isUserMatch = selectedUserId === "all" || item.userId === selectedUserId;
      return isInSelectedMonth && isUserMatch;
    });
  }, [selectedDate, selectedUserId, calendarItems]);

  const singleDayItems = filteredCalendarItens.filter(calendarItem => {
    const startDate = parseISO(calendarItem.startDate);
    const endDate = parseISO(calendarItem.endDate);
    return isSameDay(startDate, endDate);
  });

  const multiDayItems = filteredCalendarItens.filter(calendarItem => {
    const startDate = parseISO(calendarItem.startDate);
    const endDate = parseISO(calendarItem.endDate);
    return !isSameDay(startDate, endDate);
  });

  return (
    <div className="rounded-xl border">
      <CalendarHeader view={view} calendarItens={filteredCalendarItens} />
      {view === "month" && <CalendarMonthView singleDayCalendarItems={singleDayItems} multiDayCalendarItems={multiDayItems} />}
      {view === "week" && <CalendarWeekView singleDayCalendarItems={singleDayItems} multiDayCalendarItems={multiDayItems} />}
      {view === "day" && <CalendarDayView singleDayCalendarItems={singleDayItems} multiDayCalendarItems={multiDayItems} />}
    </div>
  );
}
