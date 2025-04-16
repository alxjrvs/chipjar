import { AcornDecoration } from '@/components/AcornDecoration'
import { useAppTheme } from '@/components/Themed'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
  const theme = useAppTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          height: 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontFamily: 'Bitter-Medium',
          fontSize: 12,
          marginTop: 2
        },
        tabBarItemStyle: {
          paddingVertical: 5
        },
        tabBarIconStyle: {
          marginBottom: -2
        }
      }}
    >
      <Tabs.Screen
        name="equityCalculator"
        options={{
          title: 'Equity Calculator',
          tabBarIcon: () => (
            <AcornDecoration size={16} style={{ marginRight: 6 }} />
          )
        }}
      />
    </Tabs>
  )
}
