import type { IEvent } from "@/calendar/interfaces";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarAgendaView({ singleDayEvents, multiDayEvents }: IProps) {
  return <div></div>;
}
