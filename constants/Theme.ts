import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

// Define our custom light theme
export const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors
  }
}

// Define our custom dark theme
export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors
  }
}
