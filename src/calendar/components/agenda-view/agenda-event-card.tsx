"use client";

import { format, parseISO } from "date-fns";
import { cva } from "class-variance-authority";
import { Clock, Text, User } from "lucide-react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { EventDetailsDialog } from "@/calendar/components/dialogs/event-details-dialog";

import type { IEvent } from "@/calendar/interfaces";
import type { VariantProps } from "class-variance-authority";

const agendaEventCardVariants = cva("flex select-none items-center justify-between gap-3 rounded-md border p-3 text-sm", {
  variants: {
    color: {
      // Colored variants
      blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&_.event-dot]:fill-blue-600",
      green: "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&_.event-dot]:fill-green-600",
      red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 [&_.event-dot]:fill-red-600",
      yellow: "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 [&_.event-dot]:fill-yellow-600",
      purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300 [&_.event-dot]:fill-purple-600",
      orange: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300 [&_.event-dot]:fill-orange-600",

      // Dot variants
      "blue-dot": "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-blue-600",
      "green-dot": "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-green-600",
      "red-dot": "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-red-600",
      "orange-dot": "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-orange-600",
      "purple-dot": "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-purple-600",
      "yellow-dot": "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-yellow-600",
    },
  },
  defaultVariants: {
    color: "blue-dot",
  },
});

interface IProps {
  event: IEvent;
  eventCurrentDay?: number;
  eventTotalDays?: number;
}

export function AgendaEventCard({ event, eventCurrentDay, eventTotalDays }: IProps) {
  const { badgeVariant } = useCalendar();

  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  const color = (badgeVariant === "dot" ? `${event.color}-dot` : event.color) as VariantProps<typeof agendaEventCardVariants>["color"];

  const agendaEventCardClasses = agendaEventCardVariants({ color });

  return (
    <EventDetailsDialog event={event}>
      <div role="button" tabIndex={0} className={agendaEventCardClasses}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            {["mixed", "dot"].includes(badgeVariant) && (
              <svg width="8" height="8" viewBox="0 0 8 8" className="event-dot shrink-0">
                <circle cx="4" cy="4" r="4" />
              </svg>
            )}

            <p className="font-medium">
              {eventCurrentDay && eventTotalDays && (
                <span className="mr-1 text-xs">
                  Day {eventCurrentDay} of {eventTotalDays} •{" "}
                </span>
              )}
              {event.title}
            </p>
          </div>

          <div className="mt-1 flex items-center gap-1">
            <User className="size-3" />
            <p className="text-xs text-t-tertiary">{event.user.name}</p>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="size-3" />

            <p className="text-xs text-t-tertiary">
              {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Text className="size-3" />
            <p className="text-xs text-t-tertiary">{event.description}</p>
          </div>
        </div>
      </div>
    </EventDetailsDialog>
  );
}
