const fs = require('fs');
var express = require('express')
var router = express()
const Model = require('./../models');
const Menu = Model.Menu;
const Ingredient = Model.Ingredient;
const Recipe = Model.Recipe;
const Order = Model.Order;
const AdditionalIngredient = Model.additionalIngredient;

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
      [Ingredient, Recipe, 'IngredientId', 'ASC']
    ]
  })
  .then(function(editMenus) {
    Ingredient.findAll({
      order: [
      ['id', 'ASC']
      ]
    })
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

    let route_str = "/menu/" + `${menuId}`+"/edit";
    res.redirect(route_str);
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

    let route_str = "/menu/" + `${menuId}`+"/edit";
    res.redirect(route_str)
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

//=========== add menu ===============
router.get('/add', (req, res) => {
  res.render('addMenu', {
    error: false
  })
})

router.post("/add", function(req,res){
  let input = req.body;

  Menu.create({
    name: input.name,
    price: input.price
  })
  .then(function(){
    res.redirect("/menu")
  })
  .catch(function(err){
    res.render("addMenu", {
      error: true,
      err: err.message
    })
  })
})


//========== delete menu ===========
router.get('/:id/delete', (req, res) => {
  let menuId = req.params.id;
   Menu.destroy({
      where: {
        id: menuId,
      }
    })
    .then(function(){
      Recipe.destroy({
        where: {
          MenuId: menuId
        }
      })
      .then(function(){
        res.redirect("/menu");
      })
    })
    .catch(function(err){
      res.render("/menu", {
        error: true,
        err: err.message
      })
    })
})


//========== menu details ===========
router.get("/:id/details", function(req,res){
  let menuId = req.params.id;

  Menu.findOne({
    where: {
      id: menuId
    },
    include: [{
      model: Ingredient
    }],
    order: [
      [Ingredient, Recipe, 'IngredientId', 'ASC']
    ]
  })
  .then(function(menu){
    Ingredient.findAll({
      order:[
        ["id", "ASC"]
      ]
    })
    .then(function(ingredient){

      console.log(req.body);
      res.render("menudetails",
      {
        menus: menu,
        ingredient: ingredient,
        error: false,
      })
    })
  })
  .catch(function(err){
    Menu.findOne({
      where: {
        id: menuId
      },
      include: [{
        model: Ingredient
      }],
      order: [
        [Ingredient, Recipe, 'id', 'ASC']
      ]
    })
    .then(function(menu){
      Ingredient.findAll()
      .then(function(ingredient){
        res.render("menudetails",
        {
          menu: menu,
          ingredient: ingredient,
          error: true,
          err:err.message
        })
      })
    })
  })
})


//===== Add New Orders ====
router.post("/:id/details/add", function(req,res){
  let input = req.body;
  let id = Number(req.params.id);

  Order.create({
    MenuId: id,
    customerName: input.customerName
  })
  .then(function(order){

    let additionalIngredients = [];

    for (let key in input) {
      if (key !== 'customerName' && input[key] !== '') {
        const IngredientId = Number(key);
        const addOn = Number(input[key]);
        additionalIngredients.push({ OrderId: order.id, IngredientId, addOn });
      }
    }
    AdditionalIngredient.bulkCreate( additionalIngredients)
    .then(function(){
      AdditionalIngredient.findAll({
        include: [
          {
            model: Order,
            where: {id : order.id},
            include: [ { model: Menu } ]
          },
          {
            model: Ingredient
          }
        ]
      })
      .then(function(specialOrder){
        let addOnPrice = 0;
        let addOnQty = [];
        let ingredient = []
        let price = []
        let menuPrice = specialOrder[0].Order.Menu.price;
        for(let i = 0; i < specialOrder.length; i++){
          addOnPrice += (Number(specialOrder[i].Ingredient.price) * Number(specialOrder[i].addOn));
          ingredient.push(specialOrder[i].Ingredient.name);
          addOnQty.push(specialOrder[i].addOn);
          price.push(Number(specialOrder[i].Ingredient.price) * Number(specialOrder[i].addOn))
      }

        let totalPrice = menuPrice + addOnPrice;
        let orderId = specialOrder[0].Order.id;


        Order.update({
          totalPrice: totalPrice
        }, {where: {id: orderId}})
        .then(function(order){
          res.render("showTotal",
          {
            menus: specialOrder[0].Order.Menu,
            ingredient: ingredient,
            addOn: addOnQty,
            error: false,
            price: price,
            totalPrice: totalPrice,
            customerName: specialOrder[0].Order.customerName
          })
        })
      })
    })
  })
  .catch(function(err){
    res.render(err);
  })
})


module.exports = router;