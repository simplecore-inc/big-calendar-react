import { useMemo } from "react";
import { parseISO, startOfDay, startOfWeek, endOfWeek, addDays, differenceInDays, isBefore, isAfter } from "date-fns";

import { CalendarItemBadge } from "@/calendar/components/calendar-item-badge";

import type { ICalendarItem } from "@/calendar/interfaces";

interface IProps {
  selectedDate: Date;
  multiDayCalendarItems: ICalendarItem[];
}

export function MultiDayWeekSection({ selectedDate, multiDayCalendarItems }: IProps) {
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = endOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const processedCalendarItems = useMemo(() => {
    return multiDayCalendarItems
      .map(item => {
        const start = parseISO(item.startDate);
        const end = parseISO(item.endDate);
        const adjustedStart = isBefore(start, weekStart) ? weekStart : start;
        const adjustedEnd = isAfter(end, weekEnd) ? weekEnd : end;
        const startIndex = differenceInDays(adjustedStart, weekStart);
        const endIndex = differenceInDays(adjustedEnd, weekStart);

        return {
          ...item,
          adjustedStart,
          adjustedEnd,
          startIndex,
          endIndex,
        };
      })
      .sort((a, b) => {
        const startDiff = a.adjustedStart.getTime() - b.adjustedStart.getTime();
        if (startDiff !== 0) return startDiff;
        return b.endIndex - b.startIndex - (a.endIndex - a.startIndex);
      });
  }, [multiDayCalendarItems, weekStart, weekEnd]);

  const calendarItemRows = useMemo(() => {
    const rows: (typeof processedCalendarItems)[] = [];

    processedCalendarItems.forEach(item => {
      let rowIndex = rows.findIndex(row => row.every(e => e.endIndex < item.startIndex || e.startIndex > item.endIndex));

      if (rowIndex === -1) {
        rowIndex = rows.length;
        rows.push([]);
      }

      rows[rowIndex].push(item);
    });

    return rows;
  }, [processedCalendarItems]);

  const hasEventsInWeek = useMemo(() => {
    return multiDayCalendarItems.some(item => {
      const start = parseISO(item.startDate);
      const end = parseISO(item.endDate);

      return (
        // Event starts within the week
        (start >= weekStart && start <= weekEnd) ||
        // Event ends within the week
        (end >= weekStart && end <= weekEnd) ||
        // Event spans the entire week
        (start <= weekStart && end >= weekEnd)
      );
    });
  }, [multiDayCalendarItems, weekStart, weekEnd]);

  if (!hasEventsInWeek) {
    return null;
  }

  return (
    <div className="hidden overflow-hidden sm:flex">
      <div className="w-18 border-b"></div>
      <div className="grid flex-1 grid-cols-7 divide-x border-b border-l">
        {weekDays.map((day, dayIndex) => (
          <div key={day.toISOString()} className="flex h-full flex-col gap-1 py-1">
            {calendarItemRows.map((row, rowIndex) => {
              const item = row.find(e => e.startIndex <= dayIndex && e.endIndex >= dayIndex);

              return item ? (
                <CalendarItemBadge key={`${item.id}-${dayIndex}`} calendarItem={item} cellDate={startOfDay(day)} />
              ) : (
                <div key={`${rowIndex}-${dayIndex}`} className="h-6.5" />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
