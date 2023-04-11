let mostrar = document.getElementById ('pMostrar');
let imprimir = document.getElementById ('btnImprimir');
let numero1 = document.getElementById ('nbrNumero1');
let numero2 = document.getElementById ('nbrNumero2');

imprimir.addEventListener ('click', function () { 
    
    esMayor (numero1.valueAsNumber, numero2.valueAsNumber) ? mostrar.innerHTML = `Es mayor` : mostrar.innerHTML = `Es menor`;

});

function esMayor (edad, tope) {

    return edad > tope;

}