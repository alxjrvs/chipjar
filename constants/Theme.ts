import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper'

// Autumn-themed color palette for light theme
const autumnLightColors = {
  // Primary colors - Acorn brown
  primary: '#8B5A2B', // Rich acorn brown
  primaryContainer: '#D7BFA8', // Light acorn shell
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#3E2914',

  // Secondary colors - Autumn leaf
  secondary: '#D35400', // Burnt orange (autumn leaf)
  secondaryContainer: '#FFDBC2', // Light orange
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#4A1D00',

  // Tertiary colors - Forest green
  tertiary: '#2E7D32', // Forest green
  tertiaryContainer: '#B8E6C0', // Light moss
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#0C2A0F',

  // Background colors
  background: '#FFFBF5', // Warm cream
  onBackground: '#1F1B16', // Dark brown
  surface: '#FFFBF5',
  onSurface: '#1F1B16',
  surfaceVariant: '#F0E6D6', // Parchment
  onSurfaceVariant: '#4D4639',

  // Error colors
  error: '#B3261E', // Traditional error red
  errorContainer: '#F9DEDC',
  onError: '#FFFFFF',
  onErrorContainer: '#410E0B',

  // Other colors
  outline: '#938F85', // Muted brown
  outlineVariant: '#D8C2A9',
  inverseSurface: '#352F28',
  inverseOnSurface: '#F9EFE6',
  inversePrimary: '#D7BFA8',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(31, 27, 22, 0.12)',
  onSurfaceDisabled: 'rgba(31, 27, 22, 0.38)',
  backdrop: 'rgba(56, 47, 36, 0.4)'
}

// Autumn-themed color palette for dark theme
const autumnDarkColors = {
  // Primary colors - Acorn brown
  primary: '#D7BFA8', // Light acorn shell
  primaryContainer: '#704A22', // Medium acorn brown
  onPrimary: '#3E2914',
  onPrimaryContainer: '#F6E8D7',

  // Secondary colors - Autumn leaf
  secondary: '#FFBD98', // Light orange
  secondaryContainer: '#A34200', // Deep autumn orange
  onSecondary: '#4A1D00',
  onSecondaryContainer: '#FFDBC2',

  // Tertiary colors - Forest green
  tertiary: '#A0D4A9', // Light moss
  tertiaryContainer: '#1B5E20', // Deep forest green
  onTertiary: '#0C2A0F',
  onTertiaryContainer: '#D7F2DC',

  // Background colors
  background: '#1F1B16', // Dark brown
  onBackground: '#EAE1D9',
  surface: '#1F1B16',
  onSurface: '#EAE1D9',
  surfaceVariant: '#4D4639', // Dark parchment
  onSurfaceVariant: '#D8C2A9',

  // Error colors
  error: '#F2B8B5', // Light error red
  errorContainer: '#8C1D18',
  onError: '#601410',
  onErrorContainer: '#F9DEDC',

  // Other colors
  outline: '#A08D71',
  outlineVariant: '#4D4639',
  inverseSurface: '#EAE1D9',
  inverseOnSurface: '#352F28',
  inversePrimary: '#8B5A2B',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(234, 225, 217, 0.12)',
  onSurfaceDisabled: 'rgba(234, 225, 217, 0.38)',
  backdrop: 'rgba(31, 27, 22, 0.4)'
}

// Font configuration for Material Design 3
const fontConfig = {
  fontFamily: 'Bitter'
}

// Define our custom light theme
export const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...autumnLightColors
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
  animation: {
    scale: 1.0
  }
}

// Define our custom dark theme
export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...autumnDarkColors
  },
  fonts: configureFonts({ config: fontConfig }),
  roundness: 8,
  animation: {
    scale: 1.0
  }
}
