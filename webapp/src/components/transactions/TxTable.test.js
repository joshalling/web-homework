import React from 'react'
import { render, screen } from '@testing-library/react'
import { TxTable } from './TxTable'

const transaction1 = {
  amount: 5890,
  credit: true,
  debit: false,
  description: 'Transaction Number 7',
  id: '88c99ef0-fd14-4dc0-a074-ac8ed79b624b',
  merchant_id: 'a3bfdddf-3046-4385-a54a-434a4f41935d',
  user_id: '97e02774-c717-475d-99da-d00a4b4fec4f'
}

const transaction2 = {
  amount: 7462,
  credit: true,
  debit: false,
  description: 'Transaction Number 1',
  id: '728cca1d-9e47-4e27-8014-6b439460a433',
  merchant_id: '156060b0-5910-4e14-a5c8-45be271cc0c4',
  user_id: '97e02774-c717-475d-99da-d00a4b4fec4f'
}

describe('Transactions Table', () => {
  it('should display headers', () => {
    render(<TxTable data={[]} />)

    screen.getByText('ID')
    screen.getByText('User ID')
    screen.getByText('Description')
    screen.getByText('Merchant ID')
    screen.getByText('Debit')
    screen.getByText('Credit')
    screen.getByText('Amount')
  })

  it('should render multiple rows', () => {
    render(<TxTable data={[transaction1, transaction2]} />)
  })

  it('should show the correct transaction type', () => {
    render(<TxTable data={[transaction1]} />)

    const creditCell = screen.getByTestId(`transaction-${transaction1.id}-credit`)
    expect(creditCell.innerHTML).toBe('X')
  })
  it('should show the formatted amount', () => {
    render(<TxTable data={[transaction1]} />)

    screen.getByText('$58.90')
  })
})
