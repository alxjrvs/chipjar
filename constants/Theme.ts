import { MD3DarkTheme, MD3LightTheme, configureFonts } from 'react-native-paper'

const autumnLightColors = {
  primary: '#795548',
  primaryContainer: '#EADDCF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#3E2723',

  secondary: '#E64A19',
  secondaryContainer: '#FFDCC4',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#BF360C',

  tertiary: '#2E7D32',
  tertiaryContainer: '#C8E6C9',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#1B5E20',

  background: '#FFFBF7',
  onBackground: '#1F1B16',
  surface: '#FFFBF7',
  onSurface: '#1F1B16',
  surfaceVariant: '#F0E6D6',
  onSurfaceVariant: '#4D4639',

  error: '#B00020',
  errorContainer: '#FFDAD6',
  onError: '#FFFFFF',
  onErrorContainer: '#410002',

  outline: '#79736A',
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

const autumnDarkColors = {
  primary: '#BCAAA4',
  primaryContainer: '#5D4037',
  onPrimary: '#3E2723',
  onPrimaryContainer: '#EFEBE9',

  secondary: '#FFAB91',
  secondaryContainer: '#BF360C',
  onSecondary: '#3E2723',
  onSecondaryContainer: '#FFCCBC',

  tertiary: '#A5D6A7',
  tertiaryContainer: '#1B5E20',
  onTertiary: '#1B5E20',
  onTertiaryContainer: '#C8E6C9',

  background: '#1F1B16',
  onBackground: '#EFEBE9',
  surface: '#1F1B16',
  onSurface: '#EFEBE9',
  surfaceVariant: '#4D4037',
  onSurfaceVariant: '#D7CCC8',

  error: '#CF6679',
  errorContainer: '#8B0000',
  onError: '#000000',
  onErrorContainer: '#FFCDD2',

  outline: '#BCAAA4',
  outlineVariant: '#5D4037',
  inverseSurface: '#EFEBE9',
  inverseOnSurface: '#3E2723',
  inversePrimary: '#795548',
  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: 'rgba(239, 235, 233, 0.12)',
  onSurfaceDisabled: 'rgba(239, 235, 233, 0.38)',
  backdrop: 'rgba(31, 27, 22, 0.4)'
}

const fontConfig = {
  fontFamily: 'Bitter'
}

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
