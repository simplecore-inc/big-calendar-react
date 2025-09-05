import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { NavigationUtils } from "@/lib/navigation";
import { ClientContainer } from "@/calendar/components/client-container";

// Search params schema for month view
const monthSearchSchema = z.object({
  date: z.string().optional(),
  userId: z.string().optional(),
});

// Month view component
function MonthView() {
  return <ClientContainer />;
}

// Error component for month view
function MonthViewError({ error }: { error: Error }) {
  const { t } = useTranslation('calendar');

  return (
    <div className="p-4 text-center">
      <h2 className="mb-2 text-xl font-bold text-red-600">{t("errors.monthViewError")}</h2>
      <p className="mb-4 text-muted-foreground">{error.message}</p>
      <a href="/calendar/month" className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
        {t("navigation.goToCurrentMonth")}
      </a>
    </div>
  );
}

// Create and export the month route
export const Route = createFileRoute("/calendar/month")({
  component: MonthView,
  errorComponent: MonthViewError,
  validateSearch: monthSearchSchema,
  beforeLoad: ({ search }) => {
    // Validate date parameter if provided
    if (search.date && !NavigationUtils.isValidDateString(search.date)) {
      throw redirect({
        to: "/calendar/month",
        search: {
          userId: search.userId,
        },
      });
    }
  },
});
