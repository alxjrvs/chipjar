import React from 'react'
import { Text } from 'react-native'

interface AcornDecorationProps {
  size?: number
  style?: any
}

export function AcornDecoration({ size = 24, style }: AcornDecorationProps) {
  return <Text style={[{ fontSize: size }, style]}>🌰</Text>
}
