const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Menu = Model.Menu;
const Ingredient = Model.Ingredient;
const Recipe = Model.Recipe;
const Order = Model.Order;
const AdditionalIngredient = Model.additionalIngredient;



//============ ORDERS ================

// ==== show all ====

router.get('/', function (req, res) {
  Order.findAll({
    include: [
      {
        model: AdditionalIngredient,
        include: [ { model: Ingredient } ]
      },
      {
        model: Menu
      }

    ],
    order: [
      ['id', 'ASC']

    ]
  })
  .then(function(orders){
    res.render("showOrders", {
      orders: orders,
      error: false
    })
  })
  .catch(function(err){
    res.render("showOrders", {
      orders: orders,
      error: true,
      err: err.message
    })
  })
})



// ===== Delete =====

router.get("/:id/delete", function(req,res){
  let orderId = req.params.id;
  // console.log(orderId)
  Order.destroy({
     where: {
       id: orderId
     }
   })
 .then(function() {
   AdditionalIngredient.destroy({
     where:{
       OrderId: orderId
     }
   })
   .then(function(){
     res.redirect('/orders')
   })
 })
 .catch(function(err){
   Order.findAll({
     include: [
       {
         model: AdditionalIngredient,
         include: [ { model: Ingredient } ]
       },
       {
         model: Menu
       }
     ]
   })
   .then(function (orders){
     res.render("showOrders", {
       orders: orders,
       error: true,
       err: err.message
     })
   })
 })
})

module.exports = router
