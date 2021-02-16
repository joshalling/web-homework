import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { fireEvent, render, screen } from '@testing-library/react'
import CreateTx, { CREATE_TX_MUTATION, MERCHANTS_QUERY, USERS_QUERY } from './CreateTx'
import { MemoryRouter } from 'react-router-dom'

const createTxMock = {
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

const userMock = {
  request: {
    query: USERS_QUERY
  },
  result: {
    data: {
      users: [
        { id: '97e02774-c717-475d-99da-d00a4b4fec4f', firstName: 'John', lastName: 'Doe' }
      ]
    }
  }
}

const merchantMock = {
  request: {
    query: MERCHANTS_QUERY
  },
  result: {
    data: {
      users: [
        { id: '156060b0-5910-4e14-a5c8-45be271cc0c4', name: 'Merchant 1' }
      ]
    }
  }
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
        <MockedProvider mocks={[createTxMock, merchantMock, userMock]}>
          <CreateTx />
        </MockedProvider>
      </MemoryRouter>
    )

    const submitBtn = screen.getByDisplayValue('Submit')
    fireEvent.click(submitBtn)

    expect(createTxMock.newData).toHaveBeenCalled()

    useStateSpy.mockRestore()
  })

  it('should update state when inputs are changed', async () => {
    render(
      <MockedProvider mocks={[createTxMock, merchantMock, userMock]}>
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
