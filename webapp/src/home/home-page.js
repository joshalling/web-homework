import React, { Fragment } from 'react'
import { gql, useQuery } from '@apollo/client'
import { TxTable } from '../components/transactions/TxTable'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { NavLink, Route, Switch } from 'react-router-dom'
import CreateTx from '../components/transactions/CreateTx'
import { txTableTransaction } from '../gql/fragments'

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
  const { loading, error, data = {} } = useQuery(TRANSACTIONS_QUERY)
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
      <h2>Transactions</h2>
      <nav>

        <ul css={navListStyle}>
          <li>
            <NavLink activeStyle={{ color: 'red' }} as='button' isActive={checkActive} to={`${url}`}>Transactions</NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: 'red' }} as='button' to={`${url}/new`}>New Transaction</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route component={CreateTx} path={`${path}/new`} />
        <Route exact path={path}>
          <TxTable data={data.transactions} />
        </Route>
      </Switch>
    </div>
  )
}

const containerStyle = css`
  max-width: 1000px;
  margin: auto;
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
