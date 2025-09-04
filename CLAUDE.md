# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start development server on port 3000
- `npm run dev:host` - Start dev server accessible on network
- `npm run dev:debug` - Start dev server with debug output

### Building & Testing
- `npm run build` - TypeScript compilation + Vite production build
- `npm run build:production` - Full production build with type checking and linting
- `npm run preview` - Serve production build locally
- `npm test` - Run tests in watch mode with Vitest
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate test coverage report

### Code Quality
- `npm run lint` - Run ESLint with TypeScript extensions
- `npm run lint:fix` - Auto-fix linting issues
- `npm run type-check` - TypeScript compilation check without build
- `npm run type-check:watch` - TypeScript check in watch mode
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without changes

## Architecture Overview

This is a **Vite + React 19** calendar application migrated from Next.js, using modern state management and routing patterns.

### Core Technologies & Patterns
- **Build System**: Vite 5 with TypeScript, optimized chunk splitting
- **Routing**: TanStack Router with file-based routes (`src/routes/`)
- **State Management**: Zustand with persistence + TanStack Query for server state
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Drag & Drop**: react-dnd with HTML5 backend
- **Internationalization**: react-i18next with browser language detection

### Project Structure Patterns

#### Route-Based Architecture
```
src/routes/
├── __root.tsx              # Root layout with providers
├── index.tsx               # Home (redirects to /calendar/month)
└── calendar/
    ├── month.tsx, week.tsx, day.tsx, year.tsx, agenda.tsx
```
- Each route renders `<ClientContainer />` which auto-detects view from URL
- Views are determined by pathname: `/calendar/month` → month view
- Error boundaries per route with i18n error messages

#### Calendar Component Architecture
```
src/calendar/
├── components/
│   ├── agenda-view/        # Agenda-specific components
│   ├── month-view/         # Month grid, day cells, event badges  
│   ├── week-and-day-view/  # Time slots, event blocks, multi-day events
│   ├── year-view/          # Year grid, mini month calendars
│   ├── header/             # Navigation, view switcher, user selector
│   ├── dialogs/            # Add/edit/details event modals
│   └── dnd/                # Drag & drop wrappers and logic
├── helpers.ts              # Date calculations, event positioning
├── types.ts, interfaces.ts # TypeScript definitions
└── requests.ts             # Mock API functions
```

#### State Management Strategy
- **Zustand Store** (`src/stores/calendar-store.ts`): View state, date selection, user preferences
  - Persists: `badgeVariant`, `workingHours`, `visibleHours`
  - Session: `selectedUserId`, `selectedDate`, `currentView`
- **TanStack Query** (`src/hooks/use-events.ts`, `src/hooks/use-users.ts`): Server state with caching
- **Route State**: Date/view parameters via TanStack Router search params

### Key Design Patterns

#### View Detection & Rendering
The `ClientContainer` component automatically detects the current calendar view from the route pathname and renders the appropriate view component. Views are controlled by routing rather than local state.

#### Event Data Flow
1. Events fetched via TanStack Query (`useEvents()`, `useCreateEvent()`, etc.)
2. Filtered by selected user in calendar header
3. Positioned and rendered by view-specific components
4. Drag & drop updates optimistically via mutations

#### Drag & Drop Architecture
- `DndProvider` wraps calendar views
- `DraggableEvent` components for event items
- `DroppableTimeBlock` and `DroppableDayCell` for drop zones
- `CustomDragLayer` provides visual feedback during dragging

#### Internationalization Implementation
- Language detection via browser settings with localStorage fallback
- Translation files: `src/i18n/locales/{en,ko}.json`
- Date formatting with locale-specific `date-fns` locales
- Language selector in header for runtime switching

### Component Conventions

#### Calendar Views
All calendar view components follow this pattern:
- Accept filtered events as props
- Use calendar store for preferences (working hours, visible hours, badge variant)
- Handle click events for event creation (pass date/time context)
- Implement view-specific drag & drop zones

#### Event Components
- `EventBadge` (month view): Compact event representation
- `EventBlock` (week/day view): Time-based event blocks with precise positioning
- `AgendaEventCard` (agenda view): Detailed event cards

#### Form Dialogs
Event dialogs use React Hook Form + Zod:
- `AddEventDialog`: Creates new events with start date/time context
- `EditEventDialog`: Updates existing events
- `EventDetailsDialog`: Read-only event information

### Performance Optimizations

#### Build Configuration
- Manual chunk splitting for optimal caching (vendor, router, query, ui, dnd, etc.)
- Tree shaking enabled with ES modules
- CSS code splitting and asset optimization
- Source maps in production for debugging

#### Runtime Optimizations
- Route-based code splitting with React.lazy
- TanStack Query caching with stale-while-revalidate
- Zustand persistence for user preferences
- Optimistic updates for drag & drop

### Development Patterns

#### Adding New Calendar Views
1. Create route file in `src/routes/calendar/[view].tsx`
2. Add view component in appropriate `src/calendar/components/[view]/`
3. Update `TCalendarView` type and view detection logic
4. Add translations for error messages and navigation

#### Extending Event Types
1. Update `IEvent` interface in `src/calendar/interfaces.ts`
2. Extend Zod schema in `src/calendar/schemas.ts`
3. Update form dialogs and validation
4. Modify event rendering components as needed

#### State Management Guidelines
- Use Zustand for UI state and user preferences
- Use TanStack Query for server state and caching  
- Prefer URL state for navigation-related data
- Keep component state minimal and localized

### Testing Strategy
- Vitest + Testing Library setup
- Component unit tests with mock data
- Integration tests for drag & drop interactions
- E2E testing for critical user flows

### Key Files to Understand
- `src/calendar/components/client-container.tsx` - Main calendar orchestrator
- `src/stores/calendar-store.ts` - Central state management
- `src/calendar/helpers.ts` - Core calendar calculations
- `src/routes/__root.tsx` - App providers and layout
- `vite.config.ts` - Build optimization and routing setup

## Cursor Rules Integration

### Language Requirements
- All program code, documentation, and comments must be written in English
- Never use emojis in code, logs, or documentation
- Variable names, function names, and class names must be in English
- Error messages and user-facing text should be handled through internationalization (i18n) system
- Commit messages must be in English
- Documentation files must be in English

### Code Style Guidelines
- Use clear, descriptive English variable and function names
- Avoid abbreviations unless they are widely accepted industry standards
- Write comprehensive comments in English explaining complex logic
- Use proper English grammar and punctuation in all comments and documentation

### Feature-Sliced Design (FSD) Architecture

#### Layer Structure
This project follows Feature-Sliced Design (FSD) architecture with the following layers:
- **app/**: Application layer (providers, layouts, global styles)
- **processes/**: Business processes (authentication, checkout)
- **pages/**: Page components
- **widgets/**: Complex UI components (header, sidebar)
- **features/**: Business features (auth, cart, search)
- **entities/**: Business entities (user, product, order)
- **shared/**: Shared code (ui, lib, config, types, assets)

#### Import Rules
- Upper layers can import from lower layers
- Lower layers cannot import from upper layers
- Import hierarchy: shared → entities → features → widgets → pages → processes → app
- Use barrel exports (index.ts) for clean imports

#### File Organization
- One slice per feature: Each feature should be self-contained
- Public API: Each slice should expose a public API through index.ts
- Vertical slicing: Related code should be grouped together
- Naming convention: kebab-case for directories, PascalCase for components

#### Feature Layer Structure
Each feature should be in its own directory: `src/features/[feature-name]/`
```
features/[feature-name]/
├── index.ts              # Public API
├── [Component].tsx       # Main component
├── model/               # Business logic, hooks, stores
├── ui/                  # Feature-specific UI components
└── lib/                 # Feature-specific utilities
```

### Responsive Design & Relative Values
- Prefer relative units (%, em, rem, vw, vh) over fixed units (px) whenever possible
- Components should adapt to different screen sizes and container widths
- Avoid fixed widths/heights unless absolutely necessary for specific UI requirements
- Utilize Tailwind responsive prefixes (sm:, md:, lg:, xl:) for different breakpoints
- Use container query classes when appropriate for component-based responsive design
- Very small fixed values (≤5px) for borders, separators, and micro-spacing are acceptable

### Naming Conventions
- **Directories**: kebab-case (e.g., `language-selection`, `user-management`)
- **Components**: PascalCase (e.g., `LanguageSelector`, `UserProfile`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTranslation`, `useAuth`)
- **Types**: PascalCase with descriptive names (e.g., `UserData`, `ApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_LANGUAGE`, `API_BASE_URL`)

### Documentation Guidelines
- Do not create new documentation files unless explicitly requested by the user
- Only maintain existing documentation when specifically asked to update it
- Focus on code implementation rather than comprehensive documentation writing
- Use inline comments for complex logic instead of separate documentation files

### Development Workflow

#### When adding new features:
1. Create a new directory in `src/features/[feature-name]/`
2. Implement the feature following the feature structure
3. Export the feature through its index.ts
4. Update any necessary shared types or utilities

#### When working with existing code:
1. Always check the layer hierarchy before adding imports
2. Maintain the existing patterns and conventions
3. Update documentation when changing public APIs

### Resources
- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [FSD Principles](https://feature-sliced.design/docs/principles)
- [Layer Hierarchy](https://feature-sliced.design/docs/guides/layers)