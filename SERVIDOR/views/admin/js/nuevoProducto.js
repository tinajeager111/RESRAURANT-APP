import { nuevoProducto } from "../../../controller/api"

const formulario = document.querySelector('#formulario')
formulario.addEventListener('submit', validarProducto)

async function validarProducto (e){
    e.preventDefaut()

    const nombre = document.querySelector('#nombre').value
    const precio = document.querySelector('#precio').value
    const categoria = document.querySelector('#categoria').value

    const producto = 
    {
        nombre,
        precio,
        categoria
    }


    if (validar (producto)){
     await nuevoProducto(producto)
     window.location.href = 'index.html'

    }
}

function validar (objeto){

    return Object.values(objeto).every(i=>i!=='')

 }