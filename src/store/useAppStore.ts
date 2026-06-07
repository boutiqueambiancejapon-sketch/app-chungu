import { create } from 'zustand';

interface AppStore {
  isDayMode: boolean;
  toggleTheme: () => void;
}

export const useAppStore = create<AppStore>(set => ({
  isDayMode: false,
  toggleTheme: () => set(s => ({ isDayMode: !s.isDayMode })),
}));
