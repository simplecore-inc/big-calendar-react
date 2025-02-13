import type { ICalendarItem, IUser } from "@/calendar/interfaces";

export const USERS_MOCK: IUser[] = [
  {
    id: 1,
    name: "Michael Johnson",
    picturePath: null,
  },
  {
    id: 2,
    name: "Alice Johnson",
    picturePath: null,
  },
  {
    id: 3,
    name: "Robert Smith",
    picturePath: null,
  },
  {
    id: 4,
    name: "Emily Davis",
    picturePath: null,
  },
];

export const CALENDAR_ITENS_MOCK: ICalendarItem[] = [
  {
    id: 1,
    startDate: "2025-01-30T11:00:00.000Z",
    endDate: "2025-02-01T20:00:00.000Z",
    title: "Lorem Ipsum",
    color: "red",
    userId: 2,
  },
  {
    id: 2,
    startDate: "2025-01-31T15:00:00.000Z",
    endDate: "2025-01-31T16:10:00.000Z",
    title: "Random event",
    color: "green",
    userId: 1,
  },
];
