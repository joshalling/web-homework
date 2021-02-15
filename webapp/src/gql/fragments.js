import gql from 'graphql-tag'

export const txTableTransaction = gql`
  fragment TxTableTransaction on Transaction {
    id
    user_id
    description
    merchant_id
    debit
    credit
    amount
  }
`
