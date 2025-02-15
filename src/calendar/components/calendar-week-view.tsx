import { startOfWeek, addDays, format, parseISO, isSameDay, differenceInMinutes, areIntervalsOverlapping } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";

import { CalendarTimeline } from "@/calendar/components/calendar-time-line";
import { MultiDayWeekSection } from "@/calendar/components/multi-day-week-section";
import { CalendarItemWeekBadge } from "@/calendar/components/calendar-item-week-badge";

import type { ICalendarItem } from "@/calendar/interfaces";

interface IProps {
  singleDayCalendarItems: ICalendarItem[];
  multiDayCalendarItems: ICalendarItem[];
}

export function CalendarWeekView({ singleDayCalendarItems, multiDayCalendarItems }: IProps) {
  const { selectedDate } = useCalendar();

  // ================ Logic to mount the calendar and it's cells ================ //
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // ================ Logic to fill the calendar with events ================ //
  const getCalendarItemStyle = (item: ICalendarItem, day: Date, groupIndex: number, groupSize: number) => {
    const startDate = parseISO(item.startDate);
    const dayStart = new Date(day.setHours(0, 0, 0, 0));
    const itemStart = startDate < dayStart ? dayStart : startDate;
    const startMinutes = differenceInMinutes(itemStart, dayStart);

    const top = (startMinutes / 1440) * 100;
    const width = 100 / groupSize;
    const left = groupIndex * width;

    return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
  };

  const groupCalendarItems = (dayCalendarItems: ICalendarItem[]) => {
    const sortedCalendarItems = dayCalendarItems.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
    const groups: ICalendarItem[][] = [];

    for (const item of sortedCalendarItems) {
      const itemStart = parseISO(item.startDate);

      let placed = false;
      for (const group of groups) {
        const lastItemInGroup = group[group.length - 1];
        const lastItemEnd = parseISO(lastItemInGroup.endDate);

        if (itemStart >= lastItemEnd) {
          group.push(item);
          placed = true;
          break;
        }
      }

      if (!placed) groups.push([item]);
    }

    return groups;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center border-b py-4 text-sm text-t-quaternary sm:hidden">
        <p>Weekly view is not available on smaller devices.</p>
        <p>Please switch to daily or monthly view.</p>
      </div>

      <div className="hidden flex-col border-b sm:flex lg:border-b-0">
        <div>
          <MultiDayWeekSection selectedDate={selectedDate} multiDayCalendarItems={multiDayCalendarItems} />

          {/* Week header */}
          <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            <div className="grid flex-1 grid-cols-7 divide-x border-l">
              {weekDays.map((day, index) => (
                <span key={index} className="py-2 text-center text-xs font-medium text-t-quaternary">
                  {format(day, "EE")} <span className="ml-1 font-semibold text-t-secondary">{format(day, "d")}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="h-[736px]" type="always">
          <div className="flex">
            {/* Hours column */}
            <div className="relative w-18">
              {hours.map((hour, index) => (
                <div key={hour} className="relative" style={{ height: "96px" }}>
                  <div className="absolute -top-3 right-2 flex h-6 items-center">
                    {index !== 0 && <span className="text-xs text-t-quaternary">{format(new Date().setHours(hour), "hh a")}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Week grid */}
            <div className="relative flex-1 border-l">
              <div className="grid grid-cols-7 divide-x">
                {weekDays.map((day, dayIndex) => {
                  const dayItems = singleDayCalendarItems.filter(item => isSameDay(parseISO(item.startDate), day) || isSameDay(parseISO(item.endDate), day));
                  const groupedItems = groupCalendarItems(dayItems);

                  return (
                    <div key={dayIndex} className="relative">
                      {hours.map((hour, index) => (
                        <div key={hour} className="relative" style={{ height: "96px" }}>
                          {index !== 0 && <div className="absolute inset-x-0 top-0 border-b"></div>}
                          <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>
                        </div>
                      ))}

                      {groupedItems.map((group, groupIndex) =>
                        group.map(item => {
                          let style = getCalendarItemStyle(item, day, groupIndex, groupedItems.length);
                          const hasOverlap = groupedItems.some(
                            (otherGroup, otherIndex) =>
                              otherIndex !== groupIndex &&
                              otherGroup.some(otherItem =>
                                areIntervalsOverlapping(
                                  { start: parseISO(item.startDate), end: parseISO(item.endDate) },
                                  { start: parseISO(otherItem.startDate), end: parseISO(otherItem.endDate) }
                                )
                              )
                          );

                          if (!hasOverlap) style = { ...style, width: "100%", left: "0%" };

                          return (
                            <div key={item.id} className="absolute p-1" style={style}>
                              <CalendarItemWeekBadge calendarItem={item} />
                            </div>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>

              <CalendarTimeline />
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
