import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { imageUrl } from '../api/tmdb';
import { colors } from '../theme/colors';
import { Movie } from '../types/movie';

interface Props {
  movie: Movie;
  onPress: () => void;
}

export function MovieCard({ movie, onPress }: Props) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'TBA';
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: imageUrl(movie.poster_path, 'w342') }}
        style={styles.poster}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.meta}>
          {year}  ★ {movie.vote_average.toFixed(1)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  poster: { width: '100%', aspectRatio: 2 / 3, backgroundColor: colors.border },
  info: { padding: 10 },
  title: { color: colors.text, fontSize: 14, fontWeight: '600' },
  meta: { color: colors.muted, fontSize: 12, marginTop: 3 },
});
