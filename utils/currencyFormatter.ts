/**
 * Formats a number as US currency
 * @param value - The number to format
 * @returns Formatted string (e.g., "$1,234.56")
 */
export function formatCurrency(value: string | number): string {
  // Convert to number and handle empty or invalid input
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) {
    return '$0'
  }

  // Format as US currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numValue)
}

/**
 * Removes currency formatting and returns a numeric string
 * @param formattedValue - The formatted currency string
 * @returns Clean numeric string
 */
export function parseCurrencyInput(formattedValue: string): string {
  // Remove currency symbol, commas, and other non-numeric characters except decimal point
  return formattedValue.replace(/[^0-9.]/g, '')
}

/**
 * Formats a number with commas but no currency symbol
 * @param value - The number to format
 * @returns Formatted string with commas (e.g., "1,234.56")
 */
export function formatNumberWithCommas(value: string | number): string {
  // Convert to number and handle empty or invalid input
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) {
    return '0'
  }

  // Format with commas but no currency symbol
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numValue)
}

/**
 * Formats user input as currency while typing
 * @param input - Raw user input
 * @returns Formatted currency string without $ symbol
 */
export function formatCurrencyInput(input: string): string {
  // Parse the input to get a clean number
  const numericValue = parseCurrencyInput(input)

  if (!numericValue || isNaN(parseFloat(numericValue))) {
    return ''
  }

  // Format with commas but no currency symbol
  return formatNumberWithCommas(numericValue)
}
