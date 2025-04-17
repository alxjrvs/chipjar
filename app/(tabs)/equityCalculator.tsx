import { AcornDecoration } from '@/components/AcornDecoration'
import { BillForm } from '@/components/BillForm'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { ResultsModal } from '@/components/ResultsModal'
import { Text, View } from '@/components/Themed'
import { ThemedContainer } from '@/components/ThemedContainer'
import { usePartnerData } from '@/contexts/PartnerDataContext'
import { styles } from '@/styles'
import { BillFormValues, SplitResult, billFormSchema } from '@/types'
import { calculateBillSplit } from '@/utils/billSplitCalculator'
import { parseCurrencyInput } from '@/utils/currencyFormatter'
import { zodResolver } from '@hookform/resolvers/zod'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function CalculatorScreen() {
  const { partners, isLoading } = usePartnerData()

  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const [splitResults, setSplitResults] = useState<SplitResult | null>(null)
  const billForm = useForm<BillFormValues>({
    resolver: zodResolver(billFormSchema),
    defaultValues: {
      amount: ''
    }
  })

  const handleCalculateSplit = (data: BillFormValues) => {
    if (!partners) return

    const results = calculateBillSplit(
      Number(parseCurrencyInput(data.amount)),
      partners
    )
    setSplitResults(results)
    setModalVisible(true)
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (!partners) {
    return <Redirect href="/partnerInfo" />
  }

  return (
    <ThemedContainer>
      <View style={styles.titleContainer}>
        <AcornDecoration size={32} style={styles.acornDecoration} />
        <Text style={styles.title}>Bill Splitter</Text>
        <AcornDecoration size={32} style={styles.acornDecoration} />
      </View>
      <Text style={styles.subtitle}>Split bills based on income</Text>

      <BillForm
        form={billForm}
        partnerData={partners}
        onSubmit={handleCalculateSplit}
      />

      <ResultsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        splitResults={splitResults}
        billAmount={billForm.getValues().amount}
        partnerData={partners}
      />
    </ThemedContainer>
  )
}
