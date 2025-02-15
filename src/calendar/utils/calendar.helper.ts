import {
  addDays,
  addMonths,
  addWeeks,
  subDays,
  subMonths,
  subWeeks,
  isSameWeek,
  isSameDay,
  isSameMonth,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  format,
} from "date-fns";

import type { TCalendarView } from "@/calendar/types";
import type { IEvent } from "@/calendar/interfaces";

// ================ Header helper functions ================ //

export const formatMonthRange = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const formatString = "MMM d, yyyy";
  return `${format(start, formatString)} - ${format(end, formatString)}`;
};

export function formatWeekRange(date: Date) {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  const formatString = "MMM d, yyyy";
  return `${format(start, formatString)} - ${format(end, formatString)}`;
}

export function navigateDate(date: Date, view: TCalendarView, direction: "previous" | "next"): Date {
  const operations = {
    month: direction === "next" ? addMonths : subMonths,
    week: direction === "next" ? addWeeks : subWeeks,
    day: direction === "next" ? addDays : subDays,
  };

  return operations[view](date, 1);
}

export function getEventsCount(events: IEvent[], date: Date, view: TCalendarView): number {
  const compareFns = {
    day: isSameDay,
    week: isSameWeek,
    month: isSameMonth,
  };

  return events.filter(event => compareFns[view](new Date(event.startDate), date)).length;
}
