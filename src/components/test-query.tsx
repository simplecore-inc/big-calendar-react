import { useEvents } from '@/hooks/use-events'
import { useUsers } from '@/hooks/use-users'
import { EventsLoading } from '@/components/loading-states'
import { QueryErrorBoundary } from '@/components/error-boundary'

// Test component to verify TanStack Query setup
export function TestQuery() {
  const eventsQuery = useEvents()
  const usersQuery = useUsers()

  if (eventsQuery.isLoading || usersQuery.isLoading) {
    return <EventsLoading />
  }

  if (eventsQuery.isError) {
    return (
      <div className="p-4 text-red-600">
        Error loading events: {eventsQuery.error?.message}
      </div>
    )
  }

  if (usersQuery.isError) {
    return (
      <div className="p-4 text-red-600">
        Error loading users: {usersQuery.error?.message}
      </div>
    )
  }

  return (
    <QueryErrorBoundary>
      <div className="p-4">
        <h2 className="mb-4 text-xl font-bold">TanStack Query Test</h2>
        
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Events ({eventsQuery.data?.length || 0})</h3>
          {eventsQuery.data?.slice(0, 3).map(event => (
            <div key={event.id} className="mb-2 rounded border p-2">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-gray-600">{event.user.name}</div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Users ({usersQuery.data?.length || 0})</h3>
          {usersQuery.data?.map(user => (
            <div key={user.id} className="mb-2 rounded border p-2">
              <div className="font-medium">{user.name}</div>
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-500">
          <p>Events fetching: {eventsQuery.isFetching ? 'Yes' : 'No'}</p>
          <p>Users fetching: {usersQuery.isFetching ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </QueryErrorBoundary>
  )
}