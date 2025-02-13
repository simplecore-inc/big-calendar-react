import type { TEventColor } from "@/calendar/types";

export interface IUser {
  id: number;
  name: string;
  picturePath: string | null;
}

export interface ICalendarItem {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  userId: IUser["id"];
}
