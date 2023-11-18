//Variables palindromo
var palabra = document.getElementById("palabra");
palabra.addEventListener('keyup', evaluarPal);
txtResultadoPal = document.getElementById("resultado");

//Variables mayoruqe
var numeroUno = document.getElementById("numero1");
var numeroDos = document.getElementById("numero2");
document.getElementById("verificar").addEventListener("click", mayorque);
txtResultadoMay = document.getElementById("mayor");

//Variables vocales
const frase = document.getElementById("frase");
frase.addEventListener('keyup', guardarFrase);
document.getElementById("buscar").addEventListener("click", buscarVoc);
txtResultado1Voc = document.getElementById("vocales1");
txtResultado2Voc = document.getElementById("vocales2");

//Envia la entrada para evaluar palindromo.
function evaluarPal(){
  nueva = palabra.value;
  palindromo(nueva);
}

//Almacena el texto ingresado en una variable.
function guardarFrase(){
  inputFrase=frase.value;
}

//Envia el texto almacenado para buscarle volcales.
function buscarVoc(){
  vocales(inputFrase);
}

//Limpia la entrada y calcula si es palindromo o no.
function palindromo(str) {
  var re = /[\W_]/g;
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join(''); 
  var a = reverseStr === lowRegStr;
  if(a == true){
    txtResultadoPal.innerHTML = 'La entrada "' + nueva + '" es un palindromo';
  }
  else{
    txtResultadoPal.innerHTML = 'La entrada "' + nueva + '" no es palindromo';
  }
}

//Define cual numero es mayor y lo muestra
function mayorque(){
  a = numeroUno.value;
  a = parseFloat(a);
  b = numeroDos.value;
  b = parseFloat(b);
  if (a > b){
    txtResultadoMay.innerHTML = a + " es mayor que " + b;
  }
  else if (a < b){
    txtResultadoMay.innerHTML = b + " es mayor que " + a;
  }
  else if (a == b){
    txtResultadoMay.innerHTML = a + " es igual a " + b;
  }
  else {
    txtResultadoMay.innerHTML = "Ingrese numeros reales";
  }
}

//Vocales
function vocales(frase){
  const vocales = ["a","e","i","o","u","á","é","í","ó","ú"];
  cantidadVocales = [0,0,0,0,0,0,0,0,0,0];
  for (i=0; i < 10; i++){
    for (const letra of frase){
      if(vocales[i].includes(letra.toLowerCase())){
        cantidadVocales[i]++;
      }
    }
  }
  salida1 = [""];
  salida2 = [""];
  for (j=0; j < 10; j++){
    if(cantidadVocales [j] != 0){
      salida2[0] = salida2[0] + " " + vocales[j];
      salida1[0] = salida1[0] + " " + vocales[j] + ":" + cantidadVocales[j];
    }
  }
  if(salida1[0] == ""){
    txtResultado1Voc.innerHTML = "La frase no contiene vocales";
    txtResultado2Voc.innerHTML = "---";
    return
  }
  else{
    txtResultado2Voc.innerHTML = "En total: " + salida1[0];
    txtResultado1Voc.innerHTML = "La frase contiene las vocales: " + salida2[0];
    return salida;
  }

}

//Inicia codigo Ajax

String.prototype.transformaCaracteresEspeciales = function() {
  return decodeURI(encodeURI(this).replace(/%0A/g, '<br/>').replace(/%3C/g, '&lt;').replace(/%3E/g, '&gt;'));
}

var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];
var tiempoInicial = 0;

// Cargar en el input text la URL de la página
window.onload = function() {
  var recurso = document.getElementById('recurso');
  recurso.value = location.href;
  
  // Cargar el recurso solicitado cuando se pulse el botón MOSTRAR CONTENIDOS
  document.getElementById('enviar').onclick = cargaContenido;
}

function cargaContenido() {
  // Borrar datos anteriores
  document.getElementById('contenidos').innerHTML = "";
  document.getElementById('estados').innerHTML = "";
  
  // Instanciar objeto XMLHttpRequest
  if(window.XMLHttpRequest) {
    peticion = new XMLHttpRequest();
  }
  else {
    peticion = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  // Preparar función de respuesta
  peticion.onreadystatechange = muestraContenido;
  
  // Realizar petición
  tiempoInicial = new Date();
  var recurso = document.getElementById('recurso').value;
  peticion.open('GET', recurso+'?nocache='+Math.random(), true);
  peticion.send(null);
}

// Función de respuesta
function muestraContenido() {
  var tiempoFinal = new Date();
  var milisegundos = tiempoFinal - tiempoInicial;
  
  var estados = document.getElementById('estados');
  estados.innerHTML += "[" + milisegundos + " mseg.] " + estadosPosibles[peticion.readyState] + "<br/>";
  
  if(peticion.readyState == 4) {
      if(peticion.status == 200) {
          var contenidos = document.getElementById('contenidos');
          contenidos.innerHTML = peticion.responseText.transformaCaracteresEspeciales();
      }
      muestraCabeceras();
      muestraCodigoEstado();
  }
}

function muestraCabeceras() {
  var cabeceras = document.getElementById('cabeceras');
  cabeceras.innerHTML = peticion.getAllResponseHeaders().transformaCaracteresEspeciales();
}

function muestraCodigoEstado() {
  var codigo = document.getElementById('codigo');
  codigo.innerHTML = peticion.status + "<br/>" + peticion.statusText;        
}