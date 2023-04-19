let reemplazar = document.getElementById ('txtReemplazar');
let botonImprimir = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

botonImprimir.addEventListener ('click', function () {

    mostrar.innerHTML = `${cambiarTexto(reemplazar.value)}`

});

function cambiarTexto (str) {

    let string = str.toLowerCase();

    return string.replace (/(^\w)/, (pLetra) => pLetra.toUpperCase());

}