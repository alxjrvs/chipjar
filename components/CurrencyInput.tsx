import { Text, TextInput, useAppTheme } from '@/components/Themed'
import { styles } from '@/styles'
import {
  formatCurrencyInput,
  parseCurrencyInput
} from '@/utils/currencyFormatter'
import React, { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInputProps } from 'react-native-paper'

interface CurrencyInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value'> {
  control: Control<T>
  name: Path<T>
}

export function CurrencyInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  ...rest
}: CurrencyInputProps<T>) {
  const theme = useAppTheme()
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }
      }) => {
        // State to track the formatted display value
        const [displayValue, setDisplayValue] = useState<string>('')

        // Update the display value when the actual value changes
        useEffect(() => {
          if (value) {
            setDisplayValue(formatCurrencyInput(value))
          } else {
            setDisplayValue('')
          }
        }, [value])

        return (
          <>
            <TextInput
              mode="outlined"
              style={[styles.input, { color: '#000000' }]}
              placeholder={placeholder || 'Enter amount'}
              keyboardType="numeric"
              value={displayValue}
              theme={{ colors: { text: '#000000' } }}
              onChangeText={(text) => {
                // Only allow numeric input (and decimal point)
                if (text && !/^[$\d,.]*$/.test(text)) {
                  // If non-numeric characters are entered, don't update
                  return
                }

                // Store the raw numeric value in the form
                const numericValue = parseCurrencyInput(text)
                onChange(numericValue)

                // Update the display with formatting
                setDisplayValue(
                  text.startsWith('$') ? text : formatCurrencyInput(text)
                )
              }}
              onBlur={() => {
                onBlur()
                // Format properly on blur
                if (value) {
                  setDisplayValue(formatCurrencyInput(value))
                }
              }}
              error={!!error}
              outlineColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              left={<TextInput.Affix text="$" />}
              {...rest}
            />
            {error && (
              <Text variant="bodySmall" style={styles.errorText}>
                {error.message}
              </Text>
            )}
          </>
        )
      }}
    />
  )
}
