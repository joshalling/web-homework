import React from 'react'
import { render, screen } from '@testing-library/react'
import TxCharts from './TxCharts'

describe('Transaction Charts', () => {
  it('should show the correct labels', async () => {
    const data = [
      { merchant_id: 'merchant-1', user_id: 'user-1', amount: 200 },
      { merchant_id: 'merchant-2', user_id: 'user-2', amount: 700 },
      { merchant_id: 'merchant-1', user_id: 'user-1', amount: 100 },
      { merchant_id: 'merchant-3', user_id: 'user-1', amount: 500 }
    ]

    render(<TxCharts data={data} />)

    screen.getAllByText('user-1')
    screen.getAllByText('user-2')
    screen.getAllByText('merchant-1')
    screen.getAllByText('merchant-2')
    screen.getAllByText('merchant-3')
  })
})
