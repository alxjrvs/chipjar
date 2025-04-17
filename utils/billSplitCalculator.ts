import { PartnerFormValues, SplitResult } from '@/types'
import { parseCurrencyInput } from './currencyFormatter'

export function calculateBillSplit(
  bill: number,
  partnerData: PartnerFormValues
): SplitResult {
  const salary1 = Number(parseCurrencyInput(partnerData.partner1.salary))
  const salary2 = Number(parseCurrencyInput(partnerData.partner2.salary))
  const totalSalary = salary1 + salary2

  let partner1Proportion = salary1 / totalSalary
  let partner2Proportion = salary2 / totalSalary

  let partner1Amount = bill * partner1Proportion
  let partner2Amount = bill * partner2Proportion

  if (salary1 > salary2) {
    partner1Amount = Math.ceil(partner1Amount * 100) / 100
    partner2Amount = Math.floor(partner2Amount * 100) / 100
  } else {
    partner1Amount = Math.floor(partner1Amount * 100) / 100
    partner2Amount = Math.ceil(partner2Amount * 100) / 100
  }

  const calculatedTotal = partner1Amount + partner2Amount
  if (calculatedTotal !== bill) {
    const diff = bill - calculatedTotal
    if (salary1 > salary2) {
      partner1Amount += diff
    } else {
      partner2Amount += diff
    }
  }

  return {
    partner1Amount,
    partner2Amount
  }
}
