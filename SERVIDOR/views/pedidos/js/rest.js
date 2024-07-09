const btnCrear = document.querySelector('#guardar-cliente')
const container2 = document.querySelector('#resumen .contenido')
const urlDB = 'http://localhost:4000/mesas';

// import { nuevoPedido } from "../../../controller/api";

//crear estructura para guardar

let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}


const categorias = {
    1: "Comidas",
    2: "Postres",
    3: "Bebidas",
    4: "Ensaladas",
    5: "Cafe"
}

btnCrear.addEventListener('click', crearCliente)


function crearCliente() {
                // URL
        fetch('http://localhost:4000/mesas')
        .then(response => response.json())
        .then(data => {
        // <select> 
        const select = document.querySelector('#mesa');

        data.forEach(item => {
            // <option>
            const optionElement = document.createElement('option');

            // texto de option
            optionElement.text = item.mesa;

            // value de option
            optionElement.value = item.id;

            select.appendChild(optionElement);
        });
        })
        .catch(error => console.error(error));

        

    const numMesa = document.querySelector('#mesa').value
    const inputHora = document.querySelector('#hora').value

 

    const camposVacios = [inputHora, numMesa].some(i => i == '')
    if (camposVacios) {
        return mostrarMSGerr('No puede dejar los campos vacios')
    }


    function mostrarMSGerr(msg){
        const modalErr = document.querySelector('.invalido')

        if(!modalErr){
            const divError = document.createElement('div')
            divError.classList.add('invalido', 'text-center')
            divError.innerHTML = msg

            setTimeout(() => {
                divError.remove()
            }, 2000);
            document.querySelector('.modal-body form').appendChild(divError)
        }
    }

    cliente.mesa = numMesa
    
    cliente.hora = inputHora

    cliente = { ...cliente, numMesa, inputHora }

    let modalForm = document.querySelector('#formulario')
    var modal = bootstrap.Modal.getInstance(modalForm)
    modal.hide()

    mostrarSec()
    obtenerMenu()

}

function mostrarSec() {
    let retirandoDN = document.querySelectorAll('.d-none')
    retirandoDN.forEach(i => i.classList.remove('d-none'))
}

async function obtenerMenu() {
    await fetch('http://localhost:4001/menu')
        .then(res => res.json())
        .then(res => {
     //     console.log(res); // Add this line
          mostrarHTML(res);
        })
        .catch(error => console.log(error))
}

function mostrarHTML(menu) {
    let container = document.querySelector('#container')

    menu.forEach(i => {
        let div = document.createElement('div')
        const { nombre, precio, categoria, id } = i


        div.classList.add('row', 'border-top', 'text-center')

        const containerNombre = document.createElement('div')
        containerNombre.classList.add('col-md-4', 'py-3')
        containerNombre.textContent = `${nombre}`


        const containerPrecio = document.createElement('div')
        containerPrecio.classList.add('col-md-2', 'py-3')
        containerPrecio.textContent = `$${precio}`

        const containerCategoria = document.createElement('div')
        containerCategoria.classList.add('col-md-3', 'py-3')
        containerCategoria.textContent = `${categorias[categoria]}`

        const containerCantidad = document.createElement('div')
        const cantidad = document.createElement('input')
        containerCantidad.classList.add('col-md-2', 'py-3')
        cantidad.classList.add('form-control')
        cantidad.type = "number"
        cantidad.value = 0
        cantidad.min = 0
        cantidad.id = `${id}`

        containerCantidad.appendChild(cantidad)

        cantidad.onchange = function () {
            const cantidadComida = parseInt(cantidad.value)
            agregarOrden({ ...i, cantidadComida })
        }

        div.appendChild(containerNombre)
        div.appendChild(containerPrecio)
        div.appendChild(containerCategoria)
        div.appendChild(containerCantidad)

        container.appendChild(div)

    })

    
  
}

function agregarOrden(objOrden) {
    //console.log(objOrden.id)
    const { pedido } = cliente
    if (objOrden.cantidadComida > 0) {
        if (pedido.some(i => i.id === objOrden.id)) {
            const pedidoAct = pedido.map(i => {
                if (i.id == objOrden.id) {
                    i.cantidadComida = objOrden.cantidadComida
                }
                return i;

            })
            cliente.pedido = [...pedidoAct]
        } else {
            cliente.pedido = [...pedido, objOrden]
        }
    
        nuevoPedido(cliente)

    } else {
        const resultado = pedido.filter(i => i.id !== objOrden.id)
        cliente.pedido = resultado
        //console.log(cliente.pedido);
    }

    container2.innerHTML = ''
    if (cliente.pedido.length) {
        actualizarResumen()
        actualizarTotal()
    } else {
        container2.innerHTML = `<p class="text-center">Añade los elementos del pedido</p>
`
    }

}

function actualizarTotal(){
    const textoPropina = document.createElement('h3')
    textoPropina.innerText = 'Propina'
    const divTotal = document.createElement('div')
    const divPropina1 = document.createElement('div')
    const divPropina2 = document.createElement('div')
    const containerPropinas = document.createElement('div')
    const label1 = document.createElement('label')
    const label2 = document.createElement('label')
    const propina1 = document.createElement('input')
    propina1.type = 'radio'
    propina1.name = 'propina'
    const propina2 = document.createElement('input')
    propina2.type = 'radio'
    propina2.name = 'propina'
    divPropina1.appendChild(propina1)
    divPropina1.appendChild(label1)
    label1.textContent = 'Propina 5%'
    label2.textContent = 'Propina 10%'
    divPropina2.appendChild(propina2)
    divPropina2.appendChild(label2)
    containerPropinas.appendChild(textoPropina)
    containerPropinas.appendChild(divPropina1)
    containerPropinas.appendChild(divPropina2)

    containerPropinas.classList.add('col-md-4')
    let totalPedido = 0 
    
    let {pedido} = cliente

    pedido.forEach(i =>{
        totalPedido += i.precio * i.cantidadComida
    })
    
    let propina5 = totalPedido * 0.05
    let propina10 = totalPedido * 0.10

    divTotal.classList.add('fw-bold', 'text-center', 'py-3')

    propina1.onchange = function(){
        if(propina1.checked){
            divTotal.innerHTML = `Total a pagar: $${totalPedido + propina5}`
            containerPropinas.appendChild(divTotal)
        }
    }
    propina2.onchange = function(){
        
    if(propina2.checked){
        divTotal.innerHTML = `Total a pagar: $${totalPedido + propina10}`
        containerPropinas.appendChild(divTotal)
    }
    }
    container2.appendChild(containerPropinas)


}


function actualizarResumen() {

    const div = document.createElement('div')
    div.classList.add('card', 'py-5', 'px=3', 'shadow', 'col-md-4')
    let { pedido, hora, mesa } = cliente


    const containerMesa = document.createElement('div')
    containerMesa.classList.add('fw-bold')
    containerMesa.innerText = `Mesa: ${mesa}
    `
    const containerHora = document.createElement('div')
    containerHora.classList.add('fw-bold')
    containerHora.innerText = `Hora: ${hora}`

    const containerPedido = document.createElement('div')
    containerPedido.innerHTML = `
    <h2>Pedido: </h2>`

    const agrupar = document.createElement('ul')


    pedido.forEach(i => {
        const { id, nombre, precio, categoria, cantidadComida:cantidad } = i
        const lista = document.createElement('li')

        lista.classList.add('my-5', 'list-group-item')
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn', 'btn-danger')
        deleteBtn.textContent = 'Eliminar pedido'
        deleteBtn.addEventListener('click', ()=>{
            eliminarProducto(id)                        
        })

        const nombreP = document.createElement('p');
        nombreP.textContent = nombre
        const precioP = document.createElement('p');
        precioP.textContent = `Precio: $${precio}`
        const categoriaP = document.createElement('p');
        categoriaP.textContent = `Categoria: ${categorias[categoria]}`;
        const cantidadP = document.createElement('p');
        cantidadP.textContent = `Cantidad: ${cantidad}`;
        
        
        subTotalVal = calcularSubtotal(i)
        subTotal = document.createElement('p')
        subTotal.textContent = `Subtotal: $${subTotalVal}`

        lista.appendChild(nombreP)
        lista.appendChild(precioP)
        lista.appendChild(categoriaP)
        lista.appendChild(cantidadP)
        lista.appendChild(subTotal)
        lista.appendChild(deleteBtn)
        

        agrupar.appendChild(lista)
    })


    div.appendChild(containerMesa)
    div.appendChild(containerHora)
    div.appendChild(containerPedido)
    div.appendChild(agrupar)

    container2.appendChild(div)



 }


function calcularSubtotal(i){
    return i.precio * i.cantidadComida
}

function eliminarProducto(id){
    cliente.pedido = cliente.pedido.filter(item => item.id !== id)
    const listaInputs = document.querySelectorAll('#container .row .form-control')

    for (let i = 0; i < listaInputs.length; i++) {
        const input = listaInputs[i];
        if(input.id === id){
            input.value = 0
        }
    }   

    container2.innerHTML = ''
    if (cliente.pedido.length) {
            actualizarResumen()
            a
            actualizarTotal()
    } else {
        container2.innerHTML = `<p class="text-center">Añade los elementos del pedido</p>`
    }
}

async function nuevoPedido() {
    // Registro de nuevo pedido
  
    let {pedido} = cliente;
  
    console.log(pedido);
  
    if (pedido) { // check if pedido is defined
      try {
        const response = await fetch('http://localhost:4000/mesas', {
          method: 'PUT',
          body: JSON.stringify(pedido),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('pedido is undefined');
    }
  }