"use client";

import { createContext, useContext, useState } from "react";

import type { IUser } from "@/calendar/interfaces";

interface ICalendarContext {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedUserId: IUser["id"] | "all";
  setSelectedUserId: (userId: IUser["id"] | "all") => void;
  badgeVariant: "dot" | "colored";
  setBadgeVariant: (variant: "dot" | "colored") => void;
}

const CalendarContext = createContext({} as ICalendarContext);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [badgeVariant, setBadgeVariant] = useState<"dot" | "colored">("dot");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState<IUser["id"] | "all">("all");

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate, selectedUserId, setSelectedUserId, badgeVariant, setBadgeVariant }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context) throw new Error("useCalendar must be used within a CalendarProvider.");
  return context;
}
