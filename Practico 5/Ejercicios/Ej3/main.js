let buscarInput = document.getElementById ('txtBuscar');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `En el texto aparecen ${buscarLetra (buscarInput.value)} vocales.` });

function buscarLetra (str) {

    let contador = 0;

    let string = str.toLowerCase ();

    for (let i = 0; i < string.length; i++) {

        if (string[i] === 'a' || string[i] === 'e' || string[i] === 'i' || string[i] === 'o' || string[i] === 'u') {

            contador++;

        }

    }

    // contador = str.replace (/[^aeiou]/g, "").length;

    return contador;

}