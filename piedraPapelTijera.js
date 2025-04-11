"use strict";
console.log("Script cargado");

// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

let user = "";
let numeroPartidas = 0;
let resultadoPartida;
let opcionAleatoriaCOM = 0;

let tiradaJugador = 0;
let tiradaCPU = 0;

let contadorPartidas = 0;

//elementos del DOM

let botonJugar = document.getElementsByTagName("button")[0];
let botonYa = document.getElementsByTagName("button")[1];
let botonReset = document.getElementsByTagName("button")[2];
let piedraImg = document.getElementsByTagName("img")[0];
let papelImg = document.getElementsByTagName("img")[1];
let tijeraImg = document.getElementsByTagName("img")[2];
let CPUImg = document.getElementsByTagName("img")[3];
let imagenes = [piedraImg, papelImg, tijeraImg];
let spanPartidasTotales = document.getElementById("total");
let spanPartidaActual = document.getElementById("actual");
let historialPartidas = document.getElementById("historial");


/*Asignará a todas las imágenes, salvo a la última, el evento que permita seleccionar
la opción del jugador y poner en ellas las imágenes que les corresponden. Estas
imágenes se generarán a partir del array “posibilidades” que se suministra en la
primera línea del fichero JS y se le añadirá la ruta hasta ellas, el indicador que es de
“Jugador” y la extensión del fichero*/

function elegirImagen(eleccion){
    for (let i = 0; i < imagenes.length; i++) {
        if (i== eleccion) {
            imagenes[i].classList.remove("noSeleccionado");
            imagenes[i].classList.add("seleccionado");
            tiradaJugador=i;
            console.log("eleccion jugador: "+imagenes[i].src, posibilidades[i]+", valor tiradaJugador: "+tiradaJugador);
            
        } else {
            imagenes[i].classList.remove("seleccionado");
            imagenes[i].classList.add("noSeleccionado");
        }
    }
}

function asignarImagenes() {
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].src= "img/" + posibilidades[i] + "Jugador.png";
        imagenes[i].onclick = () => elegirImagen(i);
    }
}

function reiniciarImagenes() {
    for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].src= "img/defecto.png";
        imagenes[i].onclick = null;
    }
    CPUImg.src= "img/defecto.png";
}

function annadirFondoRojo(elementoDOM) {
    elementoDOM.classList.add("fondoRojo");
}

function quitarFondoRojo(elementoDOM) {
    elementoDOM.classList.remove("fondoRojo");
}

function comprobarNombreLegal(nombreUser) {
    if (nombreUser.value.length > 3 && isNaN(nombreUser.value[0])){
        console.log(nombreUser.value[0]);
        console.log(isNaN(nombreUser.value[0]));
        quitarFondoRojo(nombreUser);
        return true;
    } else {
        annadirFondoRojo(nombreUser);
        return false;
    } 
}

function comprobarNumeroPartidas(numeroPartidas) {
    numeroPartidas.value = parseInt(numeroPartidas.value);//paso a entero posibles decimales; 
    // lo hago antes de comprobar si es mayor que cero para que no aceptes valores de 0coma
    if (numeroPartidas.value > 0) {
        quitarFondoRojo(numeroPartidas);
        return true;
    } 
    else {
        annadirFondoRojo(numeroPartidas);
        return false;
    }
}

function deshabilitarInputsPartida(boolean) {
    if (boolean){
    user.setAttribute("disabled", boolean);
    console.log(document.getElementsByName("nombre")[0]);
    numeroPartidas.setAttribute("disabled", boolean);
    botonJugar.setAttribute("disabled", boolean);
    }
    else{
    user.removeAttribute("disabled");
    console.log(document.getElementsByName("nombre")[0]);
    numeroPartidas.removeAttribute("disabled");
    botonJugar.removeAttribute("disabled");
    }    
}

function cambiarValorSpan (span, valor){
    span.innerHTML=valor;
}

function comprobarParametrosInicioPartida(){
    user = document.getElementsByName("nombre")[0];
    console.log(user.value);
    numeroPartidas = document.getElementsByName("partidas")[0];
    console.log(numeroPartidas.value);
    let checkNombreUser = comprobarNombreLegal(user); //realizo los métodos en variables separadas y no en el if porque
                                                      //si el primer método del AND era falso, no me llegaba a comprobar
                                                      //el segundo y, por tanto, podría estar erróneo y no ponerse el fondo rojo.
    let checkNumeroPartidas = comprobarNumeroPartidas(numeroPartidas);
    if (checkNombreUser && checkNumeroPartidas) return true;
    else return false;
}

function iniciarPartida(){
    if (comprobarParametrosInicioPartida()) {
        asignarImagenes();
        deshabilitarInputsPartida(true);
        cambiarValorSpan(spanPartidasTotales, numeroPartidas.value);
        //spanPartidasTotales.innerHTML=numeroPartidas.value;
        cambiarValorSpan(spanPartidaActual, ++contadorPartidas);
        //spanPartidaActual.innerHTML=++contadorPartidas;
        botonYa.removeAttribute("disabled");
        botonReset.removeAttribute("disabled");
    }
}

botonJugar.onclick = function () {
    iniciarPartida();
};

function generarAleatoriamenteTiradaCPU(){
    let numeroAleatorio= Math.floor(Math.random() * 3);
    CPUImg.src= "img/" + posibilidades[numeroAleatorio] + "Ordenador.png";
    tiradaCPU=numeroAleatorio;
    console.log("tirada CPU: "+CPUImg.src, posibilidades[numeroAleatorio]+", valor tiradaCPU: "+tiradaCPU);
}

function comprobarResultadoPartida(){
    console.log(tiradaJugador+"-"+tiradaCPU+"="+(tiradaJugador-tiradaCPU));
    switch(tiradaJugador-tiradaCPU){
        case 1:
        case -posibilidades.length+1:
        //hago el posibilidades.lenght+1 para que sea escalable a más de tres opciones
        //como así se indica en el enunciado de la pac.

        //más concretamente: al restar posibilidades.length, el valor queda con el tamaño del array en negativo
        //pero lo que se resta a tiradaJugador sería en este caso el último elemento del array, no su tamaño
        //de esta forma, para jugar con el último valor del array, tengo que contraintuitivamente sumar 1
        //en vez de restar 1, que es lo que se suele hacer para acceder al último valor de un array cualquiera.
            console.log("gana el jugador");
            return 0;
        break;
        case 0:
            console.log("empate");
            return 1;
        break;
        default:
            console.log("gana la cpu");
            return 2;
        break;
    }
}

function anunciarResultadoPartida(resultado){
    switch(resultado){
        case 0:
            historialPartidas.innerHTML="<li>Gana "+user.value+".</li>"+historialPartidas.innerHTML;
            //lo hago así y no concatenando para que el último resultado me salga arriba del todo de la lista, creo que es más interesante visualmente.
            break;
        case 1:
            historialPartidas.innerHTML="<li>Empate.</li>"+historialPartidas.innerHTML;
            break;
        case 2:
            historialPartidas.innerHTML="<li>Gana la máquina.</li>"+historialPartidas.innerHTML;
            break;
    }
}

botonYa.onclick = function() {
    user = document.getElementsByName("nombre")[0];
    console.log(contadorPartidas);
    console.log(numeroPartidas.value);
    if (user.getAttribute("disabled")&&contadorPartidas<=numeroPartidas.value) { 
    generarAleatoriamenteTiradaCPU();
    resultadoPartida=comprobarResultadoPartida();
    anunciarResultadoPartida(resultadoPartida);
    if (contadorPartidas!=numeroPartidas.value){
        cambiarValorSpan(spanPartidaActual, ++contadorPartidas);
    } else{
        botonYa.setAttribute("disabled", true);
    } 
    }
    else if (user.getAttribute("disabled")&&contadorPartidas>numeroPartidas.value){
        botonYa.setAttribute("disabled", true);
    }
}

botonReset.onclick = function(){
    user = document.getElementsByName("nombre")[0];
    if (user.getAttribute("disabled")) {
        console.log(document.getElementsByName("nombre")[0]);
        deshabilitarInputsPartida(false);
        reiniciarImagenes();
        asignarImagenes();
        contadorPartidas=0;
        numeroPartidas.value=0;
        cambiarValorSpan(spanPartidaActual, contadorPartidas);
        cambiarValorSpan(spanPartidasTotales, numeroPartidas.value);
        botonYa.setAttribute("disabled", true);
        botonReset.setAttribute("disabled", true);
        historialPartidas.innerHTML="<li>Nueva partida.</li>"+historialPartidas.innerHTML;
        }
}

