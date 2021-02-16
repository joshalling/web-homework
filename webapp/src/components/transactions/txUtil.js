export const getBarChartData = (groupKey, data) => {
  const groupedData = {}
  const chartData = []
  data.forEach(tx => {
    groupedData[tx[groupKey]] = groupedData[tx[groupKey]] ? groupedData[tx[groupKey]] + tx.amount : tx.amount
  })

  for (let i in groupedData) {
    chartData.push({ name: i, amt: groupedData[i] })
  }
  return chartData
}
