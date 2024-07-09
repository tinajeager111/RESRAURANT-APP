const mongoose = require('mongoose')
const userRouter = require('../views/home/controllers/usuarios');

const usuario = new mongoose.Schema({
  nombre: String
})

//respuesta del usuario en el esquema

usuario.set('toJSON', {
  transform:  (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

//registrar el modelo

const user = mongoose.model('User', usuario)

//exportar 

module.exports = user