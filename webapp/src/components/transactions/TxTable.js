import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { css } from '@emotion/core'
import { convertToRomanNumeral } from './txUtil'

const styles = css`
 .header {
   font-weight: bold;
 }

 td {
   padding: 4px 8px;
 }
`

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

export function TxTable (props) {
  const { data, isRoman } = props
  return (
    <table css={styles}>
      <tbody>
        <tr className='header'>
          <td >ID</td>
          <td >User</td>
          <td >Description</td>
          <td >Merchant</td>
          <td >Debit</td>
          <td >Credit</td>
          <td >Amount</td>
        </tr>
        {
          data.map(tx => {
            const { id, user: { firstName, lastName }, description, merchant: { name: merchantName }, debit, credit, amount } = tx
            const formatedAmount = isRoman ? convertToRomanNumeral(amount) : `$${(amount / 100).toFixed(2)}`
            return (
              <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
                <td data-testid={makeDataTestId(id, 'userId')}>{firstName} {lastName}</td>
                <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
                <td data-testid={makeDataTestId(id, 'merchant')}>{merchantName}</td>
                <td data-testid={makeDataTestId(id, 'debit')}>{debit && 'X'}</td>
                <td data-testid={makeDataTestId(id, 'credit')}>{credit && 'X'}</td>
                <td data-testid={makeDataTestId(id, 'amount')}>{formatedAmount}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>

  )
}

TxTable.propTypes = {
  isRoman: bool,
  data: arrayOf(shape({
    id: string,
    user: shape({
      id: string,
      firstName: string,
      lastName: string
    }),
    description: string,
    merchant: shape({
      id: string,
      name: string
    }),
    debit: bool,
    credit: bool,
    amount: number
  }))
}
