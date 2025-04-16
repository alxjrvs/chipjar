import { BillForm } from '@/components/BillForm'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { ResultsModal } from '@/components/ResultsModal'
import { calculateBillSplit } from '@/utils/billSplitCalculator'
import { zodResolver } from '@hookform/resolvers/zod'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { styles } from '@/styles'
import {
  BillFormValues,
  PartnerFormValues,
  SplitResult,
  billFormSchema
} from '@/types'

export default function CalculatorScreen() {
  // State to track if data is loading
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // State for split results
  const [splitResults, setSplitResults] = useState<SplitResult | null>(null)

  // State for partner data
  const [partnerData, setPartnerData] = useState<PartnerFormValues | null>(null)

  // Router for navigation
  const router = useRouter()

  // Bill form setup with react-hook-form
  const billForm = useForm<BillFormValues>({
    resolver: zodResolver(billFormSchema),
    defaultValues: {
      amount: ''
    }
  })

  // Load saved partners data on component mount
  useEffect(() => {
    loadPartnersData()
  }, [])

  // Function to load partners data from AsyncStorage
  const loadPartnersData = async () => {
    try {
      setIsLoading(true)
      const savedPartnersData = await AsyncStorage.getItem('partnersData')
      if (savedPartnersData) {
        const parsedData = JSON.parse(savedPartnersData) as PartnerFormValues
        setPartnerData(parsedData)
      } else {
        // If no partner data exists, redirect back to the partners screen
        router.push('/equityCalculator')
      }
    } catch (error) {
      console.error('Error loading partners data:', error)
      router.push('/equityCalculator')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle bill split calculation
  const handleCalculateSplit = (data: BillFormValues) => {
    if (!partnerData) return

    const results = calculateBillSplit(data.amount, partnerData)
    setSplitResults(results)
    setModalVisible(true)
  }

  if (isLoading || !partnerData) {
    return <LoadingIndicator />
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <BillForm
          form={billForm}
          partnerData={partnerData}
          onSubmit={handleCalculateSplit}
        />

        <ResultsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          splitResults={splitResults}
          billAmount={billForm.getValues().amount}
          partnerData={partnerData}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
