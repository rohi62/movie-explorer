import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { WatchlistProvider, useWatchlist } from './src/context/WatchlistContext';
import { RootStackParamList } from './src/navigation/types';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import WatchlistScreen from './src/screens/WatchlistScreen';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.background, text: colors.text },
};

function WatchlistButton({ onPress }: { onPress: () => void }) {
  const { items } = useWatchlist();
  return (
    <Pressable onPress={onPress} hitSlop={10}>
      <Text style={{ color: colors.accent, fontWeight: '600' }}>Watchlist ({items.length})</Text>
    </Pressable>
  );
}

export default function App() {
  return (
    <WatchlistProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerTintColor: colors.text }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Trending this week',
              headerRight: () => <WatchlistButton onPress={() => navigation.navigate('Watchlist')} />,
            })}
          />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: '' }} />
          <Stack.Screen name="Watchlist" component={WatchlistScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </WatchlistProvider>
  );
}
