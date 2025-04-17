import { ColorName, ColorPicker } from '@/components/ColorPicker'
import { Button, Text, View } from '@/components/Themed'
import { styles } from '@/styles'
import { PartnerFormValues } from '@/types'

import { Controller, UseFormReturn } from 'react-hook-form'
import { CurrencyInput } from './CurrencyInput'
import { FormInput } from './FormInput'

interface PartnerFormProps {
  form: UseFormReturn<PartnerFormValues>
  onSubmit: (data: PartnerFormValues) => void
  submitButtonText?: string
}

export function PartnerForm({
  form,
  onSubmit,
  submitButtonText = 'Save Partners'
}: PartnerFormProps) {
  return (
    <View style={styles.formContainer}>
      <View style={styles.partnersRow}>
        <View style={styles.partnerSection}>
          <Text variant="titleMedium" style={styles.partnerTitle}>
            Partner 1
          </Text>
          <FormInput
            control={form.control}
            name="partner1.name"
            placeholder="Name"
          />
          <CurrencyInput
            control={form.control}
            name="partner1.salary"
            placeholder="Annual Salary"
          />
          <Controller
            control={form.control}
            name="partner1.color"
            render={({ field: { onChange, value } }) => (
              <ColorPicker
                selectedColor={value as ColorName}
                onSelectColor={onChange}
              />
            )}
          />
        </View>

        <View style={styles.partnerSection}>
          <Text variant="titleMedium" style={styles.partnerTitle}>
            Partner 2
          </Text>
          <FormInput
            control={form.control}
            name="partner2.name"
            placeholder="Name"
          />
          <CurrencyInput
            control={form.control}
            name="partner2.salary"
            placeholder="Annual Salary"
          />
          <Controller
            control={form.control}
            name="partner2.color"
            render={({ field: { onChange, value } }) => (
              <ColorPicker
                selectedColor={value as ColorName}
                onSelectColor={onChange}
              />
            )}
          />
        </View>
      </View>

      <Button
        mode="contained"
        style={styles.button}
        onPress={form.handleSubmit(onSubmit)}
      >
        {submitButtonText}
      </Button>
    </View>
  )
}
