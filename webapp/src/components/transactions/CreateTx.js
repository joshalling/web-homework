import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import uniqBy from 'lodash.uniqby'
import { merchantOptionMerchant, txTableTransaction, userOptionUser } from '../../gql/fragments'
import TxForm from './TxForm'

export const CREATE_TX_MUTATION = gql`
  mutation CreateTransaction(
    $userId: ID!, 
    $description: String!, 
    $merchantId: ID!, $debit: Boolean!, 
    $credit: Boolean!, 
    $amount: Int!
  ) {
    createTransaction(
      userId: $userId,
      description: $description, 
      merchantId: $merchantId, 
      debit: $debit, 
      credit: $credit, 
      amount: $amount
    ) {
      ...TxTableTransaction
    }
  }
  ${txTableTransaction}
`

export const USERS_QUERY = gql`
  query Users {
    users {
      ...UserOptionUser
    }
  }
  ${userOptionUser}
`

export const MERCHANTS_QUERY = gql`
  query Merchants {
    merchants {
      ...MerchantOptionMerchant
    }
  }
  ${merchantOptionMerchant}
`

const initialState = {
  amount: '',
  type: '',
  description: '',
  userId: '',
  merchantId: ''
}

function CreateTx (props) {
  const [formState, setFormState] = React.useState(initialState)
  const { data: { users } = {} } = useQuery(USERS_QUERY)
  const { data: { merchants } = {} } = useQuery(MERCHANTS_QUERY)
  const [saveTransaction, { loading }] = useMutation(CREATE_TX_MUTATION, { onCompleted: () => setFormState(initialState) })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, type, description, userId, merchantId } = formState
    saveTransaction({
      variables: { amount: parseInt(amount), credit: type === 'credit', debit: type === 'debit', description, userId, merchantId },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            transactions (existing) {
              return uniqBy([...existing, { __ref: cache.identify(data.createTransaction) }], '__ref')
            }
          }
        })
      }
    })
  }

  const handleChange = (name, value) => {
    setFormState(state => ({ ...state, [name]: value }))
  }

  return (
    <TxForm
      formState={formState}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      merchants={merchants}
      users={users}
    />
  )
}

export default CreateTx
