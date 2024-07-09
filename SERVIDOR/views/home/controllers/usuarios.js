//definir el router 
// router permit tener el CRUD, DELETE, registro, consultar 

//const { request, response } = require('express');

const userRouter=  require('express').Router();
const user = require('../../../models/usuario')

//2. registro del nombre que el usuario ingreso en el formulario 

userRouter.post('/', (req, res) =>{
    //destructuring, cuando ingresa a este metodoes porque lo estoy llamando
    //desde el js del front relacionado al formulario donde quiero registrar
    const {nombre} = req.body;
   

    //luego toca enviar a la BD 
    //validaciones a nivel backend

    if (!nombre){
        //al realizar esta validacion retorno al frontend que hay un error 
        return res.status(400).json({error:"Todos los campos son obligatorios"})
    }

    else{
        //caso en que esta correcto el dato a registrar
        //luego se envia a la bd
        console.log(nombre) //este console log va a salir en la terminal 

            //enviando a la bd

            let usuario = new user()
            usuario.nombre = nombre;
    
            async function guardarUsuario(){
                await usuario.save();// guardar en la bd 
    
                const usuarioConsulta = await user.find()
                console.log(usuarioConsulta)

                
                guardarUsuario().catch(console.error)
            }

            guardarUsuario()

        return res.status(200).json({mensaje:"Se ha creado el usuario de forma satisfactoria"})

    }
})

///userRouter.get();

//userRouter.delete();

module.exports= userRouter;