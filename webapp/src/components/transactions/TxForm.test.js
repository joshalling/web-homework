import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import TxForm from './TxForm'

describe('Transaction Form', () => {
  it('should show initial values', async () => {
    const initialState = {
      amount: '7462',
      type: 'credit',
      description: 'Transaction Number 1',
      merchantId: '156060b0-5910-4e14-a5c8-45be271cc0c4',
      userId: '97e02774-c717-475d-99da-d00a4b4fec4f'
    }

    render(<TxForm formState={initialState} handleChange={jest.fn()} handleSubmit={jest.fn()} />)

    screen.getByDisplayValue('7462')
    screen.getByDisplayValue('credit')
    screen.getByDisplayValue('Transaction Number 1')
    screen.getByDisplayValue('156060b0-5910-4e14-a5c8-45be271cc0c4')
    screen.getByDisplayValue('97e02774-c717-475d-99da-d00a4b4fec4f')
  })

  it('should update values by calling handleChange with the correct args', async () => {
    const initialState = {
      amount: '7462',
      type: 'credit',
      description: 'Transaction Number 1',
      merchantId: '156060b0-5910-4e14-a5c8-45be271cc0c4',
      userId: '97e02774-c717-475d-99da-d00a4b4fec4f'
    }

    const handleChange = jest.fn()

    render(<TxForm formState={initialState} handleChange={handleChange} handleSubmit={jest.fn()} />)

    const descriptionInput = screen.getByLabelText('Description:')
    fireEvent.change(descriptionInput, { target: { value: 'Changed description' } })

    expect(handleChange).toHaveBeenCalledWith('description', 'Changed description')
  })
})
