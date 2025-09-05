import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { NavigationUtils } from "@/lib/navigation";
import { ClientContainer } from "@/calendar/components/client-container";

// Search params schema for week view
const weekSearchSchema = z.object({
  date: z.string().optional(),
  userId: z.string().optional(),
});

// Week view component
function WeekView() {
  return <ClientContainer />;
}

// Error component for week view
function WeekViewError({ error }: { error: Error }) {
  const { t } = useTranslation('calendar');

  return (
    <div className="p-4 text-center">
      <h2 className="mb-2 text-xl font-bold text-red-600">{t("errors.weekViewError")}</h2>
      <p className="mb-4 text-muted-foreground">{error.message}</p>
      <a href="/calendar/week" className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
        {t("navigation.goToCurrentWeek")}
      </a>
    </div>
  );
}

// Create and export the week route
export const Route = createFileRoute("/calendar/week")({
  component: WeekView,
  errorComponent: WeekViewError,
  validateSearch: weekSearchSchema,
  beforeLoad: ({ search }) => {
    // Validate date parameter if provided
    if (search.date && !NavigationUtils.isValidDateString(search.date)) {
      throw redirect({
        to: "/calendar/week",
        search: {
          userId: search.userId,
        },
      });
    }
  },
});
