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
  handleChange: PropTypes.func.isRequired
}

function TxForm (props) {
  const { formState, handleSubmit, handleChange } = props

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
        <input id='tx-user' name='userId' onChange={onChange} type='text' value={formState.userId} />
      </div>
      <div>
        <label css={labelStyle} htmlFor='tx-merchant'>Merchant:</label>
        <input id='tx-merchant' name='merchantId' onChange={onChange} type='text' value={formState.merchantId} />
      </div>
      <div>
        <input type='submit' value='Submit' />
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
