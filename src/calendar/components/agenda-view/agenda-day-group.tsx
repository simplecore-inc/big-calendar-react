import { format } from "date-fns";

import { Separator } from "@/components/ui/separator";
import { AgendaEventCard } from "@/calendar/components/agenda-view/agenda-event-card";

import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  date: Date;
  events: IEvent[];
  multiDayEvents: IEvent[];
}

export function AgendaDayGroup({ date, events, multiDayEvents }: IProps) {
  const sortedEvents = [...events].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <div className="space-y-4">
      <div className="sticky top-0 flex items-center gap-4 bg-bg-primary py-2">
        <p className="text-sm font-semibold">{format(date, "EEEE, MMMM d, yyyy")}</p>
        <Separator className="flex-1" />
      </div>

      <div className="space-y-2">
        {multiDayEvents.length > 0 &&
          multiDayEvents.map(event => {
            const startDate = new Date(event.startDate);
            const eventTotalDays = Math.ceil((new Date(event.endDate).getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            const eventCurrentDay = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            return <AgendaEventCard key={event.id} event={event} eventCurrentDay={eventCurrentDay} eventTotalDays={eventTotalDays} />;
          })}

        {sortedEvents.length > 0 && sortedEvents.map(event => <AgendaEventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}
