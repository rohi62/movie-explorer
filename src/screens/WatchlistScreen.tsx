import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MovieCard } from '../components/MovieCard';
import { useWatchlist } from '../context/WatchlistContext';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Watchlist'>;

export default function WatchlistScreen({ navigation }: Props) {
  const { items } = useWatchlist();

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
        <Text style={styles.emptyText}>Open a movie and tap "Add to watchlist" to save it here.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={items}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={() => navigation.navigate('Detail', { movie: item })} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.background },
  content: { padding: 6 },
  empty: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '600' },
  emptyText: { color: colors.muted, textAlign: 'center', marginTop: 8, lineHeight: 20 },
});
