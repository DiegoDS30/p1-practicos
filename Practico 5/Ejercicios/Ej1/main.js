let invertirInput = document.getElementById ('txtInvertir');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${invertirTexto (invertirInput.value)}`

});

function invertirTexto (str) {

    let textoInvertido = "";

    for (let i = str.length - 1; i >= 0; i--){

        textoInvertido += str.charAt(i);

    }
    
    return textoInvertido;

    // return str.split ('').reverse().join ('');

}