let mostrar = document.getElementById ('pMostrar');
let calcular = document.getElementById ('btnCalcular');
let celsiusInput = document.getElementById ('nbrCelsius');

calcular.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${calcularFahrenheit (celsiusInput.valueAsNumber)}`

});

function calcularFahrenheit (celsius) {

    return 1.8 * celsius + 32;

}