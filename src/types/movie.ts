export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  tagline: string;
  genres: { id: number; name: string }[];
  videos: { results: Video[] };
}
