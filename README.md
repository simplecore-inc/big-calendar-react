> [!IMPORTANT]
> This repository is a "Vite + React SPA" port and refinement of the original project. The table below highlights the key differences.
>
> | Area | Original (lramos33/big-calendar) | This repository |
> | --- | --- | --- |
> | Build/Runtime | Next.js 14 | Vite 5 + React 19 |
> | Routing | Next App Router (`src/app`) | TanStack Router (`src/routes`) |
> | State/Data | React Context | Zustand + TanStack Query |
> | Internationalization | Not implemented | Full i18n/l10n support with react-i18next |
> | Language Support | English only | 25+ languages (EN, KO, JA, ZH, DE, FR, ES, etc.) |
> | Date/Time Formatting | Basic | Locale-aware formatting with date-fns |
> | Commands | `next dev/build/start` | Vite-based scripts + `vitest` |
> | Config files | `next.config.mjs` and Next-specific setup | `vite.config.ts`, `vitest.config.ts`, ESLint/Prettier updates |
>
> ### Major changes
> - Removed `src/app/**`; rebuilt file-based routing under `src/routes/**`
> - Dropped Next.js dependency; switched to Vite build/preview (`vite`, `vite preview`)
> - Replaced React Context with Zustand + TanStack Query for state/data
> - Added comprehensive internationalization (i18n) and localization (l10n) support:
>   - Integrated react-i18next with automatic browser language detection
>   - Added support for 25+ languages with proper locale-specific date/time formatting
>   - Implemented culturally appropriate date formats (e.g., `2025年9月` for Japanese, `2025년 9월` for Korean)
>   - Created complete translation files for English, Korean, and Japanese
>   - Added dynamic language switching with persistent user preferences
> - Added testing/dev tooling: Vitest + Testing Library
> - Switched configuration: removed `next.config.mjs`; added Vite/Vitest configs and updated ESLint
>
> ### Note
>
> - Next.js-specific guidance in the original README does not directly apply here. Use the Getting started and Project structure sections below, which are updated for Vite + TanStack Router.
> - Original repository: https://github.com/lramos33/big-calendar (MIT License)
>

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

- 🌐 Internationalization & Localization:
  - Multi-language support (English, Korean)
  - Auto-detection of browser language preference
  - Locale-specific date/time formatting
  - Dynamic language switching
  - Fully translated UI components and error messages

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
- **Internationalization**: react-i18next

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
│   ├── performance.ts           # Performance monitoring
│   ├── date-formats.ts          # Locale-specific date formatting
│   └── date-locale.ts           # Date-fns locale configuration
├── i18n/                         # Internationalization
│   ├── index.ts                 # i18next configuration
│   └── locales/                 # Translation files
│       ├── en.json              # English translations
│       └── ko.json              # Korean translations
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
npm install react-i18next i18next i18next-browser-languagedetector
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

### Internationalization (i18n)

The calendar includes built-in internationalization support with the following features:

1. **Language Detection**

   The application automatically detects the user's browser language preference:

```tsx
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ko'],
    // ... other config
  });
```

2. **Adding New Languages**

   To add a new language, create a translation file in `src/i18n/locales/`:

```json
// src/i18n/locales/es.json
{
  "calendar": {
    "views": {
      "month": "Mes",
      "week": "Semana",
      "day": "Día",
      "year": "Año",
      "agenda": "Agenda"
    },
    "navigation": {
      "today": "Hoy",
      "previous": "Anterior",
      "next": "Siguiente"
    }
    // ... more translations
  }
}
```

3. **Using Translations in Components**

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('calendar.title')}</h1>
      <button onClick={() => i18n.changeLanguage('ko')}>
        한국어
      </button>
    </div>
  );
}
```

4. **Date Localization**

   Dates are automatically formatted according to the selected locale:

```tsx
import { getDateLocale } from '@/lib/date-locale';
import { format } from 'date-fns';

const locale = getDateLocale(i18n.language);
const formattedDate = format(date, 'PP', { locale });
```

5. **Language Selector Component**

   The calendar includes a ready-to-use language selector:

```tsx
import { LanguageSelector } from '@/components/language-selector';

// Place this in your layout or header
<LanguageSelector />
```

### Localization Features

1. **Date and Time Formatting**
   - Locale-specific date formats (MM/DD/YYYY for English, YYYY-MM-DD for Korean)
   - Time formats (12-hour vs 24-hour clock)
   - Week start days (Sunday vs Monday)

2. **Number Formatting**
   - Decimal separators
   - Thousand separators
   - Currency formatting

3. **Text Direction**
   - RTL language support ready
   - Automatic text alignment based on language

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
import { LanguageSelector } from "@/components/language-selector";

export function CalendarLayout({ children }) {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1>Calendar</h1>
        <LanguageSelector />
      </div>
      {children}
      <ChangeBadgeVariantInput />
    </div>
  );
}
```