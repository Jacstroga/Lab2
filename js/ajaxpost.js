let peticion;

if(window.XMLHttpRequest) peticion = new XMLHttpRequest();
else peticion = new ActiveXObject("Microsoft.XMLHTTP");

peticion.addEventListener("load",()=>{
    let respuesta;
    if (peticion.status == 200) respuesta = peticion.response;
    else respuesta = "Recurso no encontrado"
    console.log(JSON.parse(respuesta))
})

peticion.open("POST", "https://reques.in/api/users");

peticion.set.RequestHeader("Content-type","application/json;charset=UTF8");

peticion.send(JSON.stringify({
    "nombre": "nombre",
    "trabajo": "trabajo"
}));
peticion.send()


/*
fetch("https://reques.in/api/users",{
    method : "POST",
    body : JSON.stringify({
        "nombre": "nombre",
        "trabajo": "trabajo"
    }),
    headers : {"Content-type" : "application/json"}
})
    .then(res=>res.json())
    .then(res=>console.log(res))
*/

/*
<button type="button" onclick="alert('funciona');">Llamar a una función</button> 
*/