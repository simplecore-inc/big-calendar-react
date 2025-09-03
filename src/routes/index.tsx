import { createFileRoute, redirect } from '@tanstack/react-router'

// Index route that redirects to month view
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/calendar/month',
    })
  },
})