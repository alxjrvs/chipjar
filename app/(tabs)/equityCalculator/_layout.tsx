import { Text } from '@/components/Themed'
import { styles } from '@/styles'
import { Stack, router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function IndexLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'ChipJar',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="calculator"
        options={{
          title: 'Equity Calculator',
          presentation: 'card',
          headerRight: () => {
            return (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push('/equityCalculator/edit')}
              >
                <Text style={styles.editButtonText}>Edit Partners</Text>
              </TouchableOpacity>
            )
          }
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Partners',
          presentation: 'card'
        }}
      />
    </Stack>
  )
}
