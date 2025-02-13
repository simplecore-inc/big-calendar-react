"use client";

import { useMemo, useState } from "react";

import { CalendarHeader } from "@/calendar/components/calendar-header";

import type { ICalendarItem, IUser } from "@/calendar/interfaces";

interface IProps {
  calendarItems: ICalendarItem[];
  users: IUser[];
}

export function ClientContainer({ calendarItems, users }: IProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUserId, setSelectedUserId] = useState<IUser["id"] | "all">("all");

  const handleUserIdChange = (userId: IUser["id"] | "all") => {
    setSelectedUserId(userId);
  };

  const filteredCalendarItens = useMemo(() => {
    return calendarItems.filter(item => {
      const itemStartDate = new Date(item.startDate);
      const itemEndDate = new Date(item.endDate);

      const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

      const isInSelectedMonth = itemStartDate <= monthEnd && itemEndDate >= monthStart;
      const isUserMatch = selectedUserId === "all" || item.userId === selectedUserId;
      return isInSelectedMonth && isUserMatch;
    });
  }, [selectedDate, selectedUserId, calendarItems]);

  return (
    <div className="mx-auto max-w-screen-2xl px-8">
      <div className="rounded-xl border">
        <CalendarHeader
          view="month"
          calendarItens={filteredCalendarItens}
          users={users}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          selectedUserId={selectedUserId}
          onUserIdChange={handleUserIdChange}
        />

        <p className="p-4">{JSON.stringify(filteredCalendarItens, null, 2)}</p>
      </div>
    </div>
  );
}
