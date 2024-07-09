
import {consultarProducto, editarProducto} from "./api.js"

const nombreInput = document.querySelector('#nombre')
const precioInput = document.querySelector('#precio')
const categoriaInput = document.querySelector('#categoria')
const idInput = document.querySelector('#id')
const formulario = document.querySelector('#formulario')


document.addEventListener('DOMContentLoaded', async ()=>{
    const parametroURL = new URLSearchParams(window.location.search)
    //console.log(parametroURL)

    const idProducto = parametroURL.get('id')
    //console.log(idProducto)

    const producto = await consultarProducto(idProducto)
    //console.log(producto)

    mostrarProducto(producto)
})

formulario.addEventListener('submit', validarProducto )

 function mostrarProducto (producto){
    const {nombre, precio, categoria, id} = producto

    nombreInput.value = nombre
    precioInput.value = precio
    categoriaInput.value = categoria
    idInput.value = id
 }

async function validarProducto (e){

    e.preventDefault()

    const productoObjeto = {
        nombre: nombreInput.value,
        precio: precioInput.value,
        categoria: categoriaInput.value,
        id: idInput.value
    }

    if(validar(productoObjeto)){
        await editarProducto(productoObjeto)
        window.location.href = 'index.html'
    }

 }

 function validar (objeto){

    return Object.values(objeto).every(i=>i!=='')

 }