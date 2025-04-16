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

interface CurrencyInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value'> {
  control: Control<T>
  name: Path<T>
  isBillInput?: boolean // Flag to determine if this is a bill input
  placeholder?: string
}

// Props for the inner field component
interface CurrencyInputFieldProps {
  value: string
  onChange: (...event: any[]) => void
  onBlur: () => void
  error?: FieldError
  placeholder?: string
  theme: MD3Theme
  rest: Omit<TextInputProps, 'value'>
  isBillInput?: boolean
}

// Inner component that can use hooks safely
function CurrencyInputField({
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  theme,
  rest,
  isBillInput = false
}: CurrencyInputFieldProps) {
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
        style={[
          isBillInput ? styles.billInput : styles.input,
          rest.style,
          { color: '#000000' }
        ]}
        placeholder={
          placeholder || (isBillInput ? 'Enter bill amount' : 'Enter amount')
        }
        keyboardType={isBillInput ? 'decimal-pad' : 'numeric'}
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

          // For bill inputs, limit to 2 decimal places
          if (isBillInput && numericValue.includes('.')) {
            const parts = numericValue.split('.')
            if (parts.length > 1 && parts[1].length > 2) {
              // If more than 2 decimal places, truncate
              const truncated = parts[0] + '.' + parts[1].substring(0, 2)
              onChange(truncated)
              setDisplayValue(formatCurrencyInput(truncated))
              return
            }
          }

          onChange(numericValue)

          // Update the display with formatting (no $ sign)
          setDisplayValue(formatCurrencyInput(text))
        }}
        onBlur={() => {
          onBlur()
          // Format properly on blur
          if (value) {
            if (isBillInput) {
              // For bill inputs, ensure we show 2 decimal places
              const numValue = parseFloat(value)
              if (!isNaN(numValue)) {
                const formattedValue = numValue.toFixed(2)
                onChange(formattedValue)
                setDisplayValue(formatCurrencyInput(formattedValue))
              } else {
                setDisplayValue(formatCurrencyInput(value))
              }
            } else {
              // For regular currency inputs
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

export function CurrencyInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  isBillInput = false,
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
      }) => (
        <CurrencyInputField
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          placeholder={placeholder}
          theme={theme}
          rest={rest}
          isBillInput={isBillInput}
        />
      )}
    />
  )
}
