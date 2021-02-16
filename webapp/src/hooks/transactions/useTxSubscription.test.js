import React from 'react'
import { render } from '@testing-library/react'
import useTxSubscriptions, { TRANSACTION_CREATED_SUB } from './useTxSubscriptions'

function HookedComponent (props) {
  const { subscribeToMore } = props
  useTxSubscriptions(subscribeToMore)

  return null
}

describe('useTxSubscriptions', () => {
  it('should call subscribeToMore with transactionCreated document on mount', () => {
    const mock = jest.fn()

    render(<HookedComponent subscribeToMore={mock} />)

    expect(mock).toHaveBeenCalledWith({
      document: TRANSACTION_CREATED_SUB,
      updateQuery: expect.any(Function)
    })
  })

  it('should call subscribeToMore only on the first mount', () => {
    const mock = jest.fn()

    const { rerender } = render(<HookedComponent subscribeToMore={mock} />)
    rerender(<HookedComponent subscribeToMore={mock} />)
    rerender(<HookedComponent subscribeToMore={mock} />)

    expect(mock).toHaveBeenCalledTimes(1)
  })
})
