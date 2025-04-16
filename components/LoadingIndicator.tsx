import { ActivityIndicator, Text, View, useAppTheme } from '@/components/Themed'
import { styles } from '@/styles'

interface LoadingIndicatorProps {
  message?: string
}

export function LoadingIndicator({
  message = 'Loading...'
}: LoadingIndicatorProps) {
  const theme = useAppTheme()

  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text variant="bodyLarge" style={styles.loadingText}>
        {message}
      </Text>
    </View>
  )
}
