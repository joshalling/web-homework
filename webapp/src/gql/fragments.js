import gql from 'graphql-tag'

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

export const txTableTransaction = gql`
  fragment TxTableTransaction on Transaction {
    id
    user {
      ...UserOptionUser
    }
    description
    merchant {
      ...MerchantOptionMerchant
    }
    debit
    credit
    amount
  }
  ${userOptionUser}
  ${merchantOptionMerchant}
`
