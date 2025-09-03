import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { NavigationUtils } from '@/lib/navigation'
import { ClientContainer } from '@/calendar/components/client-container'

// Search params schema for year view
const yearSearchSchema = z.object({
  date: z.string().optional(),
  userId: z.string().optional(),
})

// Year view component
function YearView() {
  return <ClientContainer />
}

// Error component for year view
function YearViewError({ error }: { error: Error }) {
  return (
    <div className="p-4 text-center">
      <h2 className="mb-2 text-xl font-bold text-red-600">Year View Error</h2>
      <p className="mb-4 text-muted-foreground">{error.message}</p>
      <a 
        href="/calendar/year" 
        className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Go to Current Year
      </a>
    </div>
  )
}

// Create and export the year route
export const Route = createFileRoute('/calendar/year')({
  component: YearView,
  errorComponent: YearViewError,
  validateSearch: yearSearchSchema,
  beforeLoad: ({ search }) => {
    // Validate date parameter if provided
    if (search.date && !NavigationUtils.isValidDateString(search.date)) {
      throw redirect({
        to: '/calendar/year',
        search: {
          userId: search.userId,
        },
      })
    }
  },
})