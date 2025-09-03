import React from 'react'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

// Generic error fallback component
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="mb-4 max-w-md text-gray-600">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

// Query-specific error fallback
export function QueryErrorFallback({ 
  error, 
  resetErrorBoundary 
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center p-4">
      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold text-red-600">
          Failed to load data
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          {error.message || 'Unable to fetch data from server'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

// Custom Error Boundary class component
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Error logging is handled by the application's error tracking service
    // eslint-disable-next-line no-console
    console.error('Error boundary caught an error:', error, errorInfo)
    const { onError } = this.props
    onError?.(error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    const { hasError, error } = this.state
    const { fallback, children } = this.props
    
    if (hasError && error) {
      const Fallback = fallback || ErrorFallback
      return (
        <Fallback 
          error={error} 
          resetErrorBoundary={this.resetErrorBoundary}
        />
      )
    }

    return children
  }
}

// Query-specific error boundary
export function QueryErrorBoundary({ 
  children 
}: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={QueryErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}