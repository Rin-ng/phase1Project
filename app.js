const express = require('express')
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
let ejs = require('ejs')
app.set('view engine', 'ejs')
app.set('views', '/views')

app.use((req,res,next)=>{
  res.locals.helper = require('./helper/idrFormat.js')
  next()
})

app.use((req,res,next)=>{
  res.locals.quantityIngredientHelper = require('./helper/quantityIngredientHelper.js')
  next()
})

//================= home route============
const homeRoutes = require('./routes/home');
app.use('/',homeRoutes)

//================= login route============
const webRoute = require('./routes/webRoute');
app.use('/',webRoute)

//================= employee list =========
// const employeeRoutes = require('./routes/employee');
// app.use('/employees',employeeRoutes)

app.listen(3000, () => console.log('Example app listening on port 3000!'))