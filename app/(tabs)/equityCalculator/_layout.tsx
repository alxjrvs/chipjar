import { AcornDecoration } from '@/components/AcornDecoration'
import { Button, Text, useAppTheme, View } from '@/components/Themed'
import { router, Stack } from 'expo-router'

export default function IndexLayout() {
  const theme = useAppTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5D3915' // Darker acorn brown
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontFamily: 'Bitter-Bold',
          color: 'red'
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
          title: 'ChipJar',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="singleBill"
        options={{
          title: 'Equity Calculator',
          presentation: 'card',
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <AcornDecoration size={20} style={{ marginRight: 8 }} />
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 18
                }}
              >
                Equity Calculator
              </Text>
            </View>
          ),
          headerRight: () => {
            return (
              <Button
                mode="contained"
                compact
                icon="pencil"
                onPress={() => router.push('/equityCalculator/edit')}
                style={{ marginRight: 5 }}
              >
                Edit Partners
              </Button>
            )
          }
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Partners',
          presentation: 'card',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AcornDecoration size={20} style={{ marginRight: 8 }} />
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 18
                }}
              >
                Edit Partners
              </Text>
            </View>
          )
        }}
      />
    </Stack>
  )
}
