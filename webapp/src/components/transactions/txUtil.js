export const getUserBarChartData = (data) => {
  const groupedData = {}
  const chartData = []
  data.forEach(tx => {
    const name = `${tx.user.firstName} ${tx.user.lastName}`
    groupedData[name] = groupedData[name] ? groupedData[name] + tx.amount : tx.amount
  })

  for (let i in groupedData) {
    chartData.push({ name: i, amt: groupedData[i] })
  }
  return chartData
}

export const getMerchantBarChartData = (data) => {
  const groupedData = {}
  const chartData = []
  data.forEach(tx => {
    const name = tx.merchant.name
    groupedData[name] = groupedData[name] ? groupedData[name] + tx.amount : tx.amount
  })

  for (let i in groupedData) {
    chartData.push({ name: i, amt: groupedData[i] })
  }
  return chartData
}
