let mostrar = document.getElementById ('pMostrar');
let numero1 = document.getElementById ('nbrNumero1');
let numero2 = document.getElementById ('nbrNumero2');
let imprimir = document.getElementById ('btnImprimir');

imprimir.addEventListener ('click', function () { numeroPares (numero1.valueAsNumber, numero2.valueAsNumber); });

function numeroPares (n1, n2) {

    let numeroMinimo = Math.min (n1, n2);
    let numeroMaximo = Math.max (n1, n2);

    let contador = 0;
    let contador2 = numeroMinimo

    while (contador2 <= numeroMaximo) {

        contador2 % 2 == 0 ? contador++ : contador;
        contador2++

    }

    return mostrar.innerHTML = `Entre ${numeroMinimo} y ${numeroMaximo} hay ${contador} numeros pares.`

}