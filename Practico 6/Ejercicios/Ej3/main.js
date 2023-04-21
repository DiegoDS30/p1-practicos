let palabrasInput = document.getElementById ('txtPalabras');
let botonIngresar = document.getElementById ('btnIngresar');
let botonMostrar = document.getElementById ('btnMostrar');
let mostrar = document.getElementById ('pMostrar');

let palabrasArr = [];

botonIngresar.addEventListener ('click', function () {guardarPalabra (palabrasInput.value)});

botonMostrar.addEventListener ('click', mostrarPalabras);

function guardarPalabra (str) {

    palabrasArr.push(str);

    palabrasInput.value = ''
    palabrasInput.focus();

}

function mostrarPalabras () {

    mostrar.innerHTML = `${palabrasArr}`

}