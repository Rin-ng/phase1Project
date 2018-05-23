const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Employee = Model.Employee;


//============= show employee ===========
router.get('/', (req, res) => {
  Employee.findAll()
    .then(function(dataEmployee) {
      res.render('showEmployee', {
        dataEmployee
      })
    })
})

//============= add employee ============
router.get('/add', (req, res) => {
  res.render('addEmployee')
})

//========== add employee post =========
router.post('/add', (req, res) => {
  Employee.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.username
    })
    .then(function() {
      res.redirect('/')
    })
})


module.exports = router;