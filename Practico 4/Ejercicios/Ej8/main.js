let mostrar = document.getElementById ('pMostrar');
let calcular = document.getElementById ('btnCalcular');
let baseInput = document.getElementById ('nbrBase');
let expInput = document.getElementById ('nbrExp');

calcular.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${calcularPotencia (baseInput.valueAsNumber, expInput.valueAsNumber)}`

});

function calcularPotencia (base, exponente) {

    if (base === 0) {

        return `La base tiene que ser distinta a 0`

    } else if (exponente === 0) {

        return 1

    } else {

        let resultado = 1;
        let expAbs = Math.abs (exponente);

        for (let i = 0; i < expAbs; i++) {

            resultado *= base;

        }

        if (exponente < 0) {

            return (1 / resultado);

        } else {

            return resultado;

        }

    }

}