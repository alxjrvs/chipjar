import { Text, TextInput, useAppTheme } from '@/components/Themed'
import { styles } from '@/styles'
import {
  formatCurrencyInput,
  parseCurrencyInput
} from '@/utils/currencyFormatter'
import { useEffect, useState } from 'react'
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path
} from 'react-hook-form'
import { MD3Theme, TextInputProps } from 'react-native-paper'

interface BillCurrencyInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value'> {
  control: Control<T>
  name: Path<T>
}

// Props for the inner field component
interface BillCurrencyInputFieldProps {
  value: string
  onChange: (...event: any[]) => void
  onBlur: () => void
  error?: FieldError
  placeholder?: string
  theme: MD3Theme
  rest: Omit<TextInputProps, 'value'>
}

// Inner component that can use hooks safely
function BillCurrencyInputField({
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  theme,
  rest
}: BillCurrencyInputFieldProps) {
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
        style={[styles.billInput, rest.style, { color: '#000000' }]}
        placeholder={placeholder || 'Enter bill amount'}
        keyboardType="decimal-pad"
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

          // Limit to 2 decimal places
          const parts = numericValue.split('.')
          if (parts.length > 1 && parts[1].length > 2) {
            // If more than 2 decimal places, truncate
            const truncated = parts[0] + '.' + parts[1].substring(0, 2)
            onChange(truncated)
            setDisplayValue(formatCurrencyInput(truncated))
            return
          }

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
            // Ensure we show 2 decimal places for bill amounts
            const numValue = parseFloat(value)
            if (!isNaN(numValue)) {
              const formattedValue = numValue.toFixed(2)
              onChange(formattedValue)
              setDisplayValue(formatCurrencyInput(formattedValue))
            } else {
              setDisplayValue(formatCurrencyInput(value))
            }
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
}

export function BillCurrencyInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  ...rest
}: BillCurrencyInputProps<T>) {
  const theme = useAppTheme()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }
      }) => (
        <BillCurrencyInputField
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          placeholder={placeholder}
          theme={theme}
          rest={rest}
        />
      )}
    />
  )
}
