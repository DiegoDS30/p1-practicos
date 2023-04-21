let arrayInput = document.getElementById ('txtArray');
let botonImprimir = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

botonImprimir.addEventListener ('click', function () {

    mostrar.innerHTML = `${cantidadCaracteres (arrayInput.value)}`;

});

function cantidadCaracteres (str) {

    let arrayStrings = str.split (" ");
    let arrayCantidad = [];

    for (let i = 0; i < arrayStrings.length; i++) {

        arrayCantidad [i] = arrayStrings [i].length;

    }

    return arrayCantidad;

}