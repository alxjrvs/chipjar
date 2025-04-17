import { LoadingIndicator } from '@/components/LoadingIndicator'
import { usePartnerData } from '@/contexts/PartnerDataContext'
import { Redirect } from 'expo-router'

export default function Index() {
  const { isLoading, hasPartnerData } = usePartnerData()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (hasPartnerData) {
    return <Redirect href="/equityCalculator" />
  } else {
    return <Redirect href="/partnerInfo" />
  }
}
