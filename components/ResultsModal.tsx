import {
  Button,
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
            <View style={{ width: '100%', marginBottom: 20 }}>
              {/* Side by side results with big amounts */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: 30
                }}
              >
                {/* Partner 1 */}
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: theme.colors.surfaceVariant,
                    marginRight: 10
                  }}
                >
                  <Text
                    variant="displayMedium"
                    style={{
                      fontWeight: 'bold',
                      color: theme.colors.primary,
                      marginBottom: 5,
                      textAlign: 'center',
                      fontSize: 32
                    }}
                  >
                    {formatCurrency(splitResults.partner1Amount)}
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      textAlign: 'center'
                    }}
                  >
                    {partnerData.partner1.name}
                  </Text>
                </View>

                {/* Partner 2 */}
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: theme.colors.surfaceVariant,
                    marginLeft: 10
                  }}
                >
                  <Text
                    variant="displayMedium"
                    style={{
                      fontWeight: 'bold',
                      color: theme.colors.primary,
                      marginBottom: 5,
                      textAlign: 'center',
                      fontSize: 32
                    }}
                  >
                    {formatCurrency(splitResults.partner2Amount)}
                  </Text>
                  <Text
                    variant="labelSmall"
                    style={{
                      color: theme.colors.onSurfaceVariant,
                      textAlign: 'center'
                    }}
                  >
                    {partnerData.partner2.name}
                  </Text>
                </View>
              </View>

              {/* Bill total at the bottom */}
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  padding: 10
                }}
              >
                <Text
                  variant="headlineSmall"
                  style={{
                    fontWeight: 'bold',
                    color: theme.colors.secondary
                  }}
                >
                  {formatCurrency(billAmount)}
                </Text>
              </View>
            </View>
          )}

          <Button mode="contained" onPress={onClose}>
            Close
          </Button>
        </Surface>
      </Modal>
    </Portal>
  )
}
