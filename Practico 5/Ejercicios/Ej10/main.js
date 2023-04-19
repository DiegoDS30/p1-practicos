let reemplazar = document.getElementById ('txtReemplazar');
let letra = document.getElementById ('txtLetra');
let botonImprimir = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

botonImprimir.addEventListener ('click', function () {

    mostrar.innerHTML = `${cambiarLetra(reemplazar.value, letra.value)}`

});

function cambiarLetra (str, char) {

    return str.replaceAll (char, '*');

}