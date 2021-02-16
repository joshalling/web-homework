import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

TxForm.propTypes = {
  formState: PropTypes.shape({
    id: PropTypes.string,
    amount: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    userId: PropTypes.string,
    merchantId: PropTypes.string
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  merchants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }))
}

TxForm.defaultProps = {
  loading: false,
  merchants: [],
  users: []
}

function TxForm (props) {
  const { formState, handleSubmit, handleChange, loading, merchants, users } = props

  const onChange = e => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <div>
        <label css={labelStyle} htmlFor='tx-amount'>Amount:</label>
        <input id='tx-amount' name='amount' onChange={onChange} type='number' value={formState.amount} />
      </div>
      <div>
        <p>Transaction Type:</p>
        <input checked={formState.type === 'credit'} id='tx-type-credit' name='type' onChange={onChange} type='radio' value='credit' />
        <label css={labelStyle} htmlFor='tx-type-credit'>Credit</label>
        <input checked={formState.type === 'debit'} id='tx-type-debit' name='type' onChange={onChange} type='radio' value='debit' />
        <label css={labelStyle} htmlFor='tx-type-debit'>Debit</label>
      </div>
      <div>
        <label css={labelStyle} htmlFor='tx-description'>Description:</label>
        <input id='tx-description' name='description' onChange={onChange} type='text' value={formState.description} />
      </div>
      <div>
        <label css={labelStyle} htmlFor='tx-user'>User:</label>
        <select id='tx-user' name='userId' onBlur={onChange} onChange={onChange} value={formState.userId}>
          <option disabled value=''>Select a user</option>
          {users.map(user => <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>)}
        </select>
      </div>
      <div>
        <label css={labelStyle} htmlFor='tx-merchant'>Merchant:</label>
        <select id='tx-merchant' name='merchantId' onBlur={onChange} onChange={onChange} value={formState.merchantId} >
          <option disabled value=''>Select a merchant</option>
          {merchants.map(merchant => <option key={merchant.id} value={merchant.id}>{merchant.name}</option>)}
        </select>
      </div>
      <div>
        <input disabled={loading} type='submit' value='Submit' />
      </div>
    </form>
  )
}

const labelStyle = css`
  margin-right: 8px;
`

const formStyle = css`
  display: flex;
  flex-direction: column;
  & > div:not(:first-of-type) {
    margin-top: 8px;
  }
  & p {
    margin: 0;
  }
`

export default TxForm
