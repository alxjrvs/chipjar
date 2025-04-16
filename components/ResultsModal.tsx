import { Text, View } from '@/components/Themed'
import { styles } from '@/styles'
import { PartnerFormValues, SplitResult } from '@/types'
import { formatCurrency } from '@/utils/currencyFormatter'
import React from 'react'
import { Modal, TouchableOpacity } from 'react-native'

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
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Bill Split Results</Text>

          {splitResults && (
            <>
              <Text style={styles.resultText}>
                Total Bill: {formatCurrency(billAmount)}
              </Text>
              <View style={styles.resultItem}>
                <Text style={styles.resultName}>
                  {partnerData.partner1.name}:
                </Text>
                <Text style={styles.resultAmount}>
                  {formatCurrency(splitResults.partner1Amount)}
                </Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultName}>
                  {partnerData.partner2.name}:
                </Text>
                <Text style={styles.resultAmount}>
                  {formatCurrency(splitResults.partner2Amount)}
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
