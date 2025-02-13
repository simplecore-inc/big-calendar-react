import { CALENDAR_ITENS_MOCK } from "@/calendar/mocks";

export const getCalendarItems = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return CALENDAR_ITENS_MOCK;
};
