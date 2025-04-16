import { AcornDecoration } from '@/components/AcornDecoration'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { PartnerForm } from '@/components/PartnerForm'
import { Text, View } from '@/components/Themed'
import { zodResolver } from '@hookform/resolvers/zod'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { styles } from '@/styles'
import { PartnerFormValues, partnerFormSchema } from '@/types'

export default function PartnersScreen() {
  // State to track if data is loading
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Router for navigation
  const router = useRouter()

  // Partner form setup with react-hook-form
  const partnerForm = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      partner1: { name: '', salary: '' },
      partner2: { name: '', salary: '' }
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
        // If we already have partner data, navigate to the calculator
        router.push('/equityCalculator/singleBill')
      }
    } catch (error) {
      console.error('Error loading partners data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to save partners data
  const savePartnersData = async (data: PartnerFormValues) => {
    try {
      setIsLoading(true)
      await AsyncStorage.setItem('partnersData', JSON.stringify(data))
      // Navigate to the calculator screen after saving
      router.push('/equityCalculator/singleBill')
    } catch (error) {
      console.error('Error saving partners data:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
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
        <View style={styles.titleContainer}>
          <AcornDecoration size={32} style={styles.acornDecoration} />
          <Text style={styles.title}>ChipJar</Text>
          <AcornDecoration size={32} style={styles.acornDecoration} />
        </View>
        <Text style={styles.subtitle}>Split bills based on income</Text>

        <PartnerForm form={partnerForm} onSubmit={savePartnersData} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
