import { Text, View } from '@/components/Themed'
import { styles } from '@/styles'
import { BillFormValues, PartnerFormValues } from '@/types'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { CurrencyInput } from './CurrencyInput'

interface BillFormProps {
  form: UseFormReturn<BillFormValues>
  partnerData: PartnerFormValues
  onSubmit: (data: BillFormValues) => void
}

export function BillForm({ form, partnerData, onSubmit }: BillFormProps) {
  return (
    <View style={styles.formContainer}>
      <CurrencyInput
        control={form.control}
        name="amount"
        placeholder="Enter Bill Amount"
        style={styles.billInput}
      />

      <TouchableOpacity
        style={styles.equifyButton}
        onPress={form.handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>EQUIFY</Text>
      </TouchableOpacity>
    </View>
  )
}
