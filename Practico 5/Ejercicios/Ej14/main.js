let contar = document.getElementById ('txtContar');
let botonImprimir = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

botonImprimir.addEventListener ('click', function () {

    mostrar.innerHTML = `${contarLetras (contar.value)}`;

});

function contarLetras (str) {

    let primeraLetra = str [0].toLowerCase();
    let contador = 0

    for (let i = 0; i < str.length; i++) {

        if (str.charAt (i).toLowerCase() === primeraLetra) {

            contador++;

        }

    }
    
    return contador;

}