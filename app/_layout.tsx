import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ThemeProvider as AppThemeProvider } from './components/ThemeContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppThemeProvider>
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pizza/[id]"
          options={{ headerShown: false, animation: 'slide_from_right' }}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
    </AppThemeProvider>
  );
}
