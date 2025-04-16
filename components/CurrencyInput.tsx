import { Text } from '@/components/Themed'
import { styles } from '@/styles'
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/currencyFormatter'
import React, { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

interface CurrencyInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value'> {
  control: Control<T>
  name: Path<T>
}

export function CurrencyInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  ...rest
}: CurrencyInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
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
              style={[styles.input, error && styles.inputError]}
              placeholder={placeholder || 'Enter amount'}
              keyboardType="numeric"
              value={displayValue}
              onChangeText={(text) => {
                // Store the raw numeric value in the form
                const numericValue = parseCurrencyInput(text)
                onChange(numericValue)
                
                // Update the display with formatting
                setDisplayValue(text.startsWith('$') ? text : formatCurrencyInput(text))
              }}
              onBlur={() => {
                onBlur()
                // Format properly on blur
                if (value) {
                  setDisplayValue(formatCurrencyInput(value))
                }
              }}
              {...rest}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )
      }}
    />
  )
}
