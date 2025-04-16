import { Text, TextInput, useAppTheme } from '@/components/Themed'
import { styles } from '@/styles'
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInputProps } from 'react-native-paper'

interface FormInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value'> {
  control: Control<T>
  name: Path<T>
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  placeholder,
  keyboardType,
  ...rest
}: FormInputProps<T>) {
  const theme = useAppTheme()

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }
      }) => (
        <>
          <TextInput
            mode="outlined"
            style={[styles.input, { color: '#000000' }]}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value as string}
            theme={{ colors: { text: '#000000' } }}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!error}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.primary}
            {...rest}
          />
          {error && (
            <Text variant="bodySmall" style={styles.errorText}>
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  )
}
