import { 
  useCalendarStore, 
  useCalendarDate, 
  useCalendarUser, 
  useCalendarPreferences,
  useCalendarEvents 
} from '@/stores/calendar-store'
import { useThemeStore } from '@/stores/theme-store'
import { useEvents } from '@/hooks/use-events'
import { useUsers } from '@/hooks/use-users'
import { Button } from '@/components/ui/button'

export function TestIntegration() {
  // Test main calendar store
  const { currentView, setCurrentView } = useCalendarStore()
  
  // Test specific store hooks
  const { selectedDate, setSelectedDate } = useCalendarDate()
  const { selectedUserId, setSelectedUserId } = useCalendarUser()
  const { badgeVariant, setBadgeVariant } = useCalendarPreferences()
  const { events: storeEvents, setEvents } = useCalendarEvents()
  
  // Test theme store
  const { theme, toggleTheme } = useThemeStore()
  
  // Test TanStack Query hooks
  const { data: events, isLoading: eventsLoading, error: eventsError } = useEvents()
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers()

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Integration Test</h2>
      
      {/* Test Zustand Calendar Store */}
      <div className="rounded border p-4">
        <h3 className="text-lg font-semibold">Calendar Store (Zustand)</h3>
        <div className="space-y-2">
          <div>
            <p>Current View: {currentView}</p>
            <div className="mt-2 flex gap-2">
              <Button onClick={() => setCurrentView('month')} variant={currentView === 'month' ? 'default' : 'outline'}>
                Month
              </Button>
              <Button onClick={() => setCurrentView('week')} variant={currentView === 'week' ? 'default' : 'outline'}>
                Week
              </Button>
              <Button onClick={() => setCurrentView('day')} variant={currentView === 'day' ? 'default' : 'outline'}>
                Day
              </Button>
            </div>
          </div>
          
          <div>
            <p>Selected Date: {selectedDate.toDateString()}</p>
            <Button onClick={() => setSelectedDate(new Date())} variant="outline" className="mt-1">
              Set Today
            </Button>
          </div>
          
          <div>
            <p>Selected User: {selectedUserId}</p>
            <Button onClick={() => setSelectedUserId(selectedUserId === 'all' ? 'user-1' : 'all')} variant="outline" className="mt-1">
              Toggle User Selection
            </Button>
          </div>
          
          <div>
            <p>Badge Variant: {badgeVariant}</p>
            <Button onClick={() => setBadgeVariant(badgeVariant === 'colored' ? 'dot' : 'colored')} variant="outline" className="mt-1">
              Toggle Badge Variant
            </Button>
          </div>
          
          <div>
            <p>Store Events: {storeEvents.length}</p>
            <Button onClick={() => setEvents([])} variant="outline" className="mt-1">
              Clear Store Events
            </Button>
          </div>
        </div>
      </div>

      {/* Test Zustand Theme Store */}
      <div className="rounded border p-4">
        <h3 className="text-lg font-semibold">Theme Store (Zustand)</h3>
        <p>Current Theme: {theme}</p>
        <Button onClick={toggleTheme} className="mt-2">
          Toggle Theme
        </Button>
      </div>

      {/* Test TanStack Query */}
      <div className="rounded border p-4">
        <h3 className="text-lg font-semibold">Data Fetching (TanStack Query)</h3>
        
        <div className="mt-2">
          <h4 className="font-medium">Events:</h4>
          {eventsLoading && <p>Loading events...</p>}
          {eventsError && <p className="text-red-500">Error loading events: {eventsError.message}</p>}
          {events && <p className="text-green-500">✓ Events loaded successfully ({events.length} events)</p>}
        </div>

        <div className="mt-2">
          <h4 className="font-medium">Users:</h4>
          {usersLoading && <p>Loading users...</p>}
          {usersError && <p className="text-red-500">Error loading users: {usersError.message}</p>}
          {users && <p className="text-green-500">✓ Users loaded successfully ({users.length} users)</p>}
        </div>
      </div>

      {/* Test UI Components */}
      <div className="rounded border p-4">
        <h3 className="text-lg font-semibold">UI Components (Radix UI + Tailwind)</h3>
        <div className="mt-2 flex gap-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
    </div>
  )
}