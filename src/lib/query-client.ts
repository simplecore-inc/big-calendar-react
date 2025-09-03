import { QueryClient } from '@tanstack/react-query'

// Global error handler for queries
const handleQueryError = (_error: Error) => {
  // Error logging is handled by the application's error boundary
  // You can add additional error handling here:
  // - Send to error reporting service (e.g., Sentry)
  // - Show toast notifications
  // - Log to analytics
}

// Create and configure QueryClient with appropriate defaults
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query defaults
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof Error && error.message.includes('4')) {
          return false
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Global mutation defaults
      retry: (failureCount, error) => {
        // Don't retry mutations on 4xx errors
        if (error instanceof Error && error.message.includes('4')) {
          return false
        }
        // Retry once for network errors
        return failureCount < 1
      },
      retryDelay: 1000,
      onError: handleQueryError,
    },
  },
})

// Development-only query client configuration
if (import.meta.env.DEV) {
  // Enable more verbose logging in development
  queryClient.setDefaultOptions({
    queries: {
      ...queryClient.getDefaultOptions().queries,
      // Shorter stale time in development for better testing
      staleTime: 1 * 60 * 1000, // 1 minute
    },
  })
}