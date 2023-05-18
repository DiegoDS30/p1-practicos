let mayoresInput = document.getElementById ('nbrMayores');
let botonIngresar = document.getElementById ('btnIngresar');
let botonMostrar = document.getElementById ('btnMostrar');
let mostrar = document.getElementById ('pMostrar');

let numerosArr = [];

botonIngresar.addEventListener ('click', function () {ingresarArr (mayoresInput.valueAsNumber)});
botonMostrar.addEventListener ('click', mayorIgualArr);

function ingresarArr (num) {

    numerosArr.push (num);

    mayoresInput.value = '';
    mayoresInput.focus ();

    return mostrar.innerHTML = `Actualmente en el array: ${numerosArr}`;

}

function mayorIgualArr () {

    numerosArr = numerosArr.filter (num => num >= numerosArr [0]);

    return mostrar.innerHTML = `Actualmente en el array: ${numerosArr}`;

}