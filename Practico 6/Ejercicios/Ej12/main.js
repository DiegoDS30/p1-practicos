let botonIngresar = document.getElementById ('btnIngresar');
let botonMostrar = document.getElementById ('btnMostrar');
let mostrar = document.getElementById ('pMostrar');
let nombresMostrar = document.getElementById ('pNombres');
let caracterInput = document.getElementById ('txtCaracter');

let nombreMascotas = ['Temmito', 'Apollo', 'Lady', 'Elliot', 'Simon', 'Rex', 'Apa', 'Oliver'];

nombresMostrar.innerHTML = `Los nombres son "${nombreMascotas}"`;

botonIngresar.addEventListener ('click', function () { buscarNombres (nombreMascotas, caracterInput.value) });
botonMostrar.addEventListener ('click', function () { nombresLen (nombreMascotas) });

function buscarNombres (arr, char) {

    let nombresEncontrados = arr.filter (nom => nom.endsWith (char));

    return mostrar.innerHTML = `Los nombres que terminan con la letra son: "${nombresEncontrados}"`

}

function nombresLen (arr) {

    let nombresLargos = arr.filter (nom => nom.length >= 7)

    let minimo = arr.reduce ((corto, nombre) => corto.length <= nombre.length ? corto : nombre).length;

    let nombresCortos = arr.filter (mascotas => mascotas.length === minimo);

    return mostrar.innerHTML = `Los nombres con mas de 7 caracteres son: "${nombresLargos}", los nombres mas cortos son: "${nombresCortos}"`

}