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

const numeralMap = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1
}

export const convertToRomanNumeral = (num) => {
  let numerals = ''
  for (let i in numeralMap) {
    while (num >= numeralMap[i]) {
      numerals += i
      num -= numeralMap[i]
    }
  }

  return numerals
}
