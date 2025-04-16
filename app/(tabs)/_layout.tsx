import { AcornDecoration } from '@/components/AcornDecoration'
import { Text, useAppTheme, View } from '@/components/Themed'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'

export default function TabLayout() {
  const theme = useAppTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5D3915', // Darker acorn brown
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
          title: '',
          tabBarLabel: undefined,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <View
                  style={{
                    backgroundColor: theme.colors.primaryContainer,
                    paddingHorizontal: 16,
                    paddingVertical: 6,
                    borderRadius: 16,
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#5D3915', // Darker acorn brown
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1
                  }}
                >
                  <AcornDecoration size={16} style={{ marginRight: 6 }} />
                  <Text
                    style={{
                      fontFamily: 'Bitter-Bold',
                      fontSize: 12
                    }}
                  >
                    Equity Calculator
                  </Text>
                </View>
              ) : null}
            </View>
          )
        }}
      />
    </Tabs>
  )
}
