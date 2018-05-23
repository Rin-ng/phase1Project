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
        menus: menus,
        error: false
      })
    })
    .catch(function(err){
      res.render("menu", {
        error: true,
        err: err.message}
      )
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
        editMenus: editMenus,
        error: false
      })
    })
  })
  .catch(function(err){
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
        res.render("editMenu", {
          ingredient: ingredients,
          editMenus: editMenus,
          error: true,
          err: err.message
        })
      })
    })
  })
})

router.post("/:id/edit", function(req,res){
  let input = req.body;
  let menuId = req.params.id;
  Recipe.create({
    MenuId: menuId,
    IngredientId: input.ingredient,
    quantity: input.qty
  })
  .then(function(){
    res.redirect("/menu");
  })
  .catch(function(err){
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
        res.render("editMenu", {
          ingredient: ingredients,
          editMenus: editMenus,
          error: true,
          err: err.message
        })
      })
    })
  })
})

// ============== delete Ingredient ===========
router.get('/:menuId/:ingId/delete', (req, res) => {
  let ingredientId = req.params.ingId;
  let menuId = req.params.menuId;

   Recipe.destroy({
      where: {
        MenuId: menuId,
        IngredientId : ingredientId
      }
    })
  .then(function() {
    res.redirect('/menu')
  })
  .catch(function(err){
    //???
  })
})

//=========== add menu ===============
router.get('/add', (req, res) => {
  Ingredient.findAll()
  .then(function(ingredients) {
    res.render('addMenu', {
      ingredients: ingredients,
      error: false
    })
  })
  .catch(function(err){
    Ingredient.findAll()
    .then(function(ingredients) {
      res.render('addMenu', {
        error: true,
        err: err.message
      })
    })
  })
})


//========== delete menu ===========



module.exports = router;