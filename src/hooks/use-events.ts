import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Import existing types and API functions
import type { IEvent } from '@/calendar/interfaces'
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/calendar/requests'

// Query keys factory for better organization and type safety
export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...eventKeys.lists(), { filters }] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: number) => [...eventKeys.details(), id] as const,
}

// Query hooks with enhanced error handling and caching
export const useEvents = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: eventKeys.list(filters),
    queryFn: getEvents,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Retry up to 3 times for network errors, but not for 4xx errors
      if (failureCount >= 3) return false;
      if (error instanceof Error && error.message.includes('4')) return false;
      return true;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}

export const useEvent = (id: number) => {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => getEvents().then(events => events.find(event => event.id === id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  })
}
// Mutation hooks with optimistic updates and error handling
export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createEvent,
    onMutate: async (newEvent) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: eventKeys.all })

      // Snapshot all list queries matching events
      const previousLists = queryClient.getQueriesData<IEvent[]>({ queryKey: eventKeys.lists() })

      // Optimistically append a temporary event to each list
      const optimisticEvent: IEvent = {
        ...(newEvent as Omit<IEvent, 'id'>),
        id: Date.now(),
      }

      queryClient.setQueriesData<IEvent[]>({ queryKey: eventKeys.lists() }, (old) => {
        if (!old) return [optimisticEvent]
        return [...old, optimisticEvent]
      })

      return { previousLists, optimisticEvent }
    },
    onSuccess: (createdEvent, _variables, _context) => {
      // Persist created event in all lists without invalidating to mock source
      queryClient.setQueriesData<IEvent[]>({ queryKey: eventKeys.lists() }, (old) => {
        if (!old) return [createdEvent]
        const exists = old.some((e) => e.id === createdEvent.id)
        return exists ? old : [...old, createdEvent]
      })
    },
    onError: (_error, _newEvent, context) => {
      // Rollback optimistic updates on all lists
      if (context?.previousLists) {
        for (const [key, data] of context.previousLists) {
          queryClient.setQueryData(key, data)
        }
      }
    },
    onSettled: () => {
      // Do not invalidate to avoid resetting to static mocks
    },
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateEvent,
    onMutate: async (updatedEvent) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventKeys.all })
      await queryClient.cancelQueries({ queryKey: eventKeys.detail(updatedEvent.id) })

      // Snapshot the previous values for all list queries and the detail query
      const previousLists = queryClient.getQueriesData<IEvent[]>({ queryKey: eventKeys.lists() })
      const previousDetail = queryClient.getQueryData<IEvent | undefined>(eventKeys.detail(updatedEvent.id))

      // Optimistically update all list queries
      queryClient.setQueriesData<IEvent[]>({ queryKey: eventKeys.lists() }, (old) => {
        if (!old) return old
        return old.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
      })

      // Optimistically update the individual event
      queryClient.setQueryData(eventKeys.detail(updatedEvent.id), updatedEvent)

      return { previousLists, previousDetail }
    },
    onSuccess: (updatedEvent) => {
      // Ensure the detail cache is updated with the server response
      queryClient.setQueryData(eventKeys.detail(updatedEvent.id), updatedEvent)
      // Do not invalidate list queries here to avoid reverting to mock data
    },
    onError: (_error, updatedEvent, context) => {
      // Roll back the optimistic updates
      if (context?.previousLists) {
        for (const [key, data] of context.previousLists) {
          queryClient.setQueryData(key, data)
        }
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(eventKeys.detail(updatedEvent.id), context.previousDetail)
      }
      // Error is handled by the UI layer
    },
    onSettled: (updatedEvent) => {
      // Keep detail cache in sync; avoid invalidating lists to preserve optimistic UI with mocks
      if (updatedEvent) {
        queryClient.setQueryData(eventKeys.detail(updatedEvent.id), updatedEvent)
      }
    },
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteEvent,
    onMutate: async (eventId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventKeys.all })

      // Snapshot the previous value
      const previousEvents = queryClient.getQueryData(eventKeys.lists())

      // Optimistically remove the event from the list
      if (previousEvents) {
        queryClient.setQueryData(eventKeys.lists(), (old: IEvent[] | undefined) =>
          old ? old.filter(event => event.id !== eventId) : []
        )
      }

      return { previousEvents }
    },
    onSuccess: (_, deletedEventId) => {
      // Remove the event from individual cache and invalidate lists
      queryClient.removeQueries({ queryKey: eventKeys.detail(deletedEventId) })
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() })
    },
    onError: (_error, _deletedEventId, context) => {
      // Roll back the optimistic update
      if (context?.previousEvents) {
        queryClient.setQueryData(eventKeys.lists(), context.previousEvents)
      }
      // Error is handled by the UI layer
    },
    onSettled: () => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() })
    },
  })
}

// Utility hook for bulk operations
export const useBulkUpdateEvents = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (events: IEvent[]) => {
      // Process multiple updates in parallel
      const updatePromises = events.map(event => updateEvent(event))
      return Promise.all(updatePromises)
    },
    onSuccess: () => {
      // Invalidate all event-related queries after bulk update
      queryClient.invalidateQueries({ queryKey: eventKeys.all })
    },
    onError: (_error) => {
      // Error is handled by the UI layer
      // Invalidate to ensure data consistency after failed bulk operation
      queryClient.invalidateQueries({ queryKey: eventKeys.all })
    },
  })
}