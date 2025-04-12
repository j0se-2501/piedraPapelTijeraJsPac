"use strict"; //recomendación de mi profesora de lenguaje de marcas usar siempre use strict
console.log("Script cargado");

// Este array no se puede modificar,
var posibilidades = ["piedra", "papel", "tijera"];
//    //

//variables para la lógica del juego

let resultadoPartida; //0=gana jugador, 1= empate, 2= gana cpu
let tiradaJugador = 0; //su valor se obtendrá del index en el array posibilidades de la imagen seleccionada
let tiradaCPU = 0; //igual que tiradaJugador, pero su valor sale de un random
let contadorPartidas = 0; //partidas que se llevan jugadas hasta el reset
const numeroDeOpcionesPosibles = 3; //elecciones que tiene el juego; en este caso, tres: piedra, papel o tijera; permite escalar el juego

//elementos del DOM

let numeroPartidas = 0; //total de partidas introducido; 0 por defecto; para acceder a su valor, uso .value
                        //debería haber usado dos variables (una para el elemento del dom y otra para la lógica)
                        //para mayor limpieza del código, en vez de acceder continuamente al .value
let user = ""; //vacío porque obtengo el valor al pulsar el botón jugar
let botonJugar = document.getElementsByTagName("button")[0]; //cojo los botones por su tagname
let botonYa = document.getElementsByTagName("button")[1];
let botonReset = document.getElementsByTagName("button")[2];
let piedraImg = document.getElementsByTagName("img")[0]; //igual hago con las imágenes
let papelImg = document.getElementsByTagName("img")[1];
let tijeraImg = document.getElementsByTagName("img")[2];
let CPUImg = document.getElementsByTagName("img")[3];
let imagenes = [piedraImg, papelImg, tijeraImg]; //guardo las imágenes en un array análogo a posibilidades para luego
                                                //poder asignar más fácil las imágenes que tocan según la lógica del juego
let spanPartidasTotales = document.getElementById("total");//el resto de elementos se acceden más fácilmente al tener id
let spanPartidaActual = document.getElementById("actual");
let historialPartidas = document.getElementById("historial");

//funciones para las imágenes

function elegirImagen(eleccion){ //funcion que resalta la imagen elegida por el jugador aplicando las clases proporcionadas
    for (let i = 0; i < imagenes.length; i++) { //recorrer un array me permite escalar el juego a más futuras opciones
                                                //y compenetrar el array posibilidades proporcionado con las imágenes
        if (i== eleccion) {
            imagenes[i].classList.remove("noSeleccionado"); //se eligen las clases según el enunciado
            imagenes[i].classList.add("seleccionado");
            tiradaJugador=i; //aplico el valor i a una variable aparte para la lógica del juego
            console.log("eleccion jugador: "+imagenes[i].src, posibilidades[i]+", valor tiradaJugador: "+tiradaJugador);
            
        } else {
            imagenes[i].classList.remove("seleccionado");
            imagenes[i].classList.add("noSeleccionado");
        }
    }
}

function asignarImagenes() { //asigno las imágenes proporciondas sobreescribiendo la imagen por defecto
    for (let i = 0; i < imagenes.length; i++) { //igualmente uso un array para una posible futura escalabilidad
        imagenes[i].src= "img/" + posibilidades[i] + "Jugador.png";
        imagenes[i].onclick = () => elegirImagen(i); //asigno a cada imagen la posibilidad de ser clickeada y seleccionada
    }
}

function reiniciarImagenes() { //reinicia las imágenes a la imagen por defecto
    /*for (let i = 0; i < imagenes.length; i++) { //codigo para reiniciar también las imágenes del jugador; finalmente, según entiendo
        imagenes[i].src= "img/defecto.png";       //al leer el enunciado, solo es necesario reiniciar la imagen de la cpu
        imagenes[i].onclick = null;
    }*/
    CPUImg.src= "img/defecto.png"; 
}

//funciones para modificar elementos del dom

function annadirFondoRojo(elementoDOM) { //simplemente añade o quita el fondo; aunque simple, hice la función para reutilizar el código
    elementoDOM.classList.add("fondoRojo");
}

function quitarFondoRojo(elementoDOM) {
    elementoDOM.classList.remove("fondoRojo");
}

function deshabilitarInputsPartida(boolean) { //elementos que se deshabilitan al pulsar jugar; los botones reset y ya se deshabilitan aparte
    if (boolean){ //el boolean creo que no es necesario en cuanto que siempre va a ser true; entendí posteriormente que para borrar el atributo
                //es con removeAttribute y no pasando el argumento false al setAttribute
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

function cambiarValorSpan (span, valor){ //cambia el valor de los span, simple pero reutiliza código
    span.innerHTML=valor;
}

//funciones de inicio del juego (comprobación de requisitos) -> botón "jugar"

function comprobarNombreLegal(nombreUser) { //comprueba que el nombre tenga los requisitos solicitados en el enunciado
    if (nombreUser.value.length > 3 && isNaN(nombreUser.value[0])){ //comprobación de los requisitos
        console.log(nombreUser.value[0]);
        console.log(isNaN(nombreUser.value[0]));
        quitarFondoRojo(nombreUser); //quito o pongo el fondo rojo según se cumplen o no
        return true;
    } else {
        annadirFondoRojo(nombreUser);
        return false;
    } 
}

function comprobarNumeroPartidas(numeroPartidas) { //comprueba que el número de partidas apruebe los requisitos del enunciado
    numeroPartidas.value = parseInt(numeroPartidas.value);//paso a entero posibles decimales; 
    // lo hago antes de comprobar si es mayor que cero para que no acepte valores de cero coma
    if (numeroPartidas.value > 0) {
        quitarFondoRojo(numeroPartidas); //quito o pongo el fondo rojo según se cumplen o no
        return true;
    } 
    else {
        annadirFondoRojo(numeroPartidas);
        return false;
    }
}

function comprobarParametrosInicioPartida(){ //recojo los elementos del dom y los paso a las funciones que comprueban requisitos
    user = document.getElementsByName("nombre")[0];
    console.log(user.value);
    numeroPartidas = document.getElementsByName("partidas")[0];
    console.log(numeroPartidas.value);
    let checkNombreUser = comprobarNombreLegal(user); //realizo los métodos en variables separadas y no en el if porque
                                                      //si el primer método del AND era falso, no me llegaba a comprobar
                                                      //el segundo y, por tanto, podría estar erróneo y no ponerse el fondo rojo.
    let checkNumeroPartidas = comprobarNumeroPartidas(numeroPartidas);
    if (checkNombreUser && checkNumeroPartidas) return true; //retorno boolean para poder usar la funcion como condicion de un if
    else return false;
}

function iniciarPartida(){ //da lugar a la partida una vez comprueba los requisitos
    if (comprobarParametrosInicioPartida()) {
        asignarImagenes(); //asigna las imágenes del jugador sobreescribiendo la imagen por defecto del pingüino
        deshabilitarInputsPartida(true); //deshabilita los campos y el botón jugar
        cambiarValorSpan(spanPartidasTotales, numeroPartidas.value); //actualiza el total de partidas
        cambiarValorSpan(spanPartidaActual, ++contadorPartidas); //hago ++ antes de la variable porque me interesa que empiece en 1
                                                            //es decir: la primera partida ya es la partida 1, no se juega una partida 0
        botonYa.removeAttribute("disabled"); //habilito los botones ya y reset
        botonReset.removeAttribute("disabled");
    }
}

//funciones para la lógica del juego -> botón "ya"

function generarAleatoriamenteTiradaCPU(){ //genera una opción aleatoria para la máquina
    let numeroAleatorio= Math.floor(Math.random() * numeroDeOpcionesPosibles); //posibles resultados aleatorios para este juego: 0, 1, 2;
                                                                               //es una constante para permitir escalabilidad
    CPUImg.src= "img/" + posibilidades[numeroAleatorio] + "Ordenador.png";
    tiradaCPU=numeroAleatorio; //podría usar una misma variable para la lógica del juego y el número aleatorio obtenido
                            //pero prefiero mantenerlas por separado para mayor claridad del códgo
    console.log("tirada CPU: "+CPUImg.src, posibilidades[numeroAleatorio]+", valor tiradaCPU: "+tiradaCPU);
}

function comprobarResultadoPartida(){ //lógica principal del juego, calcula el resultado de la partida
    console.log(tiradaJugador+"-"+tiradaCPU+"="+(tiradaJugador-tiradaCPU));
    switch(tiradaJugador-tiradaCPU){ //resto la tirada de la cpu a la tirada del jugador como se indica en el enunciado
        case 1: //si da 1 o da el último índice del array en negativo, habrá ganado el jugador
        case -posibilidades.length+1:
        //hago el posibilidades.lenght+1 para que sea escalable a más de tres opciones
        //como así se indica en el enunciado de la pac.

        //más concretamente: al restar posibilidades.length, el valor queda con el tamaño del array en negativo
        //pero lo que se resta a tiradaJugador sería en este caso el último elemento del array, no su tamaño
        //de esta forma, para jugar con el último valor del array, tengo que contraintuitivamente sumar 1
        //en vez de restar 1, que es lo que se suele hacer para acceder al último valor de un array cualquiera.
            console.log("gana el jugador");
            return 0; //retorno 0 si gana el jugador; al haber tres opciones no puedo poner un boolean
        break;
        case 0: //si ambas opciones tienen el mismo valor, al restarse dan 0 y, por lo tanto, es un empate
            console.log("empate");
            return 1; //retorno 1 en caso de empate
        break;
        default:
            console.log("gana la cpu"); //si se da otro caso, debe haber ganado la máquina
            return 2; //retorno 2 en caso de que gane la máquina
        break;
    }
}

function anunciarResultadoPartida(resultado){ //modifica el historial de partidas según el resultado de la última jugada
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

function jugarPartida(){ //funcion principal de la logica del juego, uniendo la tirada random de la cpu, el calculo y la actualizacion del historial
    generarAleatoriamenteTiradaCPU();
    resultadoPartida=comprobarResultadoPartida();
    anunciarResultadoPartida(resultadoPartida);
    if (contadorPartidas!=numeroPartidas.value){ //al incrementar el contador antes de mostrarlo, tengo que tener cuidado de que no se actualice de más
                                                //simplemente compruebo que no ha alcanzado el límite total de partidas
        cambiarValorSpan(spanPartidaActual, ++contadorPartidas);
    } else{
        botonYa.setAttribute("disabled", true); //cuando lo alcanca, deshabilito el boton ya
    } 
}

//funciones para el reseteo de la partida -> botón "reset"

function resetear(){ //contiene los pasos para resetear el juego según los requisitos del enunciado
    console.log(document.getElementsByName("nombre")[0]);
        deshabilitarInputsPartida(false);
        reiniciarImagenes();
        //asignarImagenes(); descomentar junto a la parte comentada de reiniciarImagenes para reiniciar también las imágenes del jugador
        contadorPartidas=0; //reseteo también la lógica del juego
        numeroPartidas.value=0;
        cambiarValorSpan(spanPartidaActual, contadorPartidas);
        cambiarValorSpan(spanPartidasTotales, numeroPartidas.value);
        botonYa.setAttribute("disabled", true);
        botonReset.setAttribute("disabled", true);
        historialPartidas.innerHTML="<li>Nueva partida.</li>"+historialPartidas.innerHTML;
}

//funciones onclick para los botones

botonJugar.onclick = function () {
    iniciarPartida();
};

botonYa.onclick = function() {
    user = document.getElementsByName("nombre")[0]; //los botones ya y reset solo funcionarán si están deshabilitados los inputs del usuario
    console.log(contadorPartidas);
    console.log(numeroPartidas.value);
    if (user.getAttribute("disabled")&&contadorPartidas<=numeroPartidas.value) { 
        jugarPartida();
    }
    else if (user.getAttribute("disabled")&&contadorPartidas>numeroPartidas.value){
        botonYa.setAttribute("disabled", true);
    }
}

botonReset.onclick = function(){
    user = document.getElementsByName("nombre")[0];
    if (user.getAttribute("disabled")) {
            resetear();
        }
}

