import Link from "next/link";
import { ChevronLeft, ChevronRight, Columns, Grid3X3, List } from "lucide-react";
import { formatDate, addDays, addMonths, addWeeks, subDays, subMonths, subWeeks } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button, ButtonGroup } from "@/components/ui/button";

import { formatMonthRange, formatWeekRange } from "@/utils/helpers/date.helper";

import type { ICalendarItem } from "@/calendar/interfaces";

interface IProps {
  view: "day" | "week" | "month";
  calendarItens: ICalendarItem[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function CalendarHeader({ view, selectedDate, calendarItens, onDateChange }: IProps) {
  const selectedMonth = formatDate(selectedDate, "MMMM");
  const selectedYear = selectedDate.getFullYear();

  const getDateRangeText = () => {
    switch (view) {
      case "month":
        return formatMonthRange(selectedDate);
      case "week":
        return formatWeekRange(selectedDate);
      case "day":
        return formatDate(selectedDate, "MMM d, yyyy");
    }
  };

  const handlePrevious = () => {
    switch (view) {
      case "month":
        onDateChange(subMonths(selectedDate, 1));
        break;
      case "week":
        onDateChange(subWeeks(selectedDate, 1));
        break;
      case "day":
        onDateChange(subDays(selectedDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case "month":
        onDateChange(addMonths(selectedDate, 1));
        break;
      case "week":
        onDateChange(addWeeks(selectedDate, 1));
        break;
      case "day":
        onDateChange(addDays(selectedDate, 1));
        break;
    }
  };

  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button className="flex size-14 flex-col items-start overflow-hidden rounded-lg border" onClick={handleTodayClick}>
          <p className="flex h-6 w-full items-center justify-center bg-primary-600 text-center text-xs font-semibold text-white">
            {formatDate(new Date(), "MMM").toUpperCase()}
          </p>
          <p className="flex w-full items-center justify-center text-lg font-bold">{new Date().getDate()}</p>
        </button>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              {selectedMonth} {selectedYear}
            </span>

            <Badge>{calendarItens.length} events</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handlePrevious}>
              <ChevronLeft />
            </Button>

            <p className="text-sm text-t-tertiary">{getDateRangeText()}</p>

            <Button variant="outline" className="size-6.5 px-0 [&_svg]:size-4.5" onClick={handleNext}>
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1.5">
        <ButtonGroup>
          <Button asChild aria-label="View by day">
            <Link href="/day-view">
              <List />
            </Link>
          </Button>

          <Button aria-label="View by week" className="hidden md:flex">
            <Link href="/week-view">
              <Columns />
            </Link>
          </Button>

          <Button aria-label="View by month">
            <Link href="/month-view">
              <Grid3X3 />
            </Link>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
