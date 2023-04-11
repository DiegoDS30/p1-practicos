let mostrar = document.getElementById ('pMostrar');
let calcular = document.getElementById ('btnCalcular');
let anchoInput = document.getElementById ('nbrAncho');
let altoInput = document.getElementById ('nbrAlto');

calcular.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${calcularAreaTriangulo (anchoInput.valueAsNumber, altoInput.valueAsNumber)}`

});

function calcularAreaTriangulo (ancho, alto) {

    if (ancho <= 0 || alto <= 0) {

        return -1;

    } else {

        return ancho * alto;

    }

}