import { Button, View } from '@/components/Themed'
import { styles } from '@/styles'
import { BillFormValues, PartnerFormValues } from '@/types'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { BillCurrencyInput } from './BillCurrencyInput'

interface BillFormProps {
  form: UseFormReturn<BillFormValues>
  partnerData: PartnerFormValues
  onSubmit: (data: BillFormValues) => void
}

export function BillForm({ form, partnerData, onSubmit }: BillFormProps) {
  return (
    <View style={styles.formContainer}>
      <BillCurrencyInput
        control={form.control}
        name="amount"
        placeholder="Enter Bill Amount"
        style={styles.billInput}
      />

      <Button
        mode="contained"
        style={styles.equifyButton}
        onPress={form.handleSubmit(onSubmit)}
        icon="calculator"
      >
        EQUIFY
      </Button>
    </View>
  )
}
