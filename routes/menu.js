const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Menu = Model.Menu;
const Ingredient = Model.Ingredient;
const Recipe = Model.Recipe;

// ============== show menu =============
router.get('/', (req, res) => {
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

//============= edit menu ============

router.get('/:id/edit', (req, res) => {

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

router.post("/:id/edit", function(req,res){
  console.log(req.body);
})

// ============== delete menu ===========
router.get('/:id/delete', (req, res) => {
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
router.get('/add', (req, res) => {
  Ingredient.findAll()
    .then(function(ingredients) {
      res.render('addMenu', {
        ingredients
      })
    })
})


module.exports = router;