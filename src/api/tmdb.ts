import { MovieDetails, MovieResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p';
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

async function get<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing. Add EXPO_PUBLIC_TMDB_API_KEY to your .env file.');
  }
  const query = new URLSearchParams({ api_key: API_KEY });
  Object.entries(params).forEach(([key, value]) => query.append(key, String(value)));

  const response = await fetch(`${BASE_URL}${path}?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

export const fetchTrending = (page: number) =>
  get<MovieResponse>('/trending/movie/week', { page });

export const fetchMovieDetails = (id: number) =>
  get<MovieDetails>(`/movie/${id}`, { append_to_response: 'videos' });

export const imageUrl = (path: string | null, size: 'w342' | 'w500' | 'w780' = 'w500') =>
  path ? `${IMAGE_URL}/${size}${path}` : undefined;
