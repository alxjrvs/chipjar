import { styles } from '@/styles'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInputProps } from 'react-native-paper'
import { Text, TextInput } from './Themed'

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
            mode="flat"
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!error}
            underlineColor="transparent"
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
