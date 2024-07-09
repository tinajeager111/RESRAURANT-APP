require('dotenv').config();
const express = require("express");
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const userRouter = require('')

//async function conectarDB(){
  try{
   // await mongoose.connect(process.env.token)
     mongoose.connect('')
    console.log('se ha conectado a la bd')
  }catch(error){
    console.log(error);
  }
//}

//conectarDB()

//rutas de frontend 

app.use('/',express.static(path.resolve('views', 'home')))
app.use('/administrador',express.static(path.resolve('views', 'admin')))
app.use('/mesero',express.static(path.resolve('views', 'mesero')))

//app.use('/controllers',express.static(path.resolve('controllers')))



//RUTAS  DEL BACKEND----------------------------------------------
app.use('/api/users', userRouter)


module.exports = app
