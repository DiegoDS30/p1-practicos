let buscarInput = document.getElementById ('txtBuscar');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () {
    
    mostrar.innerHTML = `${textoMayuscula(buscarInput.value)}`

});

function textoMayuscula (str) {

    return str.toUpperCase ();

}