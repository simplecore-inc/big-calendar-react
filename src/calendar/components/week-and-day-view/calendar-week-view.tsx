import { startOfWeek, addDays, format, parseISO, isSameDay, differenceInMinutes, areIntervalsOverlapping } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { ScrollArea } from "@/components/ui/scroll-area";

import { EventBlock } from "@/calendar/components/week-and-day-view/event-block";
import { CalendarTimeline } from "@/calendar/components/week-and-day-view/calendar-time-line";
import { WeekViewMultiDayEventsRow } from "@/calendar/components/week-and-day-view/week-view-multi-day-events-row";

import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarWeekView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate } = useCalendar();

  // ================ Logic to mount the calendar and it's cells ================ //
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // ================ Logic to add the events to the calendar cells ================ //
  const getEventStyle = (event: IEvent, day: Date, groupIndex: number, groupSize: number) => {
    const startDate = parseISO(event.startDate);
    const dayStart = new Date(day.setHours(0, 0, 0, 0));
    const eventStart = startDate < dayStart ? dayStart : startDate;
    const startMinutes = differenceInMinutes(eventStart, dayStart);

    const top = (startMinutes / 1440) * 100;
    const width = 100 / groupSize;
    const left = groupIndex * width;

    return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
  };

  const groupEvents = (dayEvents: IEvent[]) => {
    const sortedEvents = dayEvents.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
    const groups: IEvent[][] = [];

    for (const event of sortedEvents) {
      const eventStart = parseISO(event.startDate);

      let placed = false;
      for (const group of groups) {
        const lastEventInGroup = group[group.length - 1];
        const lastEventEnd = parseISO(lastEventInGroup.endDate);

        if (eventStart >= lastEventEnd) {
          group.push(event);
          placed = true;
          break;
        }
      }

      if (!placed) groups.push([event]);
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
          <WeekViewMultiDayEventsRow selectedDate={selectedDate} multiDayEvents={multiDayEvents} />

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
                  const dayEvents = singleDayEvents.filter(event => isSameDay(parseISO(event.startDate), day) || isSameDay(parseISO(event.endDate), day));
                  const groupedEvents = groupEvents(dayEvents);

                  return (
                    <div key={dayIndex} className="relative">
                      {hours.map((hour, index) => (
                        <div key={hour} className="relative" style={{ height: "96px" }}>
                          {index !== 0 && <div className="absolute inset-x-0 top-0 border-b"></div>}
                          <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>
                        </div>
                      ))}

                      {groupedEvents.map((group, groupIndex) =>
                        group.map(event => {
                          let style = getEventStyle(event, day, groupIndex, groupedEvents.length);
                          const hasOverlap = groupedEvents.some(
                            (otherGroup, otherIndex) =>
                              otherIndex !== groupIndex &&
                              otherGroup.some(otherEvent =>
                                areIntervalsOverlapping(
                                  { start: parseISO(event.startDate), end: parseISO(event.endDate) },
                                  { start: parseISO(otherEvent.startDate), end: parseISO(otherEvent.endDate) }
                                )
                              )
                          );

                          if (!hasOverlap) style = { ...style, width: "100%", left: "0%" };

                          return (
                            <div key={event.id} className="absolute p-1" style={style}>
                              <EventBlock event={event} />
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
