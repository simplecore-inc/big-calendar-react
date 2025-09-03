import React from "react";

// Generic loading spinner
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`} />;
}

// Full page loading state
export function PageLoading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Calendar-specific loading state
export function CalendarLoading() {
  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">Loading calendar...</p>
      </div>
    </div>
  );
}

// Events loading state
export function EventsLoading() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-2 text-sm text-gray-600">Loading events...</p>
      </div>
    </div>
  );
}

// Skeleton loading for event cards
export function EventCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-4 rounded bg-gray-200"></div>
      <div className="h-3 w-3/4 rounded bg-gray-200"></div>
    </div>
  );
}

// Skeleton loading for calendar grid
export function CalendarGridSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-7 gap-1">
      {Array.from({ length: 42 }, (_, i) => (
        <div key={i} className="h-24 rounded bg-gray-100"></div>
      ))}
    </div>
  );
}

// Inline loading state for buttons
export function ButtonLoading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size="sm" />
      {children}
    </div>
  );
}
