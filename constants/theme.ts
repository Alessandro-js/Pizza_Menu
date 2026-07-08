import { Platform } from 'react-native';

export const ArtisanColors = {
  primary: '#b20112',
  primaryContainer: '#d62828',
  primaryFixed: '#ffdad6',
  primaryFixedDim: '#ffb4ab',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#fff1ef',
  onPrimaryFixed: '#410002',
  onPrimaryFixedVariant: '#93000d',

  secondary: '#1b6d24',
  secondaryContainer: '#a0f399',
  secondaryFixed: '#a3f69c',
  secondaryFixedDim: '#88d982',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#217128',
  onSecondaryFixed: '#002204',
  onSecondaryFixedVariant: '#005312',

  tertiary: '#5b574b',
  tertiaryContainer: '#746f63',
  tertiaryFixed: '#e9e2d3',
  tertiaryFixedDim: '#cdc6b8',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#fbf3e4',
  onTertiaryFixed: '#1e1b13',
  onTertiaryFixedVariant: '#4b463c',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',

  background: '#fcf9f8',
  onBackground: '#1c1b1b',

  surface: '#fcf9f8',
  surfaceBright: '#fcf9f8',
  surfaceDim: '#dcd9d9',
  surfaceContainer: '#f0eded',
  surfaceContainerLow: '#f6f3f2',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerHigh: '#eae7e7',
  surfaceContainerHighest: '#e5e2e1',
  surfaceVariant: '#e5e2e1',
  surfaceTint: '#bd1119',

  onSurface: '#1c1b1b',
  onSurfaceVariant: '#5c403d',

  outline: '#906f6b',
  outlineVariant: '#e5bdb9',

  inverseSurface: '#313030',
  inverseOnSurface: '#f3f0ef',
  inversePrimary: '#ffb4ab',
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
