import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { IUser, IEvent } from '@/calendar/interfaces';
import type { TCalendarView, TBadgeVariant, TVisibleHours, TWorkingHours } from '@/calendar/types';

// Default values
const DEFAULT_WORKING_HOURS: TWorkingHours = {
  0: { from: 0, to: 0 },
  1: { from: 8, to: 17 },
  2: { from: 8, to: 17 },
  3: { from: 8, to: 17 },
  4: { from: 8, to: 17 },
  5: { from: 8, to: 17 },
  6: { from: 8, to: 12 },
};

const DEFAULT_VISIBLE_HOURS: TVisibleHours = { from: 7, to: 18 };

interface CalendarState {
  // View state
  currentView: TCalendarView;
  setCurrentView: (view: TCalendarView) => void;
  
  // Date state
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  
  // User selection
  selectedUserId: IUser['id'] | 'all';
  setSelectedUserId: (userId: IUser['id'] | 'all') => void;
  
  // UI preferences (persisted)
  badgeVariant: TBadgeVariant;
  setBadgeVariant: (variant: TBadgeVariant) => void;
  
  // Time settings (persisted)
  workingHours: TWorkingHours;
  setWorkingHours: (hours: TWorkingHours) => void;
  visibleHours: TVisibleHours;
  setVisibleHours: (hours: TVisibleHours) => void;
  
  // Data state (not persisted)
  users: IUser[];
  setUsers: (users: IUser[]) => void;
  events: IEvent[];
  setEvents: (events: IEvent[]) => void;
  
  // Actions
  reset: () => void;
}

// Create the store with persistence for user preferences
export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, _get) => ({
      // View state (not persisted - should be controlled by router)
      currentView: 'month',
      setCurrentView: (view) => set({ currentView: view }),
      
      // Date state (not persisted - should be controlled by router)
      selectedDate: new Date(),
      setSelectedDate: (date) => set({ selectedDate: date }),
      
      // User selection (not persisted - session state)
      selectedUserId: 'all',
      setSelectedUserId: (userId) => set({ selectedUserId: userId }),
      
      // UI preferences (persisted)
      badgeVariant: 'colored',
      setBadgeVariant: (variant) => set({ badgeVariant: variant }),
      
      // Time settings (persisted)
      workingHours: DEFAULT_WORKING_HOURS,
      setWorkingHours: (hours) => set({ workingHours: hours }),
      visibleHours: DEFAULT_VISIBLE_HOURS,
      setVisibleHours: (hours) => set({ visibleHours: hours }),
      
      // Data state (not persisted)
      users: [],
      setUsers: (users) => set({ users }),
      events: [],
      setEvents: (events) => set({ events }),
      
      // Actions
      reset: () => set({
        currentView: 'month',
        selectedDate: new Date(),
        selectedUserId: 'all',
        badgeVariant: 'colored',
        workingHours: DEFAULT_WORKING_HOURS,
        visibleHours: DEFAULT_VISIBLE_HOURS,
        users: [],
        events: [],
      }),
    }),
    {
      name: 'calendar-preferences',
      storage: createJSONStorage(() => localStorage),
      // Only persist user preferences, not session state or data
      partialize: (state) => ({
        badgeVariant: state.badgeVariant,
        workingHours: state.workingHours,
        visibleHours: state.visibleHours,
      }),
    }
  )
);

// Convenience hooks for specific parts of the store
export const useCalendarView = () => {
  const currentView = useCalendarStore((state) => state.currentView);
  const setCurrentView = useCalendarStore((state) => state.setCurrentView);
  return { currentView, setCurrentView };
};

export const useCalendarDate = () => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const setSelectedDate = useCalendarStore((state) => state.setSelectedDate);
  return { selectedDate, setSelectedDate };
};

export const useCalendarUser = () => {
  const selectedUserId = useCalendarStore((state) => state.selectedUserId);
  const setSelectedUserId = useCalendarStore((state) => state.setSelectedUserId);
  const users = useCalendarStore((state) => state.users);
  const setUsers = useCalendarStore((state) => state.setUsers);
  return { selectedUserId, setSelectedUserId, users, setUsers };
};

export const useCalendarPreferences = () => {
  const badgeVariant = useCalendarStore((state) => state.badgeVariant);
  const setBadgeVariant = useCalendarStore((state) => state.setBadgeVariant);
  const workingHours = useCalendarStore((state) => state.workingHours);
  const setWorkingHours = useCalendarStore((state) => state.setWorkingHours);
  const visibleHours = useCalendarStore((state) => state.visibleHours);
  const setVisibleHours = useCalendarStore((state) => state.setVisibleHours);
  return { badgeVariant, setBadgeVariant, workingHours, setWorkingHours, visibleHours, setVisibleHours };
};

export const useCalendarEvents = () => {
  const events = useCalendarStore((state) => state.events);
  const setEvents = useCalendarStore((state) => state.setEvents);
  return { events, setEvents };
};