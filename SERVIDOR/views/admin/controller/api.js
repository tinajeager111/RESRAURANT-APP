//get / post / delete / update 

const url = 'http://localhost:4001/menu'


//agregar/ crear  un producto
export const nuevoProducto = async  producto =>{

    //registro de nuevo producto
    try{
       await fetch(url,{
            method:'POST',
            body: JSON.stringify(producto),
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
    catch (error){
        console.log(error)
    }

}


//eliminar un producto
export const eliminarProducto = async id =>{
try{
await fetch(`${url}/${id}`,{
    method:'DELETE'
})
}
catch(error){
//console.log(error)
}
}


//actualizar / editar un producto\
export const editarProducto = async producto =>{
try{
await fetch(`${url}/${producto.id}`, {
    method:'PUT',
    body:JSON.stringify(producto),
    headers:{
        'Content-Type':'application/json'
    }
})
}
catch(error){
//console.log(error)
}
}


//consulta de todos los items
export const consultarProductos = async ()=>{
    try{
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        return resultado
    }
    catch(error){
//console.log(error)
    }
}


//consulta por id
export const consultarProducto = async id=>{
    try{
        const respuesta = await fetch(`${url}/${id}`)
        const resultado = await respuesta.json()
        return resultado
    }
    catch(error){
console.log(error)
    }
}