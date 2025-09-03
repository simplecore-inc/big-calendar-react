import { useNavigate } from '@tanstack/react-router'
import { format, isValid, parseISO } from 'date-fns'

// Calendar view types
export type TCalendarView = 'month' | 'week' | 'day' | 'year' | 'agenda'

// Navigation utilities
export class NavigationUtils {
  /**
   * Validates if a date string is valid
   */
  static isValidDateString(dateString: string): boolean {
    try {
      const date = parseISO(dateString)
      return isValid(date)
    } catch {
      return false
    }
  }

  /**
   * Validates if a view is valid
   */
  static isValidView(view: string): view is TCalendarView {
    return ['month', 'week', 'day', 'year', 'agenda'].includes(view)
  }

  /**
   * Formats a date for URL usage
   */
  static formatDateForUrl(date: Date): string {
    return format(date, 'yyyy-MM-dd')
  }

  /**
   * Parses a date from URL
   */
  static parseDateFromUrl(dateString: string): Date | null {
    if (!this.isValidDateString(dateString)) {
      return null
    }
    return parseISO(dateString)
  }

  /**
   * Gets the default date (today) formatted for URL
   */
  static getDefaultDate(): string {
    return this.formatDateForUrl(new Date())
  }
}

// Hook for programmatic navigation
export function useCalendarNavigation() {
  const navigate = useNavigate()

  const navigateToView = (
    view: TCalendarView,
    options?: {
      date?: Date | string
      userId?: string
      replace?: boolean
    }
  ) => {
    const dateParam = options?.date
      ? typeof options.date === 'string'
        ? options.date
        : NavigationUtils.formatDateForUrl(options.date)
      : undefined

    navigate({
      to: `/calendar/${view}`,
      search: {
        date: dateParam,
        userId: options?.userId,
      },
      replace: options?.replace,
    })
  }

  const navigateToDate = (date: Date, view?: TCalendarView) => {
    const currentPath = window.location.pathname
    const currentView = currentPath.split('/').pop() as TCalendarView
    const targetView = view || (NavigationUtils.isValidView(currentView) ? currentView : 'month')

    navigateToView(targetView, { date })
  }

  const navigateToToday = (view?: TCalendarView) => {
    navigateToDate(new Date(), view)
  }

  return {
    navigateToView,
    navigateToDate,
    navigateToToday,
  }
}