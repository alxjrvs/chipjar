import { AcornDecoration } from '@/components/AcornDecoration'
import { Text, useAppTheme, View } from '@/components/Themed'
import { Stack } from 'expo-router'

export default function PartnerStatsLayout() {
  const theme = useAppTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5D4037'
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontFamily: 'Bitter-Bold'
        },
        headerBackTitleStyle: {
          fontFamily: 'Bitter'
        },
        contentStyle: {
          backgroundColor: theme.colors.background
        }
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AcornDecoration size={20} style={{ marginRight: 8 }} />
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 18
                }}
              >
                Partner Stats
              </Text>
            </View>
          )
        }}
      />
    </Stack>
  )
}
