let botonMostrar = document.getElementById ('btnMostrar');
let mostrar = document.getElementById ('pFibonacci');

let fiboArr = [1, 1];

botonMostrar.addEventListener ('click', completarArr);

function completarArr () {

    while (fiboArr.length < 20) {

        fiboArr.push (fiboArr [fiboArr.length - 1] + fiboArr [fiboArr.length - 2]);

    }

    mostrar.innerHTML = `${fiboArr}`

}