import { z } from 'zod'

// Zod schema for partner form
export const partnerFormSchema = z.object({
  partner1: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    salary: z
      .string()
      .min(1, { message: 'Salary is required' })
      .refine(
        (val) => {
          // Remove currency formatting for validation
          const numericValue = val.replace(/[^0-9.]/g, '')
          return !isNaN(Number(numericValue)) && Number(numericValue) > 0
        },
        {
          message: 'Salary must be a positive number'
        }
      )
  }),
  partner2: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    salary: z
      .string()
      .min(1, { message: 'Salary is required' })
      .refine(
        (val) => {
          // Remove currency formatting for validation
          const numericValue = val.replace(/[^0-9.]/g, '')
          return !isNaN(Number(numericValue)) && Number(numericValue) > 0
        },
        {
          message: 'Salary must be a positive number'
        }
      )
  })
})

// Zod schema for bill form
export const billFormSchema = z.object({
  amount: z
    .string()
    .min(1, { message: 'Bill amount is required' })
    .refine(
      (val) => {
        // Remove currency formatting for validation
        const numericValue = val.replace(/[^0-9.]/g, '')
        return !isNaN(Number(numericValue)) && Number(numericValue) > 0
      },
      {
        message: 'Bill amount must be a positive number'
      }
    )
})

// Types inferred from zod schemas
export type PartnerFormValues = z.infer<typeof partnerFormSchema>
export type BillFormValues = z.infer<typeof billFormSchema>

// Type for split results
export type SplitResult = {
  partner1Amount: number
  partner2Amount: number
}
