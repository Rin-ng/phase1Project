const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Employee = Model.Employee;
const bcrypt = require('bcrypt')
let saltRounds = 10
const {authLogin} = require('../middlewares/auth.js');



// ============ login =============
router.get('/login', (req, res) => {
  res.render('loginForm', {
    error: false
  })
})


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>   lagi kerjain ini >>>>>>>>>>>>>>>>>>>>>
//========== login bcrypt and session ==========

router.post('/login',(req, res) => {
  // console.log('==========',req.body)
    let pass = req.body.password
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(pass, salt)
    // let compare = bcrypt.compareSync(pass, hash)
    // console.log('==========',pass)
    // console.log('========1=',hash)
      // console.log('=======2==',compare)

  Model.Employee.findOne({
    where: {
      username: req.body.username,
    }
  })
  .then(function(user) {
    // console.log(user.password)
    let compare = bcrypt.compareSync(pass, user.password)
    // console.log("---------compare-: ", compare)
    if (compare === true) {
      req.session.name = user.name,
      req.session.username = user.username,
      req.session.password = user.password
      res.redirect('/dashboard')
    }
    else {
     res.render('loginForm', {
       error: {
         message: 'incorrect password / username'
        }
      })
    }
  })
  .catch(function(err){
    res.render("loginForm", {
      error: {
        message: "Username and Password must be filled!"
      }
    })
  })
})
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>   lagi kerjain ini >>>>>>>>>>>>>>>>>>>>>



// ============= dashboard =============
router.get("/dashboard", authLogin, (req, res) => {
  res.render("dashboard", {
    error: false,
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
    .catch(function(err) {
      res.render("dashboard", {
        error: true,
        err: err.message
      })
    })
})


module.exports = router
