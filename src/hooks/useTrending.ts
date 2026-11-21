import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchTrending } from '../api/tmdb';
import { Movie } from '../types/movie';

export function useTrending() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPage = useRef(1);
  const totalPages = useRef(1);
  const busy = useRef(false);

  const load = useCallback(async (reset: boolean) => {
    if (busy.current) return;
    if (!reset && nextPage.current > totalPages.current) return;

    busy.current = true;
    setError(null);
    if (reset) setRefreshing(true);
    else setLoading(true);

    try {
      const page = reset ? 1 : nextPage.current;
      const data = await fetchTrending(page);
      setMovies((prev) => {
        if (reset) return data.results;
        const known = new Set(prev.map((m) => m.id));
        return [...prev, ...data.results.filter((m) => !known.has(m.id))];
      });
      totalPages.current = data.total_pages;
      nextPage.current = page + 1;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      busy.current = false;
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  return {
    movies,
    loading,
    refreshing,
    error,
    loadMore: () => load(false),
    refresh: () => load(true),
  };
}
