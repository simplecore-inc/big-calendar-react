import Link from "next/link";
import { Columns, Grid3X3, List } from "lucide-react";

import { Button, ButtonGroup } from "@/components/ui/button";

import { UserSelect } from "@/calendar/components/header/user-select";
import { TodayButton } from "@/calendar/components/header/today-button";
import { DateNavigator } from "@/calendar/components/header/date-navigator";

import type { TCalendarView } from "@/calendar/types";
import type { ICalendarItem } from "@/calendar/interfaces";

interface IProps {
  view: TCalendarView;
  calendarItens: ICalendarItem[];
}

export function CalendarHeader({ view, calendarItens }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} calendarItens={calendarItens} />
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

        <UserSelect />
      </div>
    </div>
  );
}
