import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="equityCalculator"
        options={{
          title: 'Equity Calculator'
        }}
      />
    </Tabs>
  )
}
