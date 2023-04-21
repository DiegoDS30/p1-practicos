let numerosInput = document.getElementById ('nbrNumeros');
let botonIngresar = document.getElementById ('btnIngresar');
let botonMostrar = document.getElementById ('btnMostrar');
let mostrar = document.getElementById ('pMostrar');
let numeros = document.getElementById ('pNumeros');

let numerosArr = [];

botonIngresar.addEventListener ('click', function () {ingresarNumero (numerosInput.valueAsNumber)});

botonMostrar.addEventListener ('click', calcularPromedio);

function ingresarNumero (num) {

    numerosArr.push (num);

    numerosInput.value = '';

    numerosInput.focus();

    numeros.innerHTML = `${numerosArr}`;

}

function calcularPromedio () {

    mostrar.innerHTML = `${numerosArr.filter ((num) => num > 20)}`;

}

