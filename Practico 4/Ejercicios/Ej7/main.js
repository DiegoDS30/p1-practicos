let mostrar = document.getElementById ('pMostrar');
let calcular = document.getElementById ('btnCalcular');
let fahrenheitInput = document.getElementById ('nbrFahrenheit');
let unidadInput = document.getElementById ('slcUnidad');

calcular.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${calcularFahrenheit (fahrenheitInput.valueAsNumber, unidadInput.value).toFixed(1)}`

});

function calcularFahrenheit (temp, unidad) {

    switch (unidad) {

        case '1': return (temp - 32) / 1.8;
            break;

        case '2': return (temp + 459.67) / 1.8;
            break;

        case '3': return temp + 459.67;
            break;
            
        case '4': return (temp - 32) / 2.25;
            break;

        default: temp
    }

}