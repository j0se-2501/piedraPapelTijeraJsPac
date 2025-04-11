"use strict";
console.log("¡Script cargado!");

// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

let user = "";
let numeroPartidas = 0;
let resultadoPartida = "";
let opcionAleatoriaCOM = 0;

let opcionUser = 0;
let resultado = 0;
let historalPartidas = [];

//elementos del DOM

let botonJugar = document.getElementsByTagName("button")[0];
let botonYa = document.getElementsByTagName("button")[1];
let botonReset = document.getElementsByTagName("button")[2];
let piedraImg = document.getElementsByTagName("img")[0];
let papelImg = document.getElementsByTagName("img")[1];
let tijeraImg = document.getElementsByTagName("img")[2];
let resultadoImg = document.getElementsByTagName("img")[3];
let imagenes = [piedraImg, papelImg, tijeraImg];


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
}

function annadirFondoRojo(elementoDOM) {
    elementoDOM.parentElement.classList.add("fondoRojo");
}

function quitarFondoRojo(elementoDOM) {
    elementoDOM.parentElement.classList.remove("fondoRojo");
}

function comprobarNombreLegal(nombreUser) {
    if (nombreUser.value.length > 3 && isNaN(nombreUser[0])){
        quitarFondoRojo(nombreUser);
        return true;
    } else {
        annadirFondoRojo(nombreUser);
        return false;
    } 
}

function comprobarNumeroPartidas(numeroPartidas) {

    if (numeroPartidas.value > 0) {
        //document.getElementsByTagName("label")[1].classList.remove("fondoRojo");
        quitarFondoRojo(numeroPartidas);
        return true;
    } 
    else {
        //document.getElementsByTagName("label")[1].classList.add("fondoRojo");
        annadirFondoRojo(numeroPartidas);
        return false;
    }
} 


botonJugar.onclick = function () {
    user = document.getElementsByName("nombre")[0];
    console.log(user.value);
    numeroPartidas = document.getElementsByName("partidas")[0];
    console.log(numeroPartidas.value);
    if (comprobarNombreLegal(user)&& comprobarNumeroPartidas(numeroPartidas)) {
        asignarImagenes();
    }
    else{
        reiniciarImagenes();
    }
    
};





function eleccionJugador() {
    
}

function comprobarInicioPartidaCorrecto() {

}

