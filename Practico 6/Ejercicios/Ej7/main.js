let nombresInput = document.getElementById ('txtNombre');
let botonIngresar = document.getElementById ('btnIngresar');
let nombres = document.getElementById ('pNombres');

let posicionInput = document.getElementById ('nbrPosicion');
let botonBuscar = document.getElementById ('btnBuscar');
let posicion = document.getElementById ('pPosicion');
let ultimo = document.getElementById ('pUltimo');

let buscarInput = document.getElementById ('txtNombreBuscar');
let sustituirInput = document.getElementById ('txtSustituir');
let botonSustituir = document.getElementById ('btnSustituir');
let sustituir = document.getElementById ('pSustituir');

let nombresArr = [];

botonIngresar.addEventListener ('click', function () {ingresarNombre (nombresInput.value)});
botonBuscar.addEventListener ('click', function () {buscarPosicion (posicionInput.valueAsNumber)});
botonSustituir.addEventListener ('click', function () {sustituirNombre (buscarInput.value, sustituirInput.value)});

function ingresarNombre (nom) {

    if (!nombresArr.includes(nom)) {

        nombresArr.push (nom);

    } 

    nombresInput.value = '';

    nombresInput.focus();

    nombres.innerHTML = `${nombresArr} <br>`;

}

function buscarPosicion (pos) {

    if (nombresArr.length === 0) {

        posicion.innerHTML = `Aun no ha ingresado nombres`;

    } else if (pos > nombresArr.length || pos < 0) {

        posicion.innerHTML = `ingrese una posicion valida`;

    } else {

        posicion.innerHTML = `El nombre en la posicion que ingreso es: ${nombresArr [pos]}`
        ultimo.innerHTML = `El ultimo nombre de la lista es: ${nombresArr [nombresArr.length - 1]}`

    }

}

function sustituirNombre (bus, sus) {

    let posicionCambiar = nombresArr.indexOf (bus);

    if (posicionCambiar === -1) {

        sustituir.innerHTML = `No existe el nombre en la lista`

    } else {

        let nombreCambiar = nombresArr [posicionCambiar];

        nombresArr [posicionCambiar] = sus;

        sustituir.innerHTML = `Se sustituyo el nombre: ${nombreCambiar}, por: ${nombresArr [posicionCambiar]}`;

    }

}