let mostrar = document.getElementById ('pMostrar');
let calcular = document.getElementById ('btnCalcular');
let baseInput = document.getElementById ('nbrBase');
let alturaInput = document.getElementById ('nbrAltura');

calcular.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${calcularAreaTriangulo (baseInput.valueAsNumber, alturaInput.valueAsNumber)}`

});

function calcularAreaTriangulo (base, altura) {

    if (base <= 0 || altura <= 0) {

        return -1

    } else {

        return (base * altura) / 2

    }

}