function addRupiah(params){
// console.log(params.price);
let price =params.price
let convert = price.toLocaleString()
return `Rp ${convert}`

}


module.exports = {
  addIdr :addRupiah
}
