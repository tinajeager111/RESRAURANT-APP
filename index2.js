//id login.html
const formL = document.querySelector("#form-L")
const nombreL = document.querySelector("#L-input")
const codigoL = document.querySelector("#L-codigo")

//id register
const formR = document.querySelector("#form-R")
const nombreR = document.querySelector("#R-input")
const select = document.querySelector("#select")
const codigoR = document.querySelector("#R-codigo")



const notificacion = document.querySelector(".notification");
const codigoAdmin = "admin233"
const codigoMesero = "mesero233"

function notification(message) {
    notificacion.classList.add("show-notification");
    notificacion.textContent = message;
    setTimeout(() => {
      notificacion.classList.remove("show-notification");
    }, 3000);
  }


  formL.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!nombreL.value || !codigoL.value) {
      return notification("No puede dejar campos vacíos");
    }



    const consulta = await fetch("http://localhost:4002/usuarios", {

    method: "GET",

  }).then((response) =>response.json());

  let existe = false;

  consulta.forEach((usuario) => {
    if (usuario.nombre === nombreL.value){
      existe = true;
      if(codigoL.value === codigoAdmin){
        window.location.href = "/administrador";
      }
    }
  });

  if (!existe){
    notification("Usuario no encontrado");
  }



  localStorage.setItem("usuario", JSON.stringify({ nombre: nombreL.value }));
  window.location.href = "/";



  })


formR.addEventListener("submit", async (e) =>{

  e.preventDefault();
  if(!nombreR.value || !codigoR.value){
    return notification("No puede dejar campos vacíos");
  }

  const consulta = await fetch("http://localhost:4002/usuarios", {
    method: "GET",
  }).then((response) => response.json());

  let existe = false;

  consulta.forEach((usuario) => {
    if (usuario.nombre === nombreR.value) {
      existe = true;
    }

     
           
  });

  if (existe) {
    notification(`El usuario ${nombreR.value} ya existe`);
    return;
  }

  await fetch("http://localhost:4002/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },                                                                                                      
    body: JSON.stringify({ nombre: nombreR.value }),
  });

  const respuesta = await axios.post('/controllers/usuarios', {nombre:nombreR.value, cargo: select.value}) //lo que se quiere registrar
  console.log(respuesta);


})