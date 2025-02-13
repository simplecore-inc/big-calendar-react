import { ClientContainer } from "@/calendar/components/client-container";

import { getCalendarItems } from "@/calendar/requests";

import { USERS_MOCK } from "@/calendar/mocks";

export default async function Page() {
  const calendarItems = await getCalendarItems();
  return <ClientContainer calendarItems={calendarItems} users={USERS_MOCK} />;
}
