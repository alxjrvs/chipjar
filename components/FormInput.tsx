import { Text } from '@/components/Themed'
import { styles } from '@/styles'
import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

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
            style={[styles.input, error && styles.inputError]}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            {...rest}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  )
}
