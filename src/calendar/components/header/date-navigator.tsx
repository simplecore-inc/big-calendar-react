import { useMemo } from "react";
import { formatDate } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getEventsCount, navigateDate, formatMonthRange, formatWeekRange } from "@/calendar/utils/calendar.helper";

import type { TCalendarView } from "@/calendar/types";
import type { ICalendarItem } from "@/calendar/interfaces";

interface IProps {
  view: TCalendarView;
  calendarItens: ICalendarItem[];
}

export function DateNavigator({ view, calendarItens }: IProps) {
  const { selectedDate, setSelectedDate } = useCalendar();

  const dateInfo = useMemo(
    () => ({
      month: formatDate(selectedDate, "MMMM"),
      year: selectedDate.getFullYear(),
      rangeText: view === "month" ? formatMonthRange(selectedDate) : view === "week" ? formatWeekRange(selectedDate) : formatDate(selectedDate, "MMM d, yyyy"),
    }),
    [selectedDate, view]
  );

  // Memoize event count
  const eventCount = useMemo(() => getEventsCount(calendarItens, selectedDate, view), [calendarItens, selectedDate, view]);

  const handlePrevious = () => setSelectedDate(navigateDate(selectedDate, view, "previous"));
  const handleNext = () => setSelectedDate(navigateDate(selectedDate, view, "next"));

  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">
          {dateInfo.month} {dateInfo.year}
        </span>
        <Badge>{eventCount} events</Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handlePrevious}>
          <ChevronLeft />
        </Button>

        <p className="text-sm text-t-tertiary">{dateInfo.rangeText}</p>

        <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handleNext}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
