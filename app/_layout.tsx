import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { ThemeProvider } from '@/components/Themed'
import { BillsProvider } from '@/contexts/BillsContext'
import { PartnerDataProvider } from '@/contexts/PartnerDataContext'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)'
}

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Bitter: 'https://fonts.gstatic.com/s/bitter/v32/rax8HiqOu8IVPmn7f4xp.ttf',
    'Bitter-Bold':
      'https://fonts.gstatic.com/s/bitter/v32/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8cxYOLI.ttf',
    'Bitter-Medium':
      'https://fonts.gstatic.com/s/bitter/v32/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8ajfOLI.ttf',
    'Bitter-Italic':
      'https://fonts.gstatic.com/s/bitter/v32/rax-HiqOu8IVPmn7erxmJD1.ttf',
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font
  })

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
      <PartnerDataProvider>
        <BillsProvider>
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#5D4037'
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontFamily: 'Bitter-Bold'
              },
              headerBackVisible: false,
              contentStyle: {
                backgroundColor: '#FFFBF5'
              }
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </BillsProvider>
      </PartnerDataProvider>
    </ThemeProvider>
  )
}
