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

export const userOptionUser = gql`
  fragment UserOptionUser on User {
    id
    firstName
    lastName
  }
`

export const merchantOptionMerchant = gql`
  fragment MerchantOptionMerchant on Merchant {
    id
    name
  }
`
