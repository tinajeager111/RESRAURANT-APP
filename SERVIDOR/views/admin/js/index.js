//colocar en el html 

//<script src="index.js" type="module"></script> para exportar de otro script

import {consultarProductos, eliminarProducto} from "../controller/api.js"

const listado = document.querySelector('#listado-Productos');

document.addEventListener('DOMContentLoaded', cargarProductos)
listado.addEventListener('click', confirmarEliminar)

async function cargarProductos(){
    const listadoProductos = await consultarProductos()
    console.log(listadoProductos);

    listadoProductos.forEach(i => {
        const {precio, id, categoria, nombre} = i

        const row = document.createElement('tr')
        row.innerHTML = `
       <td class="px-6 py-4 border-b border-gray-200"> <p class="font-bold">${nombre}</p> </td>
       <td class="px-6 py-4 border-b border-gray-200"> <p class="text-center">${precio}</p> </td>

       <td class="px-6 py-4 border-b border-gray-200"> <p class="text-center" >${categoria}</p> </td>

       <td class="px-6 py-4 border-b border-gray-200">
       <a href="editar-producto.html?id=${id}" class="text-teal-400 font-bold hover: text-teal-900"> Editar <a>
       <a href="#" class="text-red-400 font-bold hover: text-red-900 eliminar"  data-producto="${id}"> Eliminar <a>
       </td>
        `
        listado.appendChild(row)
    });    


}

async function confirmarEliminar(e){
   // e.preventDefault()

  if  (e.target.classList.contains('eliminar')){
    const confirmar = confirm('¿Deseas eliminar este producto?')

     const productoId = e.target.dataset.producto
     console.log(productoId)

    if (confirmar){
       
        await eliminarProducto(productoId)
     
  }
}
}
