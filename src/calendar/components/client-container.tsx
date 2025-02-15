"use client";

import { useMemo } from "react";
import { isSameDay, parseISO } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { CalendarHeader } from "@/calendar/components/calendar-header";
import { CalendarDayView } from "@/calendar/components/calendar-day-view";
import { CalendarWeekView } from "@/calendar/components/calendar-week-view";
import { CalendarMonthView } from "@/calendar/components/calendar-month-view";
import { ChangeBadgeVariant } from "@/calendar/components/change-badge-variant";

import type { ICalendarItem, IUser } from "@/calendar/interfaces";

interface IProps {
  view: "month" | "week" | "day";
  calendarItems: ICalendarItem[];
  users: IUser[];
}

export function ClientContainer({ view, calendarItems, users }: IProps) {
  const { selectedDate, selectedUserId } = useCalendar();

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
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8">
      <div className="rounded-xl border">
        <CalendarHeader view={view} calendarItens={filteredCalendarItens} users={users} />
        {view === "month" && <CalendarMonthView selectedDate={selectedDate} singleDayCalendarItems={singleDayItems} multiDayCalendarItems={multiDayItems} />}
        {view === "week" && <CalendarWeekView selectedDate={selectedDate} singleDayCalendarItems={singleDayItems} multiDayCalendarItems={multiDayItems} />}
        {view === "day" && <CalendarDayView users={users} singleDayCalendarItems={singleDayItems} multiDayCalendarItems={multiDayItems} />}
      </div>

      <ChangeBadgeVariant />
    </div>
  );
}
