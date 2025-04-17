import { Button, Text, View, useAppTheme } from '@/components/Themed'
import { Bill, RecurrenceType } from '@/contexts/BillsContext'
import { styles } from '@/styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { Modal, Portal, RadioButton, TextInput } from 'react-native-paper'
import { z } from 'zod'

const billSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  recurrence: z.enum(['monthly', 'annual', 'other']),
  amount: z.string().min(1, 'Amount is required')
})

type BillFormValues = z.infer<typeof billSchema>

interface BillFormProps {
  visible: boolean
  onClose: () => void
  onSubmit: (data: { name: string; description: string; recurrence: RecurrenceType; amount: number }) => void
  initialValues?: Omit<Bill, 'id'>
}

export function RegularBillForm({ visible, onClose, onSubmit, initialValues }: BillFormProps) {
  const theme = useAppTheme()

  const defaultValues: BillFormValues = {
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    recurrence: initialValues?.recurrence || 'monthly',
    amount: initialValues?.amount ? initialValues.amount.toString() : ''
  }

  const { control, handleSubmit, formState: { errors }, reset } = useForm<BillFormValues>({
    resolver: zodResolver(billSchema),
    defaultValues
  })

  const onFormSubmit = (data: BillFormValues) => {
    onSubmit({
      name: data.name,
      description: data.description || '',
      recurrence: data.recurrence,
      amount: parseFloat(data.amount)
    })
    reset(defaultValues)
    onClose()
  }

  const handleCancel = () => {
    reset(defaultValues)
    onClose()
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: theme.colors.background,
          padding: 20,
          margin: 20,
          borderRadius: 8,
          maxWidth: 500,
          width: '90%',
          alignSelf: 'center'
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <Text style={[styles.modalTitle, { textAlign: 'center' }]}>
              {initialValues ? 'Edit Bill' : 'Add New Bill'}
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginBottom: 15 }}>
                  <TextInput
                    label="Bill Name"
                    mode="flat"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={!!errors.name}
                    style={{ backgroundColor: theme.colors.background }}
                  />
                  {errors.name && (
                    <Text style={{ color: theme.colors.error, fontSize: 12 }}>
                      {errors.name.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginBottom: 15 }}>
                  <TextInput
                    label="Description (Optional)"
                    mode="flat"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    multiline
                    numberOfLines={2}
                    style={{ backgroundColor: theme.colors.background }}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginBottom: 15 }}>
                  <TextInput
                    label="Amount"
                    mode="flat"
                    value={value}
                    onChangeText={(text) => {
                      const numericValue = text.replace(/[^0-9.]/g, '')
                      onChange(numericValue)
                    }}
                    onBlur={onBlur}
                    error={!!errors.amount}
                    keyboardType="numeric"
                    left={<TextInput.Affix text="$" />}
                    style={{ backgroundColor: theme.colors.background }}
                  />
                  {errors.amount && (
                    <Text style={{ color: theme.colors.error, fontSize: 12 }}>
                      {errors.amount.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Text style={{ fontFamily: 'Bitter-Bold', marginBottom: 10 }}>Recurrence</Text>
            <Controller
              control={control}
              name="recurrence"
              render={({ field: { onChange, value } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <RadioButton value="monthly" color={theme.colors.primary} />
                    <Text>Monthly</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <RadioButton value="annual" color={theme.colors.primary} />
                    <Text>Annual</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <RadioButton value="other" color={theme.colors.primary} />
                    <Text>Other</Text>
                  </View>
                </RadioButton.Group>
              )}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Button
                mode="outlined"
                onPress={handleCancel}
                style={{ flex: 1, marginRight: 10 }}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit(onFormSubmit)}
                style={{ flex: 1, marginLeft: 10 }}
              >
                {initialValues ? 'Update' : 'Add'}
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  )
}
