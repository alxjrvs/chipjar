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
  isBillInput?: boolean
  placeholder?: string
}

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

function CurrencyInputField({
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  rest,
  isBillInput = false
}: CurrencyInputFieldProps) {
  const [displayValue, setDisplayValue] = useState<string>('')
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
        mode="flat"
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
          if (text && !/^[$\d,.]*$/.test(text)) {
            return
          }

          const numericValue = parseCurrencyInput(text)

          if (isBillInput && numericValue.includes('.')) {
            const parts = numericValue.split('.')
            if (parts.length > 1 && parts[1].length > 2) {
              const truncated = parts[0] + '.' + parts[1].substring(0, 2)
              onChange(truncated)
              setDisplayValue(formatCurrencyInput(truncated))
              return
            }
          }

          onChange(numericValue)

          setDisplayValue(formatCurrencyInput(text))
        }}
        onBlur={() => {
          onBlur()
          if (value) {
            if (isBillInput) {
              const numValue = parseFloat(value)
              if (!isNaN(numValue)) {
                const formattedValue = numValue.toFixed(2)
                onChange(formattedValue)
                setDisplayValue(formatCurrencyInput(formattedValue))
              } else {
                setDisplayValue(formatCurrencyInput(value))
              }
            } else {
              setDisplayValue(formatCurrencyInput(value))
            }
          }
        }}
        error={!!error}
        underlineColor="transparent"
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
