const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');

// ============ login =============
router.get('/login', (req, res) => {
  res.render('loginForm')
})


// ============= dashboard =============
router.post('/dashboard', (req, res) => {
  Model.Employee.findAll({
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
})


// ============== show menu =============
router.get('/menu', (req, res) => {
  Model.Menu.findAll({
      include: [{
        model: Model.Ingredient
      }],
      order: [
        ['id', 'ASC']
      ]
    })
    .then((menus) => {
      res.render('menu', {
        menus
      })
    })
})

//============= show employee ===========

router.get('/employees', (req, res) => {
  Model.Employee.findAll()
    .then(function(dataEmployee) {
      res.render('showEmployee', {
        dataEmployee
      })
    })
})

//============= add employee ============
router.get('/employees/add', (req, res) => {
  res.render('addEmployee')
})

//========== add employee post =========
router.post('/employees/add', (req, res) => {
  Model.Employee.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.username
    })
    .then(function() {
      res.redirect('/employees')
    })
})

//============= edit menu ============

router.get('/menu/:id/edit', (req, res) => {
  Model.Menu.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Model.Ingredient
      }]
    })
    .then(function(editMenus) {
      res.render('editMenu', {
        editMenus
      })
      // res.send(editMenus)
    })
})

// ============== delete menu ===========
router.get('/menu/:id/delete', (req, res) => {
  Model.Menu.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function() {
      res.redirect('/menu')
    })
})

//=========== add menu ===============
router.get('/menu/add', (req, res) => {
  Model.Ingredient.findAll()
    .then(function(ingredients) {
      res.render('addMenu', {
        ingredients
      })
    })
})

// //========== add menu post ===========
// router.post('/menu/add',(req,res)=>{
// Model.Menu.create({
//   name:req.body.name,
//   price:req.body.price
// })
// .then(()=>{
//   Model.Menu.create({
//
//   })
// })
// })

module.exports = router
