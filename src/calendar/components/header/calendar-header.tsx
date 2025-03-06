import Link from "next/link";
import { Columns, Grid3X3, List, Plus } from "lucide-react";

import { Button, ButtonGroup } from "@/components/ui/button";

import { UserSelect } from "@/calendar/components/header/user-select";
import { TodayButton } from "@/calendar/components/header/today-button";
import { DateNavigator } from "@/calendar/components/header/date-navigator";
import { AddEventDialog } from "@/calendar/components/dialogs/add-event-dialog";

import type { IEvent } from "@/calendar/interfaces";
import type { TCalendarView } from "@/calendar/types";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
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

        <div className="flex items-center gap-1.5">
          <UserSelect />

          <AddEventDialog>
            <Button size="sm">
              <Plus />
              Add Event
            </Button>
          </AddEventDialog>
        </div>
      </div>
    </div>
  );
}
