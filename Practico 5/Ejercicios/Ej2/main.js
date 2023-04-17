let buscarInput = document.getElementById ('txtBuscar');
let letraInput = document.getElementById ('txtLetra');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `En el texto aparece la letra ${buscarLetra (buscarInput.value, letraInput.value)} veces.` });

function buscarLetra (str, char) {

    let contador = 0;

    let string = str.toLowerCase ();

    for (let i = 0; i < string.length; i++) {

        if (string[i] === char) {

            contador++;

        }

    }

    // contador = str.replace (/[^char]/g, "").length;
    // contador = str.split (char).length - 1;

    return contador;

}