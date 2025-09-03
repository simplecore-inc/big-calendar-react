> [!IMPORTANT]
> This repository is a "Vite + React SPA" port and refinement of the original project. The table below highlights the key differences.
>
> | Area | Original (lramos33/big-calendar) | This repository |
> | --- | --- | --- |
> | Build/Runtime | Next.js 14 | Vite 5 + React 19 |
> | Routing | Next App Router (`src/app`) | TanStack Router (`src/routes`) |
> | State/Data | React Context | Zustand + TanStack Query |
> | Commands | `next dev/build/start` | Vite-based scripts + `vitest` |
> | Config files | `next.config.mjs` and Next-specific setup | `vite.config.ts`, `vitest.config.ts`, ESLint/Prettier updates |
>
> [!NOTE]
> Major changes
> - Removed `src/app/**`; rebuilt file-based routing under `src/routes/**`
> - Dropped Next.js dependency; switched to Vite build/preview (`vite`, `vite preview`)
> - Replaced React Context with Zustand + TanStack Query for state/data
> - Added testing/dev tooling: Vitest + Testing Library
> - Switched configuration: removed `next.config.mjs`; added Vite/Vitest configs and updated ESLint
>
> [!TIP]
> Next.js-specific guidance in the original README does not directly apply here. Use the Getting started and Project structure sections below, which are updated for Vite + TanStack Router.
>
> [!INFO]
> Original repository: https://github.com/lramos33/big-calendar (MIT License)


# Big Calendar

A feature-rich calendar application built with Vite, React, TypeScript, and Tailwind CSS. This project provides a modern, responsive interface for managing events and schedules with multiple viewing options.


## Preview

![image](public/preview_1.png)
![image](public/preview_2.png)
![image](public/preview_3.png)
![image](public/preview_4.png)
![image](public/preview_5.png)

## Features

- 📅 Multiple calendar views:

  - Agenda view
  - Year view
  - Month view
  - Week view with detailed time slots
  - Day view with hourly breakdown

- 🎨 Event customization:

  - Multiple color options for events
  - Three badge display variants (dot, colored and mixed)
  - Support for single and multi-day events

- 🔄 Drag and Drop:

  - Easily reschedule events by dragging and dropping
  - Move events between days in month view
  - Adjust event timing in week/day views
  - Visual feedback during dragging operations

- 👥 User management:

  - Filter events by user
  - View all users's events simultaneously
  - User avatars and profile integration

- ⚡ Real-time features:

  - Live time indicator
  - Current event highlighting
  - Dynamic event positioning

- ⏰ Time customization:

  - Configurable working hours with distinct styling
  - Adjustable visible hours range
  - Focus on relevant time periods

- 🎯 UI/UX features:
  - Responsive design for all screen sizes
  - Intuitive navigation between dates
  - Clean and modern interface
  - Dark mode support

## Tech stack

- **Build Tool**: Vite 5
- **Framework**: React 19
- **Language**: TypeScript
- **Routing**: TanStack Router
- **State Management**: Zustand + TanStack Query
- **Styling**: Tailwind CSS v3
- **Date Management**: date-fns
- **UI Components**: shadcn/ui + Radix UI
- **Drag & Drop**: react-dnd
- **Form Handling**: React Hook Form + Zod

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/simplecore-inc/big-calendar-react.git
cd calendar-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

The project structure is organized as follows:

```
src/
├── routes/                       # TanStack Router routes
│   ├── __root.tsx               # Root layout with providers
│   ├── index.tsx                # Home route (redirects to calendar)
│   └── calendar/                # Calendar routes
│       ├── month.tsx            # Month view route
│       ├── week.tsx             # Week view route
│       ├── day.tsx              # Day view route
│       ├── year.tsx             # Year view route
│       └── agenda.tsx           # Agenda view route
├── stores/                       # Zustand state management
│   ├── calendar-store.ts        # Calendar state (view, date, user selection)
│   └── theme-store.ts           # Theme state (dark/light mode)
├── hooks/                        # Custom hooks
│   ├── use-events.ts            # TanStack Query hooks for events
│   ├── use-users.ts             # TanStack Query hooks for users
│   └── use-disclosure.ts        # UI state management hook
├── calendar/                     # Calendar components and logic
│   ├── components/
│   │   ├── agenda-view/          # Agenda view components
│   │   ├── dialogs/              # Event dialogs (add/edit/details)
│   │   ├── dnd/                  # Drag and drop components
│   │   ├── header/               # Calendar header and navigation
│   │   ├── month-view/           # Month view components
│   │   ├── week-and-day-view/    # Week and day view components
│   │   └── year-view/            # Year view components
│   ├── helpers.ts                # Utility functions
│   ├── interfaces.ts             # TypeScript interfaces
│   ├── types.ts                  # TypeScript types
│   ├── schemas.ts                # Zod validation schemas
│   └── requests.ts               # API functions
├── components/                   # Shared components
│   ├── ui/                      # shadcn/ui components
│   └── layout/                  # Layout components
├── lib/                          # Utilities
│   ├── utils.ts                 # General utilities
│   ├── query-client.ts          # TanStack Query configuration
│   ├── navigation.ts            # Navigation utilities
│   └── performance.ts           # Performance monitoring
└── styles/                       # Styling
    ├── globals.css              # Global styles
    └── fonts.ts                 # Font configurations
```

## How to implement in your project

### Installation

1. Copy the required folders to your project:

```
src/calendar/         # Core calendar functionality
src/components/ui/    # UI components used by the calendar
src/hooks/            # Custom hooks for data fetching
src/stores/           # Zustand stores for state management
src/lib/              # Utility functions
```

2. Install the required dependencies:

```bash
npm install @tanstack/react-router @tanstack/react-query zustand
npm install react-dnd react-dnd-html5-backend date-fns
npm install react-hook-form @hookform/resolvers zod
npm install @radix-ui/react-dialog @radix-ui/react-select # ... other Radix UI components
```

### Basic setup

1. **Set up TanStack Query**

   Wrap your application with the QueryClient provider:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app content */}
    </QueryClientProvider>
  );
}
```

2. **Set up Zustand stores**

   The calendar uses Zustand for state management. The stores are automatically initialized when imported.

3. **Add a Calendar View**

   Use the `ClientContainer` to render the calendar:

```tsx
import { ClientContainer } from "@/calendar/components/client-container";

export default function CalendarPage() {
  return <ClientContainer />;
}
```

### Views configuration

The calendar supports five different views through routing. The view is determined by the current route:

- `/calendar/day` - Day view
- `/calendar/week` - Week view  
- `/calendar/month` - Month view
- `/calendar/year` - Year view
- `/calendar/agenda` - Agenda view

The `ClientContainer` automatically detects the current view from the router and renders the appropriate calendar view.

### Data structure

1. **Events Format**

   Events should follow this interface (you can modify it as you want, but the calendar will expect these fields):

```tsx
interface IEvent {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  color: "blue" | "green" | "red" | "yellow" | "purple" | "orange";
  user: {
    id: string;
    name: string;
  };
}
```

2. **Users format**

   Users should follow this interface (you can modify it as you want, but the calendar will expect these fields):

```tsx
interface IUser {
  id: string;
  name: string;
  picturePath?: string; // Optional avatar image
}
```

### Customizing the calendar

1. **Badge Variants**

   You can control the event display style with the `ChangeBadgeVariantInput` component:

```tsx
import { ChangeBadgeVariantInput } from "@/calendar/components/change-badge-variant-input";

// Place this anywhere in your project tree inside the CalendarProvider
<ChangeBadgeVariantInput />;
```

2. **Creating events**

   Implement your own event creation by modifying the `onSubmit` handler in the `AddEventDialog` component.

### Using the Calendar State

You can access and control the calendar state from any component using Zustand hooks:

```tsx
import { useCalendarDate, useCalendarUser, useCalendarPreferences } from "@/stores/calendar-store";
import { useEvents, useUsers } from "@/hooks/use-events";

function MyComponent() {
  // Calendar state
  const { selectedDate, setSelectedDate } = useCalendarDate();
  const { selectedUserId, setSelectedUserId } = useCalendarUser();
  const { badgeVariant, setBadgeVariant } = useCalendarPreferences();
  
  // Data fetching
  const { data: events } = useEvents();
  const { data: users } = useUsers();

  // Your component logic
}
```

### Example implementation

```tsx
// routes/calendar/month.tsx
import { createFileRoute } from '@tanstack/react-router';
import { ClientContainer } from "@/calendar/components/client-container";

export const Route = createFileRoute('/calendar/month')({
  component: MonthView,
});

function MonthView() {
  return <ClientContainer />;
}
```

```tsx
// components/layout/calendar-layout.tsx
import { ClientContainer } from "@/calendar/components/client-container";
import { ChangeBadgeVariantInput } from "@/calendar/components/change-badge-variant-input";

export function CalendarLayout({ children }) {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 p-4">
      {children}
      <ChangeBadgeVariantInput />
    </div>
  );
}
```