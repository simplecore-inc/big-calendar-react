import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { NavigationUtils } from "@/lib/navigation";
import { ClientContainer } from "@/calendar/components/client-container";

// Search params schema for day view
const daySearchSchema = z.object({
  date: z.string().optional(),
  userId: z.string().optional(),
});

// Day view component
function DayView() {
  return <ClientContainer />;
}

// Error component for day view
function DayViewError({ error }: { error: Error }) {
  const { t } = useTranslation('calendar');

  return (
    <div className="p-4 text-center">
      <h2 className="mb-2 text-xl font-bold text-red-600">{t("errors.dayViewError")}</h2>
      <p className="mb-4 text-muted-foreground">{error.message}</p>
      <a href="/calendar/day" className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
        {t("navigation.goToToday")}
      </a>
    </div>
  );
}

// Create and export the day route
export const Route = createFileRoute("/calendar/day")({
  component: DayView,
  errorComponent: DayViewError,
  validateSearch: daySearchSchema,
  beforeLoad: ({ search }) => {
    // Validate date parameter if provided
    if (search.date && !NavigationUtils.isValidDateString(search.date)) {
      throw redirect({
        to: "/calendar/day",
        search: {
          userId: search.userId,
        },
      });
    }
  },
});
