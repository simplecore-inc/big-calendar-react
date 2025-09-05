import { formatDate } from "date-fns";
import { useTranslation } from "react-i18next";

import { useCalendarDate } from "@/stores/calendar-store";
import { getDateLocale } from "@/lib/date-locale";

export function TodayButton() {
  const { i18n } = useTranslation('calendar');
  const { setSelectedDate } = useCalendarDate();

  const today = new Date();
  const handleClick = () => setSelectedDate(today);

  const locale = getDateLocale(i18n.language);
  const monthAbbr = formatDate(today, "MMM", { locale }).toUpperCase();

  return (
    <button
      className="flex size-14 flex-col items-start overflow-hidden rounded-lg border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      onClick={handleClick}
    >
      <p className="flex h-6 w-full items-center justify-center bg-primary text-center text-xs font-semibold text-primary-foreground">{monthAbbr}</p>
      <p className="flex w-full items-center justify-center text-lg font-bold">{today.getDate()}</p>
    </button>
  );
}
