const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Menu = Model.Menu;
const Employee = Model.Employee;
const Ingredient = Model.Ingredient;
const Recipe = Model.Recipe;

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


// ============== show menu =============
router.get('/menu', (req, res) => {
  Menu.findAll({
      include: [{
        model: Ingredient
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
  Employee.findAll()
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
  Employee.create({
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

  Menu.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Ingredient
    }],
    order: [
      [Ingredient, Recipe, 'id', 'ASC']
    ]
  })
  .then(function(editMenus) {
    Ingredient.findAll()
    .then(function(ingredients){
      res.render('editMenu', {
        ingredient: ingredients,
        editMenus,
      })
    // res.send(editMenus)
    })
  })
  .catch(function(err){
    console.log(err);
  })
})

router.post("/menu/:id/edit", function(req,res){
  
})

// ============== delete menu ===========
router.get('/menu/:id/delete', (req, res) => {
  Menu.destroy({
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
  Ingredient.findAll()
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
