import React, { Fragment, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { TxTable } from '../components/transactions/TxTable'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { NavLink, Route, Switch } from 'react-router-dom'
import CreateTx from '../components/transactions/CreateTx'
import { txTableTransaction } from '../gql/fragments'
import useTxSubscriptions from '../hooks/transactions/useTxSubscriptions'
import TxCharts from '../components/transactions/TxCharts'

const TRANSACTIONS_QUERY = gql`
  query Transactions {
    transactions {
      ...TxTableTransaction
    }
  }
  ${txTableTransaction}
`

Home.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

export function Home (props) {
  const { match: { path, url } } = props
  const [isRoman, setIsRoman] = useState(false)
  const { loading, error, data = {}, subscribeToMore } = useQuery(TRANSACTIONS_QUERY)
  useTxSubscriptions(subscribeToMore)

  const checkActive = (match, { pathname }) => pathname === '/transactions'

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <h2>Transactions</h2>
        <div>
          <label htmlFor='roman-numeral'>Roman Numeral in Cents</label>
          <input checked={isRoman} id='roman-numeral' onChange={e => setIsRoman(e.target.checked)} type='checkbox' />
        </div>
      </div>
      <nav>
        <ul css={navListStyle}>
          <li>
            <NavLink activeStyle={{ color: 'red' }} as='button' isActive={checkActive} to={`${url}`}>Transactions</NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: 'red' }} as='button' to={`${url}/new`}>New Transaction</NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: 'red' }} as='button' to={`${url}/charts`}>Charts</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route component={CreateTx} path={`${path}/new`} />
        <Route path={`${path}/charts`}>
          <TxCharts data={data.transactions} />
        </Route>
        <Route exact path={path}>
          <TxTable data={data.transactions} isRoman={isRoman} />
        </Route>
      </Switch>
    </div>
  )
}

const containerStyle = css`
  max-width: 1200px;
  margin: auto;
`
const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const navListStyle = css`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin-bottom: 16px;

  & > li:not(:first-of-type) {
    margin-left: 16px;
  }

  & > li > a {
    &:visited, &:active {
      color: inherit;
    }
  }
`
