import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { useCalendarDate } from "@/stores/calendar-store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getEventsCount, navigateDate, rangeText } from "@/calendar/helpers";
import { getDateLocale } from "@/lib/date-locale";
import { formatDate } from "@/lib/date-formats";

import type { IEvent } from "@/calendar/interfaces";
import type { TCalendarView } from "@/calendar/types";

interface IProps {
  events: IEvent[];
}

export function DateNavigator({ events }: IProps) {
  const location = useLocation();
  const { selectedDate, setSelectedDate } = useCalendarDate();
  const { t, i18n } = useTranslation();
  const locale = getDateLocale(i18n.language);

  // Extract view from router path
  const view = useMemo(() => {
    const pathSegments = location.pathname.split("/");
    const viewSegment = pathSegments[pathSegments.length - 1];

    // Validate that it's a valid calendar view
    const validViews: TCalendarView[] = ["month", "week", "day", "year", "agenda"];
    if (validViews.includes(viewSegment as TCalendarView)) {
      return viewSegment as TCalendarView;
    }

    // Default to month view if invalid
    return "month" as TCalendarView;
  }, [location.pathname]);

  const monthYearDisplay = formatDate(selectedDate, "monthYear", i18n.language, locale);

  const eventCount = useMemo(() => getEventsCount(events, selectedDate, view), [events, selectedDate, view]);

  const handlePrevious = () => setSelectedDate(navigateDate(selectedDate, view, "previous"));
  const handleNext = () => setSelectedDate(navigateDate(selectedDate, view, "next"));

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">{monthYearDisplay}</span>
        <Badge variant="outline" className="px-1.5">
          {t("calendar.events.eventCount", { count: eventCount })}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handlePrevious}>
          <ChevronLeft />
        </Button>

        <p className="text-sm text-muted-foreground">{rangeText(view, selectedDate)}</p>

        <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handleNext}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
