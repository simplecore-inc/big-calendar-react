import { isToday, parseISO, isSameDay, differenceInDays, startOfDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { CalendarItemBadge } from "@/calendar/components/calendar-item-badge";
import { CalendarItemBullet } from "@/calendar/components/calendar-item-bullet";

import { cn } from "@/utils/helpers/cn.helper";

import type { ICalendarItem } from "@/calendar/interfaces";

interface IProps {
  singleDayCalendarItems: ICalendarItem[];
  multiDayCalendarItems: ICalendarItem[];
}

export function CalendarMonthView({ singleDayCalendarItems, multiDayCalendarItems }: IProps) {
  const { selectedDate } = useCalendar();

  // ================ Logic to mount the calendar and it's cells ================ //
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);
  const totalDays = firstDayOfMonth + daysInMonth;

  const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: daysInPrevMonth - firstDayOfMonth + i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - firstDayOfMonth + i + 1),
  }));

  const currentMonthCells = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
    date: new Date(currentYear, currentMonth, i + 1),
  }));

  const nextMonthCells = Array.from({ length: (7 - (totalDays % 7)) % 7 }, (_, i) => ({
    day: i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth + 1, i + 1),
  }));

  const allCells = [...prevMonthCells, ...currentMonthCells, ...nextMonthCells];

  // ================ Logic to fill the calendar items in the cells ================ //
  const calculateCalendarItemPositions = (multiDay: ICalendarItem[], singleDay: ICalendarItem[]) => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);

    const calendarItemPositions: { [key: string]: number } = {};
    const occupiedPositions: { [key: string]: boolean[] } = {};

    eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach(day => {
      occupiedPositions[day.toISOString()] = [false, false, false];
    });

    const sortedCalendarItems = [
      ...multiDay.sort((a, b) => {
        const aDuration = differenceInDays(parseISO(a.endDate), parseISO(a.startDate));
        const bDuration = differenceInDays(parseISO(b.endDate), parseISO(b.startDate));
        return bDuration - aDuration || parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime();
      }),
      ...singleDay.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime()),
    ];

    sortedCalendarItems.forEach(calendarItem => {
      const itemStart = parseISO(calendarItem.startDate);
      const itemEnd = parseISO(calendarItem.endDate);
      const itemDays = eachDayOfInterval({
        start: itemStart < monthStart ? monthStart : itemStart,
        end: itemEnd > monthEnd ? monthEnd : itemEnd,
      });

      let position = -1;

      for (let i = 0; i < 3; i++) {
        if (
          itemDays.every(day => {
            const dayPositions = occupiedPositions[startOfDay(day).toISOString()];
            return dayPositions && !dayPositions[i];
          })
        ) {
          position = i;
          break;
        }
      }

      if (position !== -1) {
        itemDays.forEach(day => {
          const dayKey = startOfDay(day).toISOString();
          occupiedPositions[dayKey][position] = true;
        });
        calendarItemPositions[calendarItem.id] = position;
      }
    });

    return calendarItemPositions;
  };

  const calendarItemPositions = calculateCalendarItemPositions(multiDayCalendarItems, singleDayCalendarItems);

  const getCalendarItemsForDate = (date: Date) => {
    const calendarItemsForDate = [...multiDayCalendarItems, ...singleDayCalendarItems].filter(calendarItem => {
      const calendarItemStart = parseISO(calendarItem.startDate);
      const calendarItemEnd = parseISO(calendarItem.endDate);
      return (date >= calendarItemStart && date <= calendarItemEnd) || isSameDay(date, calendarItemStart) || isSameDay(date, calendarItemEnd);
    });

    return calendarItemsForDate
      .map(calendarItem => ({
        ...calendarItem,
        position: calendarItemPositions[calendarItem.id] ?? -1,
        isMultiDay: multiDayCalendarItems.includes(calendarItem),
      }))
      .sort((a, b) => {
        if (a.isMultiDay && !b.isMultiDay) return -1;
        if (!a.isMultiDay && b.isMultiDay) return 1;
        return a.position - b.position;
      });
  };

  return (
    <div>
      <div className="grid grid-cols-7 divide-x border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="flex items-center justify-center py-2">
            <span className="text-xs font-medium text-t-quaternary">{day}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden border-b lg:border-b-0">
        {allCells.map(({ day, currentMonth, date }, index) => {
          const cellCalendarItems = getCalendarItemsForDate(date);

          return (
            <div key={date.toISOString()} className={cn("flex flex-col gap-1 py-1.5 lg:py-2", index > 6 && "border-t", index % 7 !== 0 && "border-l")}>
              <span
                className={cn(
                  "h-6 px-1 text-xs font-semibold lg:px-2",
                  !currentMonth && "opacity-20",
                  isToday(date) && "flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary-600 px-0 font-bold text-white"
                )}
              >
                {day}
              </span>

              <div className={cn("flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0", !currentMonth && "opacity-50")}>
                {[0, 1, 2].map(position => {
                  const calendarItem = cellCalendarItems.find(e => e.position === position);
                  const calendarItemKey = calendarItem ? `calendar-item-${calendarItem.id}-${position}` : `empty-${position}`;

                  return (
                    <div key={calendarItemKey} className="lg:flex-1">
                      {calendarItem && (
                        <>
                          <CalendarItemBullet className="lg:hidden" color={calendarItem.color} />
                          <CalendarItemBadge className="hidden lg:flex" calendarItem={calendarItem} cellDate={startOfDay(date)} />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className={cn("h-4.5 px-1.5 text-xs font-semibold text-t-quaternary", !currentMonth && "opacity-50")}>
                {cellCalendarItems.length > 3 && (
                  <>
                    <span className="sm:hidden">+{cellCalendarItems.length - 3}</span>
                    <span className="hidden sm:inline"> {cellCalendarItems.length - 3} more...</span>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
