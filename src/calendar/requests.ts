import { CALENDAR_ITENS_MOCK, USERS_MOCK } from "@/calendar/mocks";

export const getEvents = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return CALENDAR_ITENS_MOCK;
};

export const getUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return USERS_MOCK;
};
