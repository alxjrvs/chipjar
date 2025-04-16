import { Button, View } from '@/components/Themed'
import { styles } from '@/styles'
import { BillFormValues, PartnerFormValues } from '@/types'

import { UseFormReturn } from 'react-hook-form'
import { CurrencyInput } from './CurrencyInput'

interface BillFormProps {
  form: UseFormReturn<BillFormValues>
  partnerData: PartnerFormValues
  onSubmit: (data: BillFormValues) => void
}

export function BillForm({ form, onSubmit }: BillFormProps) {
  return (
    <View style={styles.formContainer}>
      <CurrencyInput
        control={form.control}
        name="amount"
        placeholder="Enter Bill Amount"
        style={styles.billInput}
        isBillInput={true}
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
