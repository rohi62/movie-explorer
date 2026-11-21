import { Movie } from '../types/movie';

export type RootStackParamList = {
  Home: undefined;
  Detail: { movie: Movie };
  Watchlist: undefined;
};
