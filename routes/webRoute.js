const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Employee = Model.Employee;

// ============ login =============
router.get('/login', (req, res) => {
  res.render('loginForm', {
    error: false
  })
})


// ============= dashboard =============
router.get("/dashboard", (req,res)=>{
  res.render("dashboard",{
    error:false,
  })
})
router.post('/dashboard', (req, res) => {
  Employee.findAll({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
    .then(function(dataEmployee) {
      res.render('dashboard', {
        dataEmployee: dataEmployee,
        error: false
      })
    })
    .catch(function(err){
      res.render("dashboard", {
        error: true,
        err: err.message}
      )
    })
})


module.exports = router
