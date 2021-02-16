import gql from 'graphql-tag'
import uniqBy from 'lodash.uniqby'
import React from 'react'
import { txTableTransaction } from '../../gql/fragments'

export const TRANSACTION_CREATED_SUB = gql`
  subscription TransactionCreated {
    transactionCreated {
      ...TxTableTransaction
    }
  }
  ${txTableTransaction}
`

const useTxSubscriptions = (subscribeToMore) => {
  React.useEffect(() => {
    subscribeToMore({
      document: TRANSACTION_CREATED_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newTransaction = subscriptionData.data.transactionCreated
        return { transactions: uniqBy([...prev.transactions, newTransaction], 'id') }
      }
    })
  }, [subscribeToMore])
}

export default useTxSubscriptions
