const fs = require('fs');
var express = require('express')
var router = express()

router.get('/',(req,res)=>{
  res.render('homeView',
  {home:'Simple Coffee Shop'})
})



module.exports = router
