import { LoadingIndicator } from '@/components/LoadingIndicator'
import { PartnerForm } from '@/components/PartnerForm'
import { Text } from '@/components/Themed'
import { styles } from '@/styles'
import { PartnerFormValues, partnerFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native'

export default function EditPartnersScreen() {
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
        const parsedData = JSON.parse(savedPartnersData) as PartnerFormValues
        // Pre-populate the form with the saved data
        partnerForm.reset(parsedData)
      } else {
        // If no partner data exists, redirect back to the index screen
        router.replace('/equityCalculator')
      }
    } catch (error) {
      console.error('Error loading partners data:', error)
      router.replace('/equityCalculator')
    } finally {
      setIsLoading(false)
    }
  }

  // Function to save updated partners data
  const updatePartnersData = async (data: PartnerFormValues) => {
    try {
      setIsLoading(true)
      await AsyncStorage.setItem('partnersData', JSON.stringify(data))
      // Navigate back to the calculator screen after saving
      router.replace('/equityCalculator/singleBill')
    } catch (error) {
      console.error('Error saving partners data:', error)
      setIsLoading(false)
    }
  }

  // Function to cancel editing and return to calculator
  const handleCancel = () => {
    router.back()
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
        <Text style={styles.title}>Edit Partners</Text>
        <Text style={styles.subtitle}>Update partner information</Text>

        <PartnerForm
          form={partnerForm}
          onSubmit={updatePartnersData}
          submitButtonText="Update Partners"
        />

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
