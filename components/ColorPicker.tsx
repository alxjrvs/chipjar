import { Text, View, useAppTheme } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Modal, Portal } from 'react-native-paper'

// Material Design color palette - 12 colors evenly distributed across the color wheel
export const materialColors = {
  red: '#F44336',
  pink: '#E91E63',
  purple: '#9C27B0',
  deepPurple: '#673AB7',
  indigo: '#3F51B5',
  blue: '#2196F3',
  lightBlue: '#03A9F4',
  cyan: '#00BCD4',
  teal: '#009688',
  green: '#4CAF50',
  lime: '#CDDC39',
  amber: '#FFC107'
}

export type ColorName = keyof typeof materialColors

interface ColorPickerProps {
  selectedColor: ColorName
  onSelectColor: (color: ColorName) => void
  label?: string
}

export function ColorPicker({
  selectedColor,
  onSelectColor,
  label = ''
}: ColorPickerProps) {
  const [visible, setVisible] = React.useState(false)
  const theme = useAppTheme()

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const handleColorSelect = (color: ColorName) => {
    onSelectColor(color)
    hideModal()
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[
          styles.colorPreview,
          {
            backgroundColor: materialColors[selectedColor],
            borderColor: theme.colors.outline
          }
        ]}
        onPress={showModal}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalContent,
            { backgroundColor: theme.colors.surface }
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
            Choose a Color
          </Text>
          <View style={styles.colorGrid}>
            {Object.entries(materialColors).map(([name, color]) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === name && styles.selectedColor
                ]}
                onPress={() => handleColorSelect(name as ColorName)}
              />
            ))}
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Bitter-Medium'
  },
  colorPreview: {
    width: '100%',
    height: 24,
    borderRadius: 4,
    borderWidth: 1
  },
  modalContent: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Bitter-Bold'
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%'
  },
  colorOption: {
    width: 50,
    height: 50,
    margin: 8,
    borderRadius: 25
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#000'
  }
})
