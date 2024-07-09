//colocar en el html 

//<script src="index.js" type="module"></script> para exportar de otro script

import {consultarMesas} from "../controller/api.js"

const urlDB = 'http://localhost:4002/pedidos';

const listado = document.querySelector('#listado-Productos');

document.addEventListener('DOMContentLoaded', cargarMesas)

async function cargarMesas(){
    const listadoMesas = await consultarMesas()

    listadoMesas.forEach(i => {
        const {mesa} = i

        const row = document.createElement('tr')
        row.innerHTML = `
        <td class="px-6 py-4 border-b border-gray-200"> <p class="font-bold " >${mesa}</p> </td>

        <td class="px-6 py-4 border-b border-gray-200"> <div class="formas">
        <div class="circulo"></div>
    </div></td>
        `
        listado.appendChild(row)
    });    
    

    /*
  <td class="px-6 py-4 border-b border-gray-200"> <p class="text-center" >${categoria}</p> </td>

       <td class="px-6 py-4 border-b border-gray-200">
       <a href="editar-producto.html?id=${id}" class="text-teal-400 font-bold hover: text-teal-900"> Editar <a>
       <a href="#" class="text-red-400 font-bold hover: text-red-900 eliminar"  data-producto="${id}"> Eliminar <a>
       </td>*/

}

