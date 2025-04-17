import { materialColors } from '@/components/ColorPicker'
import { z } from 'zod'

export const partnerFormSchema = z.object({
  partner1: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    salary: z
      .string()
      .min(1, { message: 'Salary is required' })
      .refine(
        (val) => {
          const numericValue = val.replace(/[^0-9.]/g, '')
          return !isNaN(Number(numericValue)) && Number(numericValue) > 0
        },
        {
          message: 'Salary must be a positive number'
        }
      ),
    color: z
      .string()
      .refine((val) => Object.keys(materialColors).includes(val), {
        message: 'Invalid color selection'
      })
  }),
  partner2: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    salary: z
      .string()
      .min(1, { message: 'Salary is required' })
      .refine(
        (val) => {
          const numericValue = val.replace(/[^0-9.]/g, '')
          return !isNaN(Number(numericValue)) && Number(numericValue) > 0
        },
        {
          message: 'Salary must be a positive number'
        }
      ),
    color: z
      .string()
      .refine((val) => Object.keys(materialColors).includes(val), {
        message: 'Invalid color selection'
      })
  })
})

export const billFormSchema = z.object({
  amount: z
    .string()
    .min(1, { message: 'Bill amount is required' })
    .refine(
      (val) => {
        const numericValue = val.replace(/[^0-9.]/g, '')
        return !isNaN(Number(numericValue)) && Number(numericValue) > 0
      },
      {
        message: 'Bill amount must be a positive number'
      }
    )
})

export type PartnerFormValues = z.infer<typeof partnerFormSchema>
export type BillFormValues = z.infer<typeof billFormSchema>

export type SplitResult = {
  partner1Amount: number
  partner2Amount: number
}
