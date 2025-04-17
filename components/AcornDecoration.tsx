import React from 'react'
import { StyleSheet, View, useColorScheme } from 'react-native'

interface AcornDecorationProps {
  size?: number
  style?: any
}

export function AcornDecoration({ size = 24, style }: AcornDecorationProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  const capColor = isDark ? '#D7BFA8' : '#8B5A2B' // Acorn cap color
  const bodyColor = isDark ? '#A34200' : '#D35400' // Acorn body color

  return (
    <View style={[styles.container, style]}>
      {/* Acorn cap */}
      <View
        style={[
          styles.cap,
          {
            width: size * 0.8,
            height: size * 0.4,
            backgroundColor: capColor,
            borderTopLeftRadius: size * 0.4,
            borderTopRightRadius: size * 0.4
          }
        ]}
      >
        {/* Cap texture lines */}
        <View
          style={[
            styles.capLine,
            {
              width: size * 0.6,
              height: 1,
              top: size * 0.1
            }
          ]}
        />
        <View
          style={[
            styles.capLine,
            {
              width: size * 0.5,
              height: 1,
              top: size * 0.2
            }
          ]}
        />
      </View>

      {/* Acorn body */}
      <View
        style={[
          styles.body,
          {
            width: size * 0.6,
            height: size * 0.8,
            backgroundColor: bodyColor,
            borderBottomLeftRadius: size * 0.3,
            borderBottomRightRadius: size * 0.3,
            top: -size * 0.1
          }
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  cap: {
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  capLine: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  body: {
    zIndex: 1
  }
})
