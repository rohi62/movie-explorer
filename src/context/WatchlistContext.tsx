import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Movie } from '../types/movie';

const STORAGE_KEY = 'watchlist:v1';

interface WatchlistContextValue {
  items: Movie[];
  isSaved: (id: number) => boolean;
  toggle: (movie: Movie) => void;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setItems(JSON.parse(raw) as Movie[]);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
    }
  }, [items, loaded]);

  const isSaved = useCallback((id: number) => items.some((m) => m.id === id), [items]);

  const toggle = useCallback((movie: Movie) => {
    setItems((prev) =>
      prev.some((m) => m.id === movie.id) ? prev.filter((m) => m.id !== movie.id) : [movie, ...prev]
    );
  }, []);

  return (
    <WatchlistContext.Provider value={{ items, isSaved, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used inside WatchlistProvider');
  return ctx;
}
