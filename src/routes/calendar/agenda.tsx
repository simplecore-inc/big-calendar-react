import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'
import { NavigationUtils } from '@/lib/navigation'
import { ClientContainer } from '@/calendar/components/client-container'

// Search params schema for agenda view
const agendaSearchSchema = z.object({
  date: z.string().optional(),
  userId: z.string().optional(),
})

// Agenda view component
function AgendaView() {
  return <ClientContainer />
}

// Error component for agenda view
function AgendaViewError({ error }: { error: Error }) {
  return (
    <div className="p-4 text-center">
      <h2 className="mb-2 text-xl font-bold text-red-600">Agenda View Error</h2>
      <p className="mb-4 text-muted-foreground">{error.message}</p>
      <a 
        href="/calendar/agenda" 
        className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Go to Current Agenda
      </a>
    </div>
  )
}

// Create and export the agenda route
export const Route = createFileRoute('/calendar/agenda')({
  component: AgendaView,
  errorComponent: AgendaViewError,
  validateSearch: agendaSearchSchema,
  beforeLoad: ({ search }) => {
    // Validate date parameter if provided
    if (search.date && !NavigationUtils.isValidDateString(search.date)) {
      throw redirect({
        to: '/calendar/agenda',
        search: {
          userId: search.userId,
        },
      })
    }
  },
})