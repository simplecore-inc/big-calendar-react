import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TTheme } from '@/types';

interface ThemeStore {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
  toggleTheme: () => void;
  applyTheme: (theme: TTheme) => void;
}

// Apply theme to document
const applyThemeToDocument = (theme: TTheme) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'dark', // Default theme
      setTheme: (theme) => {
        set({ theme });
        applyThemeToDocument(theme);
      },
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        applyThemeToDocument(newTheme);
      },
      applyTheme: (theme) => {
        applyThemeToDocument(theme);
      },
    }),
    {
      name: 'big-calendar-theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // Apply theme when store is rehydrated
        if (state?.theme) {
          applyThemeToDocument(state.theme);
        }
      },
    }
  )
);

// Initialize theme on store creation
if (typeof window !== 'undefined') {
  const store = useThemeStore.getState();
  applyThemeToDocument(store.theme);
}