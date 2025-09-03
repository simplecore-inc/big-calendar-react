import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from '@/routeTree.gen'
import '@/styles/globals.css'

// Import performance monitoring
import { performanceMonitor } from '@/lib/performance'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Start performance monitoring
performanceMonitor.startMeasure('App Initialization');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// End performance monitoring after render
setTimeout(() => {
  performanceMonitor.endMeasure('App Initialization');
}, 0);