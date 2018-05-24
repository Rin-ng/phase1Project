function formatQuantity(params){
let ingredientQuantity =params.Recipe.quantity
if(params.Recipe.IngredientId === 4){
  return `${ingredientQuantity} cup`
}
else{
  return `${ingredientQuantity} tbsp`
}


}


module.exports = {
  quantityFormat :formatQuantity
}
