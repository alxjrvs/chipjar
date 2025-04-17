import { usePartnerData } from '@/contexts/PartnerDataContext'
import { calculateBillSplit } from '@/utils/billSplitCalculator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

export type RecurrenceType = 'monthly' | 'annual' | 'other'

export interface Bill {
  id: string
  name: string
  description: string
  recurrence: RecurrenceType
  amount: number
}

interface BillsContextType {
  bills: Bill[]
  isLoading: boolean
  addBill: (bill: Omit<Bill, 'id'>) => Promise<void>
  updateBill: (bill: Bill) => Promise<void>
  deleteBill: (id: string) => Promise<void>
  calculatePartnerAmounts: (
    billAmount: number
  ) => { partner1Amount: number; partner2Amount: number } | null
}

const initialState: BillsContextType = {
  bills: [],
  isLoading: true,
  addBill: async () => {},
  updateBill: async () => {},
  deleteBill: async () => {},
  calculatePartnerAmounts: () => null
}

const BillsContext = createContext<BillsContextType>(initialState)

export function BillsProvider({ children }: { children: React.ReactNode }) {
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { partners } = usePartnerData()

  useEffect(() => {
    loadBills()
  }, [])

  const loadBills = async () => {
    try {
      setIsLoading(true)
      const savedBills = await AsyncStorage.getItem('bills')
      if (savedBills) {
        const parsedBills = JSON.parse(savedBills) as Bill[]
        setBills(parsedBills)
      } else {
        setBills([])
      }
    } catch (error) {
      console.error('Error loading bills:', error)
      setBills([])
    } finally {
      setIsLoading(false)
    }
  }

  const saveBills = async (updatedBills: Bill[]) => {
    try {
      await AsyncStorage.setItem('bills', JSON.stringify(updatedBills))
    } catch (error) {
      console.error('Error saving bills:', error)
    }
  }

  const addBill = async (bill: Omit<Bill, 'id'>) => {
    try {
      setIsLoading(true)
      const newBill: Bill = {
        ...bill,
        id: Date.now().toString()
      }
      const updatedBills = [...bills, newBill]
      setBills(updatedBills)
      await saveBills(updatedBills)
    } finally {
      setIsLoading(false)
    }
  }

  const updateBill = async (updatedBill: Bill) => {
    try {
      setIsLoading(true)
      const updatedBills = bills.map((bill) =>
        bill.id === updatedBill.id ? updatedBill : bill
      )
      setBills(updatedBills)
      await saveBills(updatedBills)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBill = async (id: string) => {
    try {
      setIsLoading(true)
      const updatedBills = bills.filter((bill) => bill.id !== id)
      setBills(updatedBills)
      await saveBills(updatedBills)
    } finally {
      setIsLoading(false)
    }
  }

  const calculatePartnerAmounts = (billAmount: number) => {
    if (!partners) return null
    return calculateBillSplit(billAmount, partners)
  }

  const value = {
    bills,
    isLoading,
    addBill,
    updateBill,
    deleteBill,
    calculatePartnerAmounts
  }

  return <BillsContext.Provider value={value}>{children}</BillsContext.Provider>
}

export function useBills() {
  const context = useContext(BillsContext)
  if (context === undefined) {
    throw new Error('useBills must be used within a BillsProvider')
  }
  return context
}
