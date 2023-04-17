let invertirInput = document.getElementById ('txtInvertir');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${invertirTexto (invertirInput.value)}`

});

function invertirTexto (str) {

    return str.split ('').reverse().join ('');

}