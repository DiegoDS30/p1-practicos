let contar = document.getElementById ('txtContar');
let botonImprimir = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

botonImprimir.addEventListener ('click', function () {

    mostrar.innerHTML = `Cantidad de minusculas: ${cantMin (contar.value)} <br>
                         cantidad de mayusculas: ${cantMay (contar.value)}`

});

function cantMin (str) {

    let contadorMinusculas = 0;

    for (let i = 0; i < str.length; i++) {

        if (str.charCodeAt(i) > 96 && str.charCodeAt (i) < 123) {

            contadorMinusculas++

        }

    }

    return contadorMinusculas;

}

function cantMay (str) {

    let contadorMayusculas = 0;

    for (let i = 0; i < str.length; i++) {

        if (str.charCodeAt(i) > 64 && str.charCodeAt (i) < 91) {

            contadorMayusculas++;

        } 

    }

    return contadorMayusculas;

}