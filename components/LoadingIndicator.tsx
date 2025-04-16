import { Text, View } from '@/components/Themed'
import { styles } from '@/styles'
import React from 'react'
import { ActivityIndicator } from 'react-native'

interface LoadingIndicatorProps {
  message?: string
}

export function LoadingIndicator({
  message = 'Loading...'
}: LoadingIndicatorProps) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2f95dc" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  )
}
