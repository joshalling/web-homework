import gql from 'graphql-tag'
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
        return { transactions: [...prev.transactions, newTransaction] }
      }
    })
  }, [subscribeToMore])
}

export default useTxSubscriptions
