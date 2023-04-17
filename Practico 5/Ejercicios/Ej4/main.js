let buscarInput = document.getElementById ('txtBuscar');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () {
    
    mostrar.innerHTML = `${textoMinuscula(buscarInput.value)}`

});

function textoMinuscula (str) {

    return str.toLowerCase ();

}