import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

// Shape of global app state managed via Context
export interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  lastRefresh: number; // epoch ms for when data last refreshed
  setRefreshed: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme: ColorSchemeName = useColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(systemScheme === 'dark' ? 'dark' : 'light');
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const toggleTheme = () => setTheme((t: 'light' | 'dark') => (t === 'light' ? 'dark' : 'light'));
  const setRefreshed = () => setLastRefresh(Date.now());

  // Memoize to avoid unnecessary rerenders of consumers
  const value = useMemo(
    () => ({ theme, toggleTheme, lastRefresh, setRefreshed }),
    [theme, lastRefresh]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppState => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
