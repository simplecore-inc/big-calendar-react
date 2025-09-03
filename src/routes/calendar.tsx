import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { NavigationUtils } from '@/lib/navigation'
import { CalendarLayout as CalendarLayoutComponent } from '@/components/layout/calendar-layout'

// Search params schema for date navigation
const calendarSearchSchema = z.object({
  date: z.string().optional(),
  userId: z.string().optional(),
})

// Calendar layout component
function CalendarLayout() {
  return (
    <CalendarLayoutComponent>
      <Outlet />
    </CalendarLayoutComponent>
  )
}

// Create and export the calendar route
export const Route = createFileRoute('/calendar')({
  component: CalendarLayout,
  validateSearch: calendarSearchSchema,
  beforeLoad: ({ search }) => {
    // Validate date parameter if provided
    if (search.date && !NavigationUtils.isValidDateString(search.date)) {
      throw redirect({
        to: '/calendar/month',
        search: {
          userId: search.userId,
        },
      })
    }
  },
})