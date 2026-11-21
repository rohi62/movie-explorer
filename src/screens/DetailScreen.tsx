import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { fetchMovieDetails, imageUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { MovieDetails } from '../types/movie';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { movie } = route.params;
  const { isSaved, toggle } = useWatchlist();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMovieDetails(movie.id)
      .then(setDetails)
      .catch((e) => setError(e instanceof Error ? e.message : 'Could not load details'))
      .finally(() => setLoading(false));
  }, [movie.id]);

  const trailer = details?.videos.results.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer'
  );
  const saved = isSaved(movie.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image
        source={{ uri: imageUrl(movie.backdrop_path ?? movie.poster_path, 'w780') }}
        style={styles.backdrop}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.body}>
        <Text style={styles.title}>{movie.title}</Text>
        {details?.tagline ? <Text style={styles.tagline}>{details.tagline}</Text> : null}

        <Text style={styles.meta}>
          ★ {movie.vote_average.toFixed(1)}
          {movie.release_date ? `   ${movie.release_date.slice(0, 4)}` : ''}
          {details?.runtime ? `   ${details.runtime} min` : ''}
        </Text>

        {details?.genres.length ? (
          <View style={styles.genres}>
            {details.genres.map((g) => (
              <View key={g.id} style={styles.chip}>
                <Text style={styles.chipText}>{g.name}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.actions}>
          {trailer ? (
            <Pressable
              style={[styles.button, styles.primary]}
              onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${trailer.key}`)}
            >
              <Text style={styles.primaryText}>Watch trailer</Text>
            </Pressable>
          ) : null}
          <Pressable
            style={[styles.button, styles.secondary]}
            onPress={() => toggle(movie)}
          >
            <Text style={styles.secondaryText}>
              {saved ? 'Remove from watchlist' : 'Add to watchlist'}
            </Text>
          </Pressable>
        </View>

        {loading ? <ActivityIndicator color={colors.accent} style={styles.loader} /> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.overview}>{movie.overview || 'No overview available.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background },
  content: { paddingBottom: 40 },
  backdrop: { width: '100%', aspectRatio: 16 / 9, backgroundColor: colors.border },
  body: { padding: 20 },
  title: { color: colors.text, fontSize: 26, fontWeight: '700' },
  tagline: { color: colors.muted, fontStyle: 'italic', marginTop: 4 },
  meta: { color: colors.accent, marginTop: 12, fontSize: 14 },
  genres: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  chipText: { color: colors.muted, fontSize: 12 },
  actions: { marginTop: 20, gap: 10 },
  button: { paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  primary: { backgroundColor: colors.accent },
  primaryText: { color: colors.background, fontWeight: '700' },
  secondary: { borderWidth: 1, borderColor: colors.border },
  secondaryText: { color: colors.text, fontWeight: '600' },
  loader: { marginTop: 16 },
  error: { color: colors.danger, marginTop: 12 },
  overview: { color: colors.text, lineHeight: 22, marginTop: 20, fontSize: 15 },
});
