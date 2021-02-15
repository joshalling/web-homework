import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen } from '@testing-library/react'
import CreateTx, { CREATE_TX_MUTATION } from './CreateTx'
import { MemoryRouter } from 'react-router-dom'

const mock = {
  request: {
    query: CREATE_TX_MUTATION,
    variables: {
      amount: 7462,
      credit: true,
      debit: false,
      description: 'Transaction Number 1',
      merchantId: '156060b0-5910-4e14-a5c8-45be271cc0c4',
      userId: '97e02774-c717-475d-99da-d00a4b4fec4f'
    }
  },
  newData: jest.fn(() => ({
    data: {
      createTransaction: {
        id: '88c99ef0-fd14-4dc0-a074-ac8ed79b624b',
        amount: 7462,
        credit: true,
        debit: false,
        description: 'Transaction Number 1',
        merchantId: '156060b0-5910-4e14-a5c8-45be271cc0c4',
        userId: '97e02774-c717-475d-99da-d00a4b4fec4f'
      }
    }
  }))
}

describe('Create Transaction', () => {
  it('should call createTransaction when submit is clicked', async () => {
    const initialState = {
      amount: '7462',
      type: 'credit',
      description: 'Transaction Number 1',
      merchantId: '156060b0-5910-4e14-a5c8-45be271cc0c4',
      userId: '97e02774-c717-475d-99da-d00a4b4fec4f'
    }

    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(() => [initialState, () => {}])

    render(
      <MemoryRouter>
        <MockedProvider mocks={[mock]}>
          <CreateTx />
        </MockedProvider>
      </MemoryRouter>
    )

    const submitBtn = screen.getByDisplayValue('Submit')
    fireEvent.click(submitBtn)

    expect(mock.newData).toHaveBeenCalled()

    useStateSpy.mockRestore()
  })

  it('should update state when inputs are changed', async () => {
    render(
      <MockedProvider mocks={[mock]}>
        <MemoryRouter>
          <CreateTx />
        </MemoryRouter>
      </MockedProvider>
    )

    const descriptionInput = screen.getByLabelText('Description:')
    fireEvent.change(descriptionInput, { target: { value: 'Changed description' } })

    screen.getByDisplayValue('Changed description')
  })
})
