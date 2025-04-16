import {
  Button,
  Card,
  Modal,
  Portal,
  Surface,
  Text,
  View,
  useAppTheme
} from '@/components/Themed'
import { styles } from '@/styles'
import { PartnerFormValues, SplitResult } from '@/types'
import { formatCurrency } from '@/utils/currencyFormatter'
import React from 'react'

interface ResultsModalProps {
  visible: boolean
  onClose: () => void
  splitResults: SplitResult | null
  billAmount: string
  partnerData: PartnerFormValues
}

export function ResultsModal({
  visible,
  onClose,
  splitResults,
  billAmount,
  partnerData
}: ResultsModalProps) {
  const theme = useAppTheme()

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.centeredView}
      >
        <Surface style={styles.modalView}>
          <Text variant="headlineSmall" style={{ marginBottom: 20 }}>
            Bill Split Results
          </Text>

          {splitResults && (
            <Card style={{ width: '100%', marginBottom: 20 }}>
              <Card.Title title={`Total Bill: ${formatCurrency(billAmount)}`} />
              <Card.Content>
                <View style={styles.resultItem}>
                  <Text variant="titleMedium">
                    {partnerData.partner1.name}:
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ fontWeight: 'bold', color: theme.colors.primary }}
                  >
                    {formatCurrency(splitResults.partner1Amount)}
                  </Text>
                </View>
                <View style={styles.resultItem}>
                  <Text variant="titleMedium">
                    {partnerData.partner2.name}:
                  </Text>
                  <Text
                    variant="titleMedium"
                    style={{ fontWeight: 'bold', color: theme.colors.primary }}
                  >
                    {formatCurrency(splitResults.partner2Amount)}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}

          <Button mode="contained" onPress={onClose}>
            Close
          </Button>
        </Surface>
      </Modal>
    </Portal>
  )
}
