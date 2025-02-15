import { Calendar, Clock, User } from "lucide-react";
import { parseISO, areIntervalsOverlapping, format, isWithinInterval } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { DayPicker } from "@/components/ui/day-picker";
import { ScrollArea } from "@/components/ui/scroll-area";

import { EventBlock } from "@/calendar/components/week-and-day-view/event-block";
import { CalendarTimeline } from "@/calendar/components/week-and-day-view/calendar-time-line";
import { DayViewMultiDayEventsRow } from "@/calendar/components/week-and-day-view/day-view-multi-day-events-row";

import { groupEvents, getEventBlockStyle } from "@/calendar/helpers";

import type { IEvent } from "@/calendar/interfaces";
import { AddEventDialog } from "@/calendar/components/dialogs/add-event-dialog";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarDayView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, setSelectedDate, users } = useCalendar();

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getCurrentEvents = (events: IEvent[]) => {
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

  const currentEvents = getCurrentEvents(singleDayEvents);

  const dayEvents = singleDayEvents.filter(event => {
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
          <DayViewMultiDayEventsRow selectedDate={selectedDate} multiDayEvents={multiDayEvents} />

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
                    {index !== 0 && <div className="pointer-events-none absolute inset-x-0 top-0 border-b"></div>}

                    <AddEventDialog startDate={selectedDate} startTime={{ hour, minute: 0 }}>
                      <div className="absolute inset-x-0 top-0 h-[48px] cursor-pointer transition-colors hover:bg-bg-primary-hover" />
                    </AddEventDialog>

                    <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary"></div>

                    <AddEventDialog startDate={selectedDate} startTime={{ hour, minute: 30 }}>
                      <div className="absolute inset-x-0 top-[48px] h-[48px] cursor-pointer transition-colors hover:bg-bg-primary-hover" />
                    </AddEventDialog>
                  </div>
                ))}

                {groupedEvents.map((group, groupIndex) =>
                  group.map(event => {
                    let style = getEventBlockStyle(event, selectedDate, groupIndex, groupedEvents.length);
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
                {currentEvents.map(event => {
                  const user = users.find(user => user.id === event.user.id);

                  return (
                    <div key={event.id} className="space-y-1.5">
                      <p className="line-clamp-2 text-sm font-semibold">{event.title}</p>

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
                          {format(parseISO(event.startDate), "hh:mm a")} - {format(parseISO(event.endDate), "hh:mm a")}
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
