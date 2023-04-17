let textoInput = document.getElementById ('txtCompleto');
let buscarInput = document.getElementById ('txtBuscar');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () {
    
    mostrar.innerHTML = `${textoMayuscula(textoInput.value, buscarInput.value)}`

});

function textoMayuscula (str, subStr) {

    if (subStr.length > str.length) {

        return `El texto a buscar es mas largo que el texto completo`

    } else {

        return str.includes (subStr);

    }

}