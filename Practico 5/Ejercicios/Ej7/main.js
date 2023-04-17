let contieneInput = document.getElementById ('txtContiene');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `El texto contiene ${contarPalabras (contieneInput.value)} palabras`

});

function contarPalabras (str) {

    return str.split (' ').length

}