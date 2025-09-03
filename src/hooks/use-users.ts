import { useQuery } from '@tanstack/react-query'

// Import existing types and API functions
// Import types for users
import { getUsers } from '@/calendar/requests'

// Query keys factory for better organization and type safety
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

// Query hooks with enhanced error handling and caching
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
    staleTime: 15 * 60 * 1000, // 15 minutes (users change less frequently)
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      // Retry up to 2 times for network errors, but not for 4xx errors
      if (failureCount >= 2) return false;
      if (error instanceof Error && error.message.includes('4')) return false;
      return true;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    refetchOnWindowFocus: false, // Users don't change as frequently
    refetchOnReconnect: true,
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUsers().then(users => users.find(user => user.id === id)),
    enabled: !!id,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  })
}