const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Menu = Model.Menu;
const Ingredient = Model.Ingredient;

router.get('/',(req,res)=>{
  Menu.findAll({})
  .then(function(menu){
    // console.log(menu);
    Ingredient.findAll()
    .then(function(ingredient){
      res.render('homeView',
      {
        home:'Simple Coffee Shop',
        menus: menu,
        ingredient: ingredient,
        error: false
      })
    })
  })
  .catch(function(err){
    console.log(err);
  })

})



module.exports = router
