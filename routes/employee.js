const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Employee = Model.Employee;

const bcrypt = require('bcrypt')
let saltRounds = 10


//============= show employee ===========
router.get('/', (req, res) => {
  Employee.findAll()
    .then(function(dataEmployee) {
      res.render('showEmployee', {
        dataEmployee: dataEmployee,
        error: true,
        err: ""
      })
    })
    .catch(function(err) {
      res.render("showEmployee", {
        dataEmployee: dataEmployee,
        error: true,
        err: err.message
      })
    })
})

//============= add employee ============
router.get('/add', (req, res) => {
  res.render('addEmployee', {
    error: false
  })
})



//========== add employee post =========
router.post('/add', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    Employee.create({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        error: false
      })
      .then(function() {
        res.redirect('/employees')
      })
      .catch(function(err) {
        res.render("addEmployee", {
          error: true,
          err: err.message
        })
      })
  })

})


module.exports = router;
