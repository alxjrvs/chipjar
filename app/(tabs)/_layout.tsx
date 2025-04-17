import { useAppTheme, View } from '@/components/Themed'
import { usePartnerData } from '@/contexts/PartnerDataContext'
import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
  const theme = useAppTheme()
  const { partners } = usePartnerData()

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
          title: 'Calculator',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="calculator"
              size={size}
              color={!!partners ? color : theme.colors.surfaceDisabled}
            />
          )
        }}
      />
      <Tabs.Screen
        name="partnerInfo"
        options={{
          title: 'Partners',
          tabBarIcon: ({ color, size }) => (
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="user" size={size - 2} color={color} />
              <FontAwesome
                name="user"
                size={size - 2}
                color={color}
                style={{ marginLeft: 2 }}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="partnerStats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="pie-chart"
              size={size}
              color={!!partners ? color : theme.colors.surfaceDisabled}
            />
          )
        }}
      />
      <Tabs.Screen
        name="regularBills"
        options={{
          title: 'Bills',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome
              name="file-text-o"
              size={size}
              color={!!partners ? color : theme.colors.surfaceDisabled}
            />
          )
        }}
      />
    </Tabs>
  )
}
