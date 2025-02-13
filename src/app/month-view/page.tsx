"use client";

import { useState } from "react";

import { CalendarHeader } from "@/calendar/components/calendar-header";

import { CALENDAR_ITENS_MOCK } from "@/calendar/mocks";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="mx-auto max-w-screen-2xl border border-red-500 px-8">
      <CalendarHeader view="month" selectedDate={selectedDate} calendarItens={CALENDAR_ITENS_MOCK} onDateChange={setSelectedDate} />
    </div>
  );
}
