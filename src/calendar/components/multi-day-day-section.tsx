import { parseISO, isWithinInterval, differenceInDays, startOfDay, endOfDay } from "date-fns";

import { CalendarItemBadge } from "@/calendar/components/calendar-item-badge";

import type { ICalendarItem } from "@/calendar/interfaces";

interface IProps {
  selectedDate: Date;
  multiDayCalendarItems: ICalendarItem[];
}

export function MultiDayDaySection({ selectedDate, multiDayCalendarItems }: IProps) {
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);

  const multiDayCalendarItemsInDay = multiDayCalendarItems
    .filter(item => {
      const itemStart = parseISO(item.startDate);
      const itemEnd = parseISO(item.endDate);

      const isOverlapping =
        isWithinInterval(dayStart, { start: itemStart, end: itemEnd }) ||
        isWithinInterval(dayEnd, { start: itemStart, end: itemEnd }) ||
        (itemStart <= dayStart && itemEnd >= dayEnd);

      return isOverlapping;
    })
    .sort((a, b) => {
      const durationA = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
      const durationB = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
      return durationB - durationA;
    });

  if (multiDayCalendarItemsInDay.length === 0) return null;

  return (
    <div className="flex border-b">
      <div className="w-18"></div>
      <div className="flex flex-1 flex-col gap-1 border-l py-1">
        {multiDayCalendarItemsInDay.map(item => {
          const itemStart = startOfDay(parseISO(item.startDate));
          const itemEnd = startOfDay(parseISO(item.endDate));
          const currentDate = startOfDay(selectedDate);

          const itemTotalDays = differenceInDays(itemEnd, itemStart) + 1;
          const itemCurrentDay = differenceInDays(currentDate, itemStart) + 1;

          return (
            <CalendarItemBadge
              key={item.id}
              calendarItem={item}
              cellDate={selectedDate}
              calendarItemCurrentDay={itemCurrentDay}
              calendarItemTotalDays={itemTotalDays}
            />
          );
        })}
      </div>
    </div>
  );
}
