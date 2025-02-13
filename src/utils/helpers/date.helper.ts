import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from "date-fns";

export const formatMonthRange = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const formatString = "MMM d, yyyy";
  return `${format(start, formatString)} - ${format(end, formatString)}`;
};

export function formatWeekRange(date: Date) {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  const formatString = "MMM d, yyyy";
  return `${format(start, formatString)} - ${format(end, formatString)}`;
}
