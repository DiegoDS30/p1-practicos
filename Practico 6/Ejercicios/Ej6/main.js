let nombresInput = document.getElementById ('txtNombre');
let botonIngresar = document.getElementById ('btnIngresar');
let nombres = document.getElementById ('pNombres');

let nombresArr = [];

botonIngresar.addEventListener ('click', function () {ingresarNombre (nombresInput.value)});

function ingresarNombre (nom) {

    if (!nombresArr.includes(nom)) {

        nombresArr.push (nom);

    } 

    nombresInput.value = '';

    nombresInput.focus();

    nombres.innerHTML = `${nombresArr}`;

}
