// Convert number to words (Indian numbering system)
export function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  
  if (num === 0) return 'Zero'
  
  const convertHundreds = (n) => {
    let result = ''
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' Hundred '
      n %= 100
    }
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + ' '
      n %= 10
    }
    if (n > 0) {
      result += ones[n] + ' '
    }
    return result.trim()
  }
  
  let words = ''
  const numStr = num.toFixed(2)
  const parts = numStr.split('.')
  let rupees = parseInt(parts[0])
  const paise = parseInt(parts[1] || 0)
  
  if (rupees >= 10000000) {
    words += convertHundreds(Math.floor(rupees / 10000000)) + 'Crore '
    rupees %= 10000000
  }
  if (rupees >= 100000) {
    words += convertHundreds(Math.floor(rupees / 100000)) + 'Lakh '
    rupees %= 100000
  }
  if (rupees >= 1000) {
    words += convertHundreds(Math.floor(rupees / 1000)) + 'Thousand '
    rupees %= 1000
  }
  if (rupees > 0) {
    words += convertHundreds(rupees)
  }
  
  if (words.trim() === '') words = 'Zero'
  
  words = words.trim() + ' Rupees'
  
  if (paise > 0) {
    words += ' and ' + convertHundreds(paise).trim() + ' Paise'
  }
  
  return words.trim() + ' Only'
}

