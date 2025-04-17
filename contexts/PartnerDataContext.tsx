import { PartnerFormValues } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface PartnerDataContextType {
  partners: PartnerFormValues | null
  isLoading: boolean
  savePartners: (data: PartnerFormValues) => Promise<void>
}

const initialState: PartnerDataContextType = {
  partners: null,
  isLoading: true,
  savePartners: async () => {}
}

const PartnerDataContext = createContext<PartnerDataContextType>(initialState)

export function PartnerDataProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [partners, setPartners] = useState<PartnerFormValues | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    loadPartnerData()
  }, [])

  const loadPartnerData = async () => {
    try {
      setIsLoading(true)
      const savedPartnersData = await AsyncStorage.getItem('partnersData')
      if (savedPartnersData) {
        const parsedData = JSON.parse(savedPartnersData) as PartnerFormValues
        setPartners(parsedData)
      } else {
        setPartners(null)
      }
    } catch (error) {
      console.error('Error loading partner data:', error)
      setPartners(null)
    } finally {
      setIsLoading(false)
    }
  }

  const savePartners = async (data: PartnerFormValues) => {
    try {
      setIsLoading(true)
      await AsyncStorage.setItem('partnersData', JSON.stringify(data))
      setPartners(data)
    } catch (error) {
      console.error('Error saving partner data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    partners,
    isLoading,
    savePartners
  }

  return (
    <PartnerDataContext.Provider value={value}>
      {children}
    </PartnerDataContext.Provider>
  )
}

export function usePartnerData() {
  const context = useContext(PartnerDataContext)
  if (context === undefined) {
    throw new Error('usePartnerData must be used within a PartnerDataProvider')
  }
  return context
}
