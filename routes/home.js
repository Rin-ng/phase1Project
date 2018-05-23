const fs = require('fs');
var express = require('express')
var router = express()
// const Model = require('./../models');


router.get('/',(req,res)=>{
  res.render('homeView',
  {home:'Simple Coffee Shop'})
})



module.exports = router
