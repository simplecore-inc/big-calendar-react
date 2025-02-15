import type { TEventColor } from "@/calendar/types";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
}

export interface IEvent {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  userId: IUser["id"];
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
