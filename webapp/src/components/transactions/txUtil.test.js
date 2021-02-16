import { getBarChartData } from './txUtil'

describe('getBarChartData', () => {
  it('should format transaction data for use in recharts', () => {
    const data = [
      { user_id: '1', amount: 200 },
      { user_id: '2', amount: 700 },
      { user_id: '1', amount: 100 },
      { user_id: '1', amount: 500 }
    ]

    const expected = [
      { name: '1', amt: 800 },
      { name: '2', amt: 700 }
    ]

    const result = getBarChartData('user_id', data)

    expect(result).toEqual(expected)
  })
})
