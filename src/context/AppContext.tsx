import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AppState } from '../types';

interface AppContextValue extends AppState {
  toggleDarkMode: () => void;
  toggleProjectorMode: () => void;
  setProjectorScale: (scale: AppState['projectorScale']) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
  markTopicComplete: (topicId: string) => void;
  isTopicComplete: (topicId: string) => boolean;
  setActiveModule: (moduleId: string | null) => void;
  completionPercent: number;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = 'qml-workshop-state';
const TOTAL_TOPICS = 100; // will update as topics are built

function loadState(): Partial<AppState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const saved = loadState();

  const [darkMode, setDarkMode] = useState<boolean>(
    saved.darkMode ?? window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [projectorMode, setProjectorMode] = useState<boolean>(saved.projectorMode ?? false);
  const [projectorScale, setProjectorScaleState] = useState<AppState['projectorScale']>(
    saved.projectorScale ?? 'large'
  );
  const [sidebarOpen, setSidebarOpenState] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTopics, setCompletedTopics] = useState<string[]>(saved.completedTopics ?? []);
  const [activeModule, setActiveModule] = useState<string | null>(saved.activeModule ?? null);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Apply projector mode class
  useEffect(() => {
    document.documentElement.classList.toggle('projector-mode', projectorMode);
    document.documentElement.classList.toggle(`projector-scale-${projectorScale}`, projectorMode);
  }, [projectorMode, projectorScale]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        darkMode, projectorMode, projectorScale,
        completedTopics, activeModule
      }));
    } catch { /* ignore */ }
  }, [darkMode, projectorMode, projectorScale, completedTopics, activeModule]);

  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);
  const toggleProjectorMode = useCallback(() => setProjectorMode(p => !p), []);
  const setProjectorScale = useCallback((scale: AppState['projectorScale']) => setProjectorScaleState(scale), []);
  const toggleSidebar = useCallback(() => setSidebarOpenState(s => !s), []);
  const setSidebarOpen = useCallback((open: boolean) => setSidebarOpenState(open), []);

  const markTopicComplete = useCallback((topicId: string) => {
    setCompletedTopics(prev =>
      prev.includes(topicId) ? prev : [...prev, topicId]
    );
  }, []);

  const isTopicComplete = useCallback((topicId: string) =>
    completedTopics.includes(topicId), [completedTopics]
  );

  const completionPercent = Math.round((completedTopics.length / TOTAL_TOPICS) * 100);

  return (
    <AppContext.Provider value={{
      darkMode, projectorMode, projectorScale,
      sidebarOpen, searchQuery, completedTopics, activeModule,
      toggleDarkMode, toggleProjectorMode, setProjectorScale,
      toggleSidebar, setSidebarOpen, setSearchQuery,
      markTopicComplete, isTopicComplete, setActiveModule,
      completionPercent,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
