import { AcornDecoration } from '@/components/AcornDecoration'
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { Text, View, useAppTheme } from '@/components/Themed'
import { ThemedContainer } from '@/components/ThemedContainer'
import { usePartnerData } from '@/contexts/PartnerDataContext'
import { styles } from '@/styles'
import { Redirect } from 'expo-router'
import { Card } from 'react-native-paper'

export default function PartnerStatsScreen() {
  const { partners, isLoading } = usePartnerData()
  const theme = useAppTheme()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (!partners) {
    return <Redirect href="/partnerInfo" />
  }

  const partner1Salary = parseFloat(partners.partner1.salary) || 0
  const partner2Salary = parseFloat(partners.partner2.salary) || 0
  const totalSalary = partner1Salary + partner2Salary

  const partner1Percentage = totalSalary > 0 ? partner1Salary / totalSalary : 0
  const partner2Percentage = totalSalary > 0 ? partner2Salary / totalSalary : 0

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })
  }

  return (
    <ThemedContainer>
      <View style={styles.titleContainer}>
        <AcornDecoration size={32} style={styles.acornDecoration} />
        <Text style={styles.title}>Partner Stats</Text>
        <AcornDecoration size={32} style={styles.acornDecoration} />
      </View>
      <Text style={[styles.subtitle, { textAlign: 'center' }]}>
        Income distribution between partners
      </Text>

      <Card style={{ width: '100%', marginBottom: 20 }}>
        <Card.Content>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 20
            }}
          >
            <View style={{ alignItems: 'center', width: '48%' }}>
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 18,
                  marginBottom: 5
                }}
              >
                {partners.partner1.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 28,
                  color: theme.colors.primary
                }}
              >
                {formatPercentage(partner1Percentage)}
              </Text>
              <Text style={{ fontFamily: 'Bitter', marginTop: 5 }}>
                {formatCurrency(partner1Salary)}
              </Text>
            </View>

            <View style={{ alignItems: 'center', width: '48%' }}>
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 18,
                  marginBottom: 5
                }}
              >
                {partners.partner2.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 28,
                  color: theme.colors.secondary
                }}
              >
                {formatPercentage(partner2Percentage)}
              </Text>
              <Text style={{ fontFamily: 'Bitter', marginTop: 5 }}>
                {formatCurrency(partner2Salary)}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: theme.colors.surfaceVariant,
              borderRadius: 8
            }}
          >
            <Text
              style={{
                fontFamily: 'Bitter-Bold',
                textAlign: 'center',
                marginBottom: 10
              }}
            >
              Combined Income
            </Text>
            <Text
              style={{
                fontFamily: 'Bitter-Bold',
                fontSize: 24,
                textAlign: 'center',
                color: theme.colors.primary
              }}
            >
              {formatCurrency(totalSalary)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={{ width: '100%', marginBottom: 20 }}>
        <Card.Content>
          <Text
            style={{
              fontFamily: 'Bitter-Bold',
              marginBottom: 10,
              textAlign: 'center'
            }}
          >
            Bill Split Ratio
          </Text>
          <View
            style={{
              marginBottom: 10
            }}
          >
            <Text style={{ fontFamily: 'Bitter', textAlign: 'center' }}>
              For every $100 spent:
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10
            }}
          >
            <View style={{ alignItems: 'center', width: '48%' }}>
              <Text style={{ fontFamily: 'Bitter', textAlign: 'center' }}>
                {partners.partner1.name} pays
              </Text>
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 24,
                  color: theme.colors.primary
                }}
              >
                ${(partner1Percentage * 100).toFixed(2)}
              </Text>
            </View>
            <View style={{ alignItems: 'center', width: '48%' }}>
              <Text style={{ fontFamily: 'Bitter', textAlign: 'center' }}>
                {partners.partner2.name} pays
              </Text>
              <Text
                style={{
                  fontFamily: 'Bitter-Bold',
                  fontSize: 24,
                  color: theme.colors.secondary
                }}
              >
                ${(partner2Percentage * 100).toFixed(2)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ThemedContainer>
  )
}
