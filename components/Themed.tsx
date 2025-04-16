/**
 * Themed components using React Native Paper
 */

import { CustomDarkTheme, CustomLightTheme } from '@/constants/Theme'
import { useColorScheme } from 'react-native'
import {
  MD3Theme,
  ActivityIndicator as PaperActivityIndicator,
  Appbar as PaperAppbar,
  Button as PaperButton,
  Card as PaperCard,
  IconButton as PaperIconButton,
  Modal as PaperModal,
  Portal as PaperPortal,
  Provider as PaperProvider,
  Surface as PaperSurface,
  Text as PaperText,
  TextInput as PaperTextInput,
  useTheme
} from 'react-native-paper'

// Export the theme hook for use in components
export function useAppTheme() {
  return useTheme<MD3Theme>()
}

// Export the Paper Provider with our custom theme
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme

  return <PaperProvider theme={theme}>{children}</PaperProvider>
}

// Re-export Paper components with our theme
export const Text = PaperText
export const Surface = PaperSurface
// Custom Button with no borders or elevation
export function Button(props: React.ComponentProps<typeof PaperButton>) {
  return (
    <PaperButton
      buttonColor="#5D3915" // Darker acorn brown
      textColor="white"
      mode={props.mode || 'text'}
      {...props}
      style={[{ elevation: 0, borderWidth: 0 }, props.style]}
    />
  )
}
// Custom TextInput with no borders
export const TextInput = PaperTextInput
export const Card = PaperCard
export const Appbar = PaperAppbar
export const IconButton = PaperIconButton
export const Modal = PaperModal
export const Portal = PaperPortal
export const ActivityIndicator = PaperActivityIndicator

// For backward compatibility, create a View component that uses Surface
export function View(props: React.ComponentProps<typeof PaperSurface>) {
  const { style, ...otherProps } = props
  return (
    <PaperSurface
      style={[{ backgroundColor: 'transparent' }, style]}
      elevation={0}
      {...otherProps}
    />
  )
}
