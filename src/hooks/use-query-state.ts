import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query'

// Utility type for query state
export interface QueryState<T> {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  isSuccess: boolean
  isFetching: boolean
  refetch: () => void
}

// Utility type for mutation state
export interface MutationState<TData, TVariables> {
  mutate: (variables: TVariables) => void
  mutateAsync: (variables: TVariables) => Promise<TData>
  isLoading: boolean
  isError: boolean
  error: Error | null
  isSuccess: boolean
  data: TData | undefined
  reset: () => void
}

// Hook to extract common query state
export const useQueryState = <T>(query: UseQueryResult<T>): QueryState<T> => {
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    refetch: query.refetch,
  }
}

// Hook to extract common mutation state
export const useMutationState = <TData, TVariables>(
  mutation: UseMutationResult<TData, Error, TVariables>
): MutationState<TData, TVariables> => {
  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset,
  }
}

// Utility function to check if any queries are loading
export const useAnyLoading = (...queries: UseQueryResult<unknown>[]): boolean => {
  return queries.some(query => query.isLoading || query.isFetching)
}

// Utility function to check if any queries have errors
export const useAnyError = (...queries: UseQueryResult<unknown>[]): Error | null => {
  const errorQuery = queries.find(query => query.isError)
  return errorQuery?.error || null
}

// Utility function to combine multiple query states
export const useCombinedQueryState = <T extends Record<string, UseQueryResult<unknown>>>(
  queries: T
): {
  isLoading: boolean
  isError: boolean
  error: Error | null
  isSuccess: boolean
  data: { [K in keyof T]: T[K] extends UseQueryResult<infer U> ? U : never }
} => {
  const queryValues = Object.values(queries)
  const isLoading = queryValues.some(query => query.isLoading)
  const isError = queryValues.some(query => query.isError)
  const error = queryValues.find(query => query.isError)?.error || null
  const isSuccess = queryValues.every(query => query.isSuccess)

  const data = Object.keys(queries).reduce((acc, key) => {
    acc[key as keyof T] = queries[key as keyof T].data
    return acc
  }, {} as Record<keyof T, unknown>) as { [K in keyof T]: T[K] extends UseQueryResult<infer U> ? U : never }

  return {
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  }
}