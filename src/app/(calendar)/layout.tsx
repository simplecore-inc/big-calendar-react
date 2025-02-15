import { CalendarProvider } from "@/calendar/contexts/calendar-context";

import { ChangeBadgeVariant } from "@/calendar/components/change-badge-variant";

import { getCalendarItems, getUsers } from "@/calendar/requests";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const [calendarItems, users] = await Promise.all([getCalendarItems(), getUsers()]);

  return (
    <CalendarProvider users={users} calendarItems={calendarItems}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
        {children}
        <ChangeBadgeVariant />
      </div>
    </CalendarProvider>
  );
}
