function formatQuantity(params){
let ingredientQuantity =params.Recipe.quantity
return `${ingredientQuantity} tbsp`

}


module.exports = {
  quantityFormat :formatQuantity
}
