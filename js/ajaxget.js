let peticion;

if(window.XMLHttpRequest) peticion = new XMLHttpRequest();
else peticion = new ActiveXObject("Microsoft.XMLHTTP");

peticion.addEventListener("load",()=>{
    let respuesta;
    if (peticion.status == 200) respuesta = peticion.response;
    else respuesta = "Recurso no encontrado"
    console.log(JSON.parse(respuesta))
})

peticion.open("GET", "informacion.txt");
peticion.send()

/*
fetch("https://reqres.in/api/unknown/2")
    .then(res=>res.json())
    .then(res=>console.log(res))
*/

/*
const imagen = document.querySelector(".imagen");

fetch("laimagen.png")
    .then(res=>res.blob())
    .then(img=>imagen.src = URL.createObjectURL(img))
*/