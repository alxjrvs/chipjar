import { useAppTheme, View } from '@/components/Themed'
import { styles } from '@/styles'
import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle } from 'react-native'

interface ThemedContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  scrollContainerStyle?: StyleProp<ViewStyle>
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
}

export function ThemedContainer({
  children,
  style,
  scrollContainerStyle,
  keyboardShouldPersistTaps = 'handled'
}: ThemedContainerProps) {
  const theme = useAppTheme()

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        style
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          scrollContainerStyle
        ]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
