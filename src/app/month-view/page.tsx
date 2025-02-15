import { ClientContainer } from "@/calendar/components/client-container";

import { getCalendarItems, getUsers } from "@/calendar/requests";

import { CalendarProvider } from "@/calendar/contexts/calendar-context";

export default async function Page() {
  const [calendarItems, users] = await Promise.all([getCalendarItems(), getUsers()]);

  return (
    <CalendarProvider users={users}>
      <ClientContainer view="month" calendarItems={calendarItems} users={users} />
    </CalendarProvider>
  );
}
