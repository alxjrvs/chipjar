import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { ThemeProvider } from '@/components/Themed'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Load Google Fonts remotely
    Bitter: 'https://fonts.gstatic.com/s/bitter/v32/rax8HiqOu8IVPmn7f4xp.ttf',
    'Bitter-Bold':
      'https://fonts.gstatic.com/s/bitter/v32/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8cxYOLI.ttf',
    'Bitter-Medium':
      'https://fonts.gstatic.com/s/bitter/v32/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8ajfOLI.ttf',
    'Bitter-Italic':
      'https://fonts.gstatic.com/s/bitter/v32/rax-HiqOu8IVPmn7erxmJD1.ttf',
    // Keep existing fonts
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5D3915' // Darker acorn brown
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily: 'Bitter-Bold'
          },
          contentStyle: {
            backgroundColor: '#FFFBF5' // Warm cream
          }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  )
}
