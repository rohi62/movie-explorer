# Movie Explorer

A cross-platform mobile app (iOS & Android) built with React Native and Expo that lets you browse this week's trending movies, read details, watch trailers and keep a personal watchlist. Data comes from the [TMDB REST API](https://www.themoviedb.org/documentation/api).

## Screenshots

| Trending | Movie details | Watchlist |
| :---: | :---: | :---: |
| <img src="docs/screenshots/home.png" width="220" /> | <img src="docs/screenshots/detail.png" width="220" /> | <img src="docs/screenshots/watchlist.png" width="220" /> |

## Features

- Trending movies of the week in a two-column grid
- Infinite scroll pagination (loads the next page as you reach the end)
- Pull-to-refresh
- Movie details: tagline, runtime, genres, overview
- Trailer button that opens the official YouTube trailer
- Watchlist saved on the device (persists after closing the app)
- Poster and backdrop images cached in memory and on disk
- Loading, error (with retry) and empty states

## Tech stack

- React Native + Expo, TypeScript
- React Navigation (native stack)
- `expo-image` for image caching
- `@react-native-async-storage/async-storage` for the watchlist
- Context API for watchlist state, custom hook (`useTrending`) for data fetching and pagination
- TMDB REST API (`fetch`, async/await)

## Project structure

```
.
├── App.tsx                      # Navigation + providers
└── src
    ├── api/tmdb.ts              # REST calls (trending, details + videos, image URLs)
    ├── components/MovieCard.tsx # Poster card used in both grids
    ├── context/WatchlistContext.tsx
    ├── hooks/useTrending.ts     # Pagination, refresh, error handling
    ├── navigation/types.ts      # Typed route params
    ├── screens/                 # HomeScreen, DetailScreen, WatchlistScreen
    ├── theme/colors.ts
    └── types/movie.ts           # API response types
```

## Run it locally

1. Get a free API key from [themoviedb.org](https://www.themoviedb.org/settings/api).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example and add your key:
   ```bash
   cp .env.example .env
   ```
4. Start the dev server:
   ```bash
   npx expo start
   ```
5. Install **Expo Go** on your phone and scan the QR code (camera app on iPhone, Expo Go on Android).

## What I learned

- Consuming a paginated REST API and avoiding duplicate requests while scrolling
- Combining two endpoints in one call with `append_to_response`
- Persisting local data with AsyncStorage
- Structuring a React Native app with typed navigation, context and hooks

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.
