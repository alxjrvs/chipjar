/**
 * Formats a number as US currency
 * @param value - The number to format
 * @returns Formatted string (e.g., "$1,234.56")
 */
export function formatCurrency(value: string | number): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) {
    return '$0'
  }

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
  return formattedValue.replace(/[^0-9.]/g, '')
}

/**
 * Formats a number with commas but no currency symbol
 * @param value - The number to format
 * @returns Formatted string with commas (e.g., "1,234.56")
 */
export function formatNumberWithCommas(value: string | number): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) {
    return '0'
  }

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
  const numericValue = parseCurrencyInput(input)

  if (!numericValue || isNaN(parseFloat(numericValue))) {
    return ''
  }

  return formatNumberWithCommas(numericValue)
}
