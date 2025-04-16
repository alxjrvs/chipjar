import { Text, View } from '@/components/Themed'
import { styles } from '@/styles'
import { PartnerFormValues } from '@/types'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
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
          <Text style={styles.partnerTitle}>Partner 1</Text>
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
        </View>

        <View style={styles.partnerSection}>
          <Text style={styles.partnerTitle}>Partner 2</Text>
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
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={form.handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  )
}
