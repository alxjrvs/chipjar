import { AcornDecoration } from '@/components/AcornDecoration'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { PartnerForm } from '@/components/PartnerForm'
import { Text, View } from '@/components/Themed'
import { usePartnerData } from '@/contexts/PartnerDataContext'
import { styles } from '@/styles'
import { PartnerFormValues, partnerFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

export default function PartnerInfoScreen() {
  const { partners, isLoading, savePartners } = usePartnerData()
  const partnerForm = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      partner1: { name: '', salary: '' },
      partner2: { name: '', salary: '' }
    }
  })

  useEffect(() => {
    if (partners) {
      partnerForm.reset(partners)
    }
  }, [partners, partnerForm])

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
          <Text style={styles.title}>Partner Information</Text>
          <AcornDecoration size={32} style={styles.acornDecoration} />
        </View>
        <Text style={styles.subtitle}>
          Enter partner details for bill splitting
        </Text>

        <PartnerForm
          form={partnerForm}
          onSubmit={savePartners}
          submitButtonText={
            partnerForm.getValues().partner1.name
              ? 'Update Partners'
              : 'Save Partners'
          }
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
