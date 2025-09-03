import { useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Import global styles
import "@/styles/globals.css"

// Import our providers and components
import { QueryProvider } from '@/components/query-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import { Header } from '@/components/layout/header'
import { CustomDragLayer } from '@/calendar/components/dnd/custom-drag-layer'

// Import fonts and utilities
import { inter } from "@/styles/fonts"
import { cn } from "@/lib/utils"

// Import theme store
import { useThemeStore } from '@/stores/theme-store'

// Root layout component
function RootComponent() {
  const { theme, applyTheme } = useThemeStore()

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  return (
    <QueryProvider>
      <ErrorBoundary>
        <DndProvider backend={HTML5Backend}>
          <div className={cn(inter.variable, "min-h-screen bg-background text-foreground")}>
            <Header />
            <main>
              <Outlet />
            </main>
          </div>
          <CustomDragLayer />
        </DndProvider>
      </ErrorBoundary>
    </QueryProvider>
  )
}

// Error boundary component for route-level error handling
function RootErrorComponent({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h1>
        <p className="mb-4 text-muted-foreground">{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

// Create and export the root route
export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: RootErrorComponent,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Page Not Found</h1>
        <p className="mb-4 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a 
          href="/" 
          className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Go Home
        </a>
      </div>
    </div>
  ),
})