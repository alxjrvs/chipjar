import { AcornDecoration } from '@/components/AcornDecoration'
import { materialColors } from '@/components/ColorPicker'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { RegularBillForm } from '@/components/RegularBillForm'
import { Button, Text, View, useAppTheme } from '@/components/Themed'
import { ThemedContainer } from '@/components/ThemedContainer'
import { Bill, RecurrenceType, useBills } from '@/contexts/BillsContext'
import { usePartnerData } from '@/contexts/PartnerDataContext'
import { styles } from '@/styles'
import { FontAwesome } from '@expo/vector-icons'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { Card, Divider, FAB, IconButton, Menu } from 'react-native-paper'

export default function RegularBillsScreen() {
  const {
    bills,
    isLoading,
    addBill,
    updateBill,
    deleteBill,
    calculatePartnerAmounts
  } = useBills()
  const { partners, isLoading: partnersLoading } = usePartnerData()
  const theme = useAppTheme()

  const [formVisible, setFormVisible] = useState(false)
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
  const [menuVisible, setMenuVisible] = useState<string | null>(null)

  if (isLoading || partnersLoading) {
    return <LoadingIndicator />
  }

  if (!partners) {
    return <Redirect href="/partnerInfo" />
  }

  const handleAddBill = () => {
    setSelectedBill(null)
    setFormVisible(true)
  }

  const handleEditBill = (bill: Bill) => {
    setSelectedBill(bill)
    setFormVisible(true)
    setMenuVisible(null)
  }

  const handleDeleteBill = async (id: string) => {
    await deleteBill(id)
    setMenuVisible(null)
  }

  const handleSubmit = async (data: {
    name: string
    description: string
    recurrence: RecurrenceType
    amount: number
  }) => {
    if (selectedBill) {
      await updateBill({ ...data, id: selectedBill.id })
    } else {
      await addBill(data)
    }
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  const getRecurrenceLabel = (recurrence: RecurrenceType) => {
    switch (recurrence) {
      case 'monthly':
        return 'Monthly'
      case 'annual':
        return 'Annual'
      case 'other':
        return 'Other'
    }
  }

  const renderBillCard = (bill: Bill) => {
    const partnerAmounts = calculatePartnerAmounts(bill.amount)

    return (
      <Card key={bill.id} style={{ marginBottom: 15, overflow: 'hidden' }}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Bitter-Bold', fontSize: 18 }}>
                {bill.name}
              </Text>
              {bill.description ? (
                <Text
                  style={{ fontFamily: 'Bitter', fontSize: 14, marginTop: 2 }}
                >
                  {bill.description}
                </Text>
              ) : null}
            </View>
            <Menu
              visible={menuVisible === bill.id}
              onDismiss={() => setMenuVisible(null)}
              anchor={
                <IconButton
                  icon="dots-vertical"
                  size={20}
                  onPress={() => setMenuVisible(bill.id)}
                />
              }
            >
              <Menu.Item
                leadingIcon="pencil"
                onPress={() => handleEditBill(bill)}
                title="Edit"
              />
              <Menu.Item
                leadingIcon="delete"
                onPress={() => handleDeleteBill(bill.id)}
                title="Delete"
              />
            </Menu>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center'
            }}
          >
            <Text style={{ fontFamily: 'Bitter-Bold', fontSize: 20 }}>
              {formatCurrency(bill.amount)}
            </Text>
            <Text
              style={{
                marginLeft: 8,
                fontFamily: 'Bitter',
                fontSize: 14,
                color: theme.colors.outline
              }}
            >
              {getRecurrenceLabel(bill.recurrence)}
            </Text>
          </View>

          {partnerAmounts && (
            <>
              <Divider style={{ marginVertical: 10 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={{ fontFamily: 'Bitter', fontSize: 14 }}>
                    {partners.partner1.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Bitter-Bold',
                      color:
                        materialColors[
                          partners.partner1.color as keyof typeof materialColors
                        ]
                    }}
                  >
                    {formatCurrency(partnerAmounts.partner1Amount)}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontFamily: 'Bitter', fontSize: 14 }}>
                    {partners.partner2.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Bitter-Bold',
                      color:
                        materialColors[
                          partners.partner2.color as keyof typeof materialColors
                        ]
                    }}
                  >
                    {formatCurrency(partnerAmounts.partner2Amount)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    )
  }

  return (
    <ThemedContainer>
      <View style={styles.titleContainer}>
        <AcornDecoration size={32} style={styles.acornDecoration} />
        <Text style={styles.title}>Regular Bills</Text>
        <AcornDecoration size={32} style={styles.acornDecoration} />
      </View>
      <Text style={[styles.subtitle, { textAlign: 'center' }]}>
        Manage your recurring bills
      </Text>

      {bills.length === 0 ? (
        <Card style={{ width: '100%', marginVertical: 20 }}>
          <Card.Content style={{ alignItems: 'center', padding: 20 }}>
            <FontAwesome
              name="file-text-o"
              size={48}
              color={theme.colors.outline}
              style={{ marginBottom: 15 }}
            />
            <Text style={{ textAlign: 'center', fontFamily: 'Bitter' }}>
              No regular bills added yet.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Bitter',
                color: theme.colors.outline,
                marginBottom: 20
              }}
            >
              Add your first bill to get started.
            </Text>
            <Button mode="contained" onPress={handleAddBill}>
              Add Bill
            </Button>
          </Card.Content>
        </Card>
      ) : (
        <View style={{ width: '100%' }}>{bills.map(renderBillCard)}</View>
      )}

      <RegularBillForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={handleSubmit}
        initialValues={
          selectedBill
            ? {
                name: selectedBill.name,
                description: selectedBill.description,
                recurrence: selectedBill.recurrence,
                amount: selectedBill.amount
              }
            : undefined
        }
      />
      {bills.length > 0 && (
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.secondary
          }}
          color={theme.colors.onSecondary}
          onPress={handleAddBill}
        />
      )}
    </ThemedContainer>
  )
}
