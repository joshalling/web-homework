import React from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { getMerchantBarChartData, getUserBarChartData } from './txUtil'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'

TxCharts.propTypes = {
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

function TxCharts (props) {
  const { data } = props
  const userData = getUserBarChartData(data)
  const MerchantData = getMerchantBarChartData(data)
  return (
    <div>
      <h3>User Amounts</h3>
      <BarChart
        data={userData}
        height={400}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5
        }}
        width={800}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='amt' fill='#4E80C5' />
      </BarChart>
      <h3>Merchant Amounts</h3>
      <BarChart
        data={MerchantData}
        height={400}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5
        }}
        width={800}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='amt' fill='#4E804E' />
      </BarChart>
    </div>
  )
}

export default TxCharts
