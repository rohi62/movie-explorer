import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MovieCard } from '../components/MovieCard';
import { useTrending } from '../hooks/useTrending';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { movies, loading, refreshing, error, loadMore, refresh } = useTrending();

  if (error && movies.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.button} onPress={refresh}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (loading && movies.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} size="large" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={movies}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={() => navigation.navigate('Detail', { movie: item })} />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.6}
      refreshing={refreshing}
      onRefresh={refresh}
      ListFooterComponent={
        loading ? <ActivityIndicator style={styles.footer} color={colors.accent} /> : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { backgroundColor: colors.background },
  content: { padding: 6 },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: { color: colors.danger, textAlign: 'center', marginBottom: 16 },
  button: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: { color: colors.background, fontWeight: '700' },
  footer: { marginVertical: 20 },
});
