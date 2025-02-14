import Link from "next/link";
import { ChevronLeft, ChevronRight, Columns, Grid3X3, List } from "lucide-react";
import { formatDate, addDays, addMonths, addWeeks, subDays, subMonths, subWeeks } from "date-fns";

import { useCalendar } from "@/calendar/contexts/calendar-context";

import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button, ButtonGroup } from "@/components/ui/button";

import { formatMonthRange, formatWeekRange } from "@/utils/helpers/date.helper";

import type { ICalendarItem, IUser } from "@/calendar/interfaces";

interface IProps {
  view: "day" | "week" | "month";
  calendarItens: ICalendarItem[];
  users: IUser[];
}

export function CalendarHeader({ view, calendarItens, users }: IProps) {
  const { selectedDate, selectedUserId, setSelectedDate, setSelectedUserId } = useCalendar();

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
        setSelectedDate(subMonths(selectedDate, 1));
        break;
      case "week":
        setSelectedDate(subWeeks(selectedDate, 1));
        break;
      case "day":
        setSelectedDate(subDays(selectedDate, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case "month":
        setSelectedDate(addMonths(selectedDate, 1));
        break;
      case "week":
        setSelectedDate(addWeeks(selectedDate, 1));
        break;
      case "day":
        setSelectedDate(addDays(selectedDate, 1));
        break;
    }
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date());
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

          <Button asChild aria-label="View by week" className="hidden md:flex">
            <Link href="/week-view">
              <Columns />
            </Link>
          </Button>

          <Button asChild aria-label="View by month">
            <Link href="/month-view">
              <Grid3X3 />
            </Link>
          </Button>
        </ButtonGroup>

        <Select.Root value={selectedUserId} onValueChange={setSelectedUserId}>
          <Select.Trigger className="w-48">
            <Select.Value />
          </Select.Trigger>

          <Select.Content viewportClassName="w-64" align="end">
            <Select.Item value="all">
              <div className="flex items-center gap-1">
                <AvatarGroup max={2}>
                  {users.map(user => (
                    <Avatar.Root key={user.id} className="size-6 text-xxs">
                      <Avatar.Image src={user.picturePath ?? undefined} alt={user.name} />
                      <Avatar.Fallback className="text-xxs">{user.name[0]}</Avatar.Fallback>
                    </Avatar.Root>
                  ))}
                </AvatarGroup>
                All
              </div>
            </Select.Item>

            {users.map(user => (
              <Select.Item key={user.id} value={user.id} className="flex-1">
                <div className="flex items-center gap-2">
                  <Avatar.Root key={user.id} className="size-6">
                    <Avatar.Image src={user.picturePath ?? undefined} alt={user.name} />
                    <Avatar.Fallback className="text-xxs">{user.name[0]}</Avatar.Fallback>
                  </Avatar.Root>

                  <p className="truncate">{user.name}</p>
                </div>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
    </div>
  );
}
