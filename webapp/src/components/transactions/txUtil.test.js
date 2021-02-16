import { convertToRomanNumeral, getMerchantBarChartData, getUserBarChartData } from './txUtil'

describe('getUserBarChartData', () => {
  it('should format transaction data for use in user chart', () => {
    const data = [
      { user: { id: '1', firstName: 'John', lastName: 'Doe' }, amount: 200 },
      { user: { id: '2', firstName: 'Jane', lastName: 'Doe' }, amount: 700 },
      { user: { id: '1', firstName: 'John', lastName: 'Doe' }, amount: 100 },
      { user: { id: '1', firstName: 'John', lastName: 'Doe' }, amount: 500 }
    ]

    const expected = [
      { name: 'John Doe', amt: 800 },
      { name: 'Jane Doe', amt: 700 }
    ]

    const result = getUserBarChartData(data)

    expect(result).toEqual(expected)
  })
})

describe('getMerchantBarChartData', () => {
  it('should format transaction data for use in merchant chart', () => {
    const data = [
      { merchant: { id: '1', name: 'Merchant 1' }, amount: 200 },
      { merchant: { id: '2', name: 'Merchant 2' }, amount: 700 },
      { merchant: { id: '1', name: 'Merchant 1' }, amount: 100 },
      { merchant: { id: '3', name: 'Merchant 3' }, amount: 500 }
    ]

    const expected = [
      { name: 'Merchant 1', amt: 300 },
      { name: 'Merchant 2', amt: 700 },
      { name: 'Merchant 3', amt: 500 }
    ]

    const result = getMerchantBarChartData(data)

    expect(result).toEqual(expected)
  })
})

describe('convertToRomanNumeral', () => {
  it('should convert to roman numerals', () => {
    expect(convertToRomanNumeral(122)).toBe('CXXII')
  })
  it('should convert 9\'s and 4\'s to roman numerals', () => {
    expect(convertToRomanNumeral(944)).toBe('CMXLIV')
  })
})
