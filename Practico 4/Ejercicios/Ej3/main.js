let mostrar = document.getElementById ('pMostrar');
let imprimir = document.getElementById ('btnImprimir');
let numero = document.getElementById ('nbrNumero');

imprimir.addEventListener ('click', function () { 
    
    esBisiesto (numero.valueAsNumber) ? mostrar.innerHTML = `${numero.valueAsNumber} es bisiesto` : mostrar.innerHTML = `${numero.valueAsNumber} no es bisiesto`;

});

function esBisiesto (anio) {

    return ((anio % 4) === 0 && ((anio % 400) === 0 || (anio % 100 !== 0)));

}