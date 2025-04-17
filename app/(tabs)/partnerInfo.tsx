import { AcornDecoration } from '@/components/AcornDecoration'
import { ColorName, materialColors } from '@/components/ColorPicker'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { PartnerForm } from '@/components/PartnerForm'
import { Text, View } from '@/components/Themed'
import { ThemedContainer } from '@/components/ThemedContainer'
import { usePartnerData } from '@/contexts/PartnerDataContext'
import { styles } from '@/styles'
import { PartnerFormValues, partnerFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

export default function PartnerInfoScreen() {
  const { partners, isLoading, savePartners } = usePartnerData()

  // Generate two different random colors for partners
  const randomColors = useMemo(() => {
    const colorKeys = Object.keys(materialColors) as ColorName[]
    const color1 = colorKeys[Math.floor(Math.random() * colorKeys.length)]

    // Ensure color2 is different from color1
    let color2
    do {
      color2 = colorKeys[Math.floor(Math.random() * colorKeys.length)]
    } while (color2 === color1)

    return { color1, color2 }
  }, [])

  const partnerForm = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      partner1: { name: '', salary: '', color: randomColors.color1 },
      partner2: { name: '', salary: '', color: randomColors.color2 }
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
    <ThemedContainer>
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
    </ThemedContainer>
  )
}
