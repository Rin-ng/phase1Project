const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Employee = Model.Employee;

// ============ login =============
router.get('/login', (req, res) => {
  res.render('loginForm')
})


// ============= dashboard =============
router.post('/dashboard', (req, res) => {
  Employee.findAll({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })
    .then(function(dataEmployee) {
      res.render('dashboard', {
        dataEmployee
      })
    })
    .catch(function(err){

    })
})


module.exports = router
