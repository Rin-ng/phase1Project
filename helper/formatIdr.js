function formatValue (price){

  let convert = price.toLocaleString()
  return `Rp ${convert}`

}

module.exports = formatValue;