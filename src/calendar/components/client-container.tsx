import { useMemo, Suspense, lazy } from "react";
import { isSameDay, parseISO } from "date-fns";
import { useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useCalendarStore } from "@/stores/calendar-store";
import { useEvents } from "@/hooks/use-events";
import { CalendarHeader } from "@/calendar/components/header/calendar-header";
import type { TCalendarView } from "@/calendar/types";

// Lazy load calendar view components for better code splitting
const CalendarMonthView = lazy(() =>
  import("@/calendar/components/month-view/calendar-month-view").then(module => ({
    default: module.CalendarMonthView,
  }))
);

const CalendarWeekView = lazy(() =>
  import("@/calendar/components/week-and-day-view/calendar-week-view").then(module => ({
    default: module.CalendarWeekView,
  }))
);

const CalendarDayView = lazy(() =>
  import("@/calendar/components/week-and-day-view/calendar-day-view").then(module => ({
    default: module.CalendarDayView,
  }))
);

const CalendarYearView = lazy(() =>
  import("@/calendar/components/year-view/calendar-year-view").then(module => ({
    default: module.CalendarYearView,
  }))
);

const CalendarAgendaView = lazy(() =>
  import("@/calendar/components/agenda-view/calendar-agenda-view").then(module => ({
    default: module.CalendarAgendaView,
  }))
);

// Loading fallback component for lazy-loaded views
function ViewLoadingFallback() {
  const { t } = useTranslation("calendar");
  return (
    <div className="p-8 text-center">
      <div className="mx-auto size-6 animate-spin rounded-full border-b-2 border-primary"></div>
      <p className="mt-2 text-sm text-muted-foreground">{t("common.loading")}</p>
    </div>
  );
}

export function ClientContainer() {
  const location = useLocation();

  // Use individual selectors to avoid object recreation
  const selectedDate = useCalendarStore(state => state.selectedDate);
  const selectedUserId = useCalendarStore(state => state.selectedUserId);
  const { data: events = [], isLoading, error } = useEvents();

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

  // Filter events based on view and user selection
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventStartDate = parseISO(event.startDate);
      const eventEndDate = parseISO(event.endDate);
      const isUserMatch = selectedUserId === "all" || event.user.id === selectedUserId;

      if (view === "month") {
        const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59, 999);
        const isInSelectedMonth = eventStartDate <= monthEnd && eventEndDate >= monthStart;
        return isInSelectedMonth && isUserMatch;
      }

      if (view === "week") {
        const weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const isInSelectedWeek = eventStartDate <= weekEnd && eventEndDate >= weekStart;
        return isInSelectedWeek && isUserMatch;
      }

      if (view === "day") {
        const dayStart = new Date(selectedDate);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(selectedDate);
        dayEnd.setHours(23, 59, 59, 999);

        const isInSelectedDay = eventStartDate <= dayEnd && eventEndDate >= dayStart;
        return isInSelectedDay && isUserMatch;
      }

      if (view === "year") {
        const yearStart = new Date(selectedDate.getFullYear(), 0, 1);
        const yearEnd = new Date(selectedDate.getFullYear(), 11, 31, 23, 59, 59, 999);

        const isInSelectedYear = eventStartDate <= yearEnd && eventEndDate >= yearStart;
        return isInSelectedYear && isUserMatch;
      }

      if (view === "agenda") {
        // For agenda view, show events from the selected month
        const monthStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const monthEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0, 23, 59, 59, 999);
        const isInSelectedMonth = eventStartDate <= monthEnd && eventEndDate >= monthStart;
        return isInSelectedMonth && isUserMatch;
      }

      // For other views, return false
      return false;
    });
  }, [selectedDate, selectedUserId, events, view]);

  const singleDayEvents = useMemo(() => {
    return filteredEvents.filter(event => {
      const startDate = parseISO(event.startDate);
      const endDate = parseISO(event.endDate);
      return isSameDay(startDate, endDate);
    });
  }, [filteredEvents]);

  const multiDayEvents = useMemo(() => {
    return filteredEvents.filter(event => {
      const startDate = parseISO(event.startDate);
      const endDate = parseISO(event.endDate);
      return !isSameDay(startDate, endDate);
    });
  }, [filteredEvents]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border">
        <div className="p-8 text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading events...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border">
        <div className="p-8 text-center">
          <p className="mb-2 text-red-600">Failed to load events</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <CalendarHeader events={filteredEvents} />

      <Suspense fallback={<ViewLoadingFallback />}>
        {view === "month" && <CalendarMonthView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />}
        {view === "week" && <CalendarWeekView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />}
        {view === "day" && <CalendarDayView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />}
        {view === "year" && <CalendarYearView allEvents={filteredEvents} />}
        {view === "agenda" && <CalendarAgendaView singleDayEvents={singleDayEvents} multiDayEvents={multiDayEvents} />}
        {!["month", "week", "day", "year", "agenda"].includes(view) && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">View &quot;{view}&quot; is not implemented yet.</p>
            <p className="text-sm text-muted-foreground">Available views: Month, Week, Day, Year, Agenda</p>
          </div>
        )}
      </Suspense>
    </div>
  );
}
