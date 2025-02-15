import { Calendar, Clock, User } from "lucide-react";
import { parseISO, differenceInMinutes, areIntervalsOverlapping, format, isWithinInterval } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { DayPicker } from "@/components/ui/day-picker";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CalendarTimeline } from "@/calendar/components/calendar-time-line";
import { MultiDayDaySection } from "@/calendar/components/multi-day-day-section";
import { CalendarItemWeekBadge } from "@/calendar/components/calendar-item-week-badge";

import type { ICalendarItem, IUser } from "@/calendar/interfaces";

interface IProps {
  users: IUser[];
  singleDayCalendarItems: ICalendarItem[];
  multiDayCalendarItems: ICalendarItem[];
}

export function CalendarDayView({ users, singleDayCalendarItems, multiDayCalendarItems }: IProps) {
  const { selectedDate, setSelectedDate } = useCalendar();

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getCurrentEvent = (events: ICalendarItem[]) => {
    const now = new Date();

    return (
      events.filter(event =>
        isWithinInterval(now, {
          start: parseISO(event.startDate),
          end: parseISO(event.endDate),
        })
      ) || null
    );
  };

  const currentEvents = getCurrentEvent(singleDayCalendarItems);

  // ================ Logic to fill the calendar with events ================ //
  const getEventStyle = (event: ICalendarItem, groupIndex: number, groupSize: number) => {
    const startDate = parseISO(event.startDate);
    const dayStart = new Date(selectedDate.setHours(0, 0, 0, 0));
    const eventStart = startDate < dayStart ? dayStart : startDate;
    const startMinutes = differenceInMinutes(eventStart, dayStart);

    const top = (startMinutes / 1440) * 100;
    const width = 100 / groupSize;
    const left = groupIndex * width;

    return { top: `${top}%`, width: `${width}%`, left: `${left}%` };
  };

  const groupEvents = (dayEvents: ICalendarItem[]) => {
    const sortedEvents = dayEvents.sort((a, b) => parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime());
    const groups: ICalendarItem[][] = [];

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

  const dayEvents = singleDayCalendarItems.filter(event => {
    const eventDate = parseISO(event.startDate);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const groupedEvents = groupEvents(dayEvents);

  return (
    <div className="flex border-b lg:border-b-0">
      <div className="flex flex-1 flex-col">
        <div>
          <MultiDayDaySection selectedDate={selectedDate} multiDayCalendarItems={multiDayCalendarItems} />

          {/* Day header */}
          <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            <span className="flex-1 border-l py-2 text-center text-xs font-medium text-t-quaternary">
              {format(selectedDate, "EE")} <span className="font-semibold text-t-secondary">{format(selectedDate, "d")}</span>
            </span>
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

            {/* Day grid */}
            <div className="relative flex-1 border-l">
              <div className="relative">
                {hours.map((hour, index) => (
                  <div key={hour} className="relative" style={{ height: "96px" }}>
                    {index !== 0 && <div className="absolute inset-x-0 top-0 border-b"></div>}
                    <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>
                  </div>
                ))}

                {groupedEvents.map((group, groupIndex) =>
                  group.map(event => {
                    let style = getEventStyle(event, groupIndex, groupedEvents.length);
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
                        <CalendarItemWeekBadge calendarItem={event} />
                      </div>
                    );
                  })
                )}
              </div>

              <CalendarTimeline />
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="hidden w-72 divide-y border-l md:block">
        <DayPicker className="mx-auto w-fit" mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />

        <div className="flex-1 space-y-3">
          {currentEvents.length > 0 ? (
            <div className="flex items-start gap-2 px-4 pt-4">
              <span className="relative mt-[5px] flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-success-600"></span>
              </span>

              <p className="text-sm font-semibold text-t-secondary">Happening now</p>
            </div>
          ) : (
            <p className="p-4 text-center text-sm italic text-t-tertiary">No appointments or consultations at the moment</p>
          )}

          {currentEvents.length > 0 && (
            <ScrollArea className="h-[422px] px-4" type="always">
              <div className="space-y-6 pb-4">
                {currentEvents.map(item => {
                  const user = users.find(user => user.id === item.userId);

                  return (
                    <div key={item.id} className="space-y-1.5">
                      <p className="line-clamp-2 text-sm font-semibold">{item.title}</p>

                      {user && (
                        <div className="flex items-center gap-1.5">
                          <User className="size-4 text-t-quinary" />
                          <span className="text-sm text-t-tertiary">{user.name}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4 text-t-quinary" />
                        <span className="text-sm text-t-tertiary">{format(new Date(), "MMM d, yyyy")}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4 text-t-quinary" />
                        <span className="text-sm text-t-tertiary">
                          {format(parseISO(item.startDate), "hh:mm a")} - {format(parseISO(item.endDate), "hh:mm a")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
