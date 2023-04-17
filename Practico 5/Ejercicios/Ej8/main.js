let contieneInput = document.getElementById ('txtContiene');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${mismaLetra (contieneInput.value)}`

});

function mismaLetra (str) {

    let comienza = str[0];
    let termina = str[str.length - 1];

    // str.endsWith (str[0])

    return comienza === termina
}