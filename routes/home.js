const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Menu = Model.Menu;

router.get('/',(req,res)=>{
  Menu.findAll()
  .then(function(menu){
    res.render('homeView',
    {
      home:'Simple Coffee Shop',
      menus: menu,
      error: false
    })
  })
  .catch(function(err){
    console.log(err);
  })

})



module.exports = router
