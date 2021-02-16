import React from 'react'
import { render, screen } from '@testing-library/react'
import TxCharts from './TxCharts'

describe('Transaction Charts', () => {
  it('should show the correct labels', async () => {
    const data = [
      {
        merchant: { id: '1', name: 'Merchant 1' },
        user: { id: '1', firstName: 'John', lastName: 'Doe' },
        amount: 200
      },
      {
        merchant: { id: '2', name: 'Merchant 2' },
        user: { id: '2', firstName: 'Jane', lastName: 'Doe' },
        amount: 700
      },
      {
        merchant: { id: '1', name: 'Merchant 1' },
        user: { id: '1', firstName: 'John', lastName: 'Doe' },
        amount: 100
      },
      {
        merchant: { id: '3', name: 'Merchant 3' },
        user: { id: '1', firstName: 'John', lastName: 'Doe' },
        amount: 500
      }
    ]

    render(<TxCharts data={data} />)

    screen.getAllByText('John Doe')
    screen.getAllByText('Jane Doe')
    screen.getAllByText('Merchant 1')
    screen.getAllByText('Merchant 2')
    screen.getAllByText('Merchant 3')
  })
})
