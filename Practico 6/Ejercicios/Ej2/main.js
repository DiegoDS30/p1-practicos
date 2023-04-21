let numerosInput = document.getElementById ('nbrNumeros');
let botonIngresar = document.getElementById ('btnIngresar');
let botonMostrar = document.getElementById ('btnMostrar');
let mostrar = document.getElementById ('pMostrar');
let numeros = document.getElementById ('pNumeros');

let numerosArr = [];

botonIngresar.addEventListener ('click', function () {ingresarNumero (numerosInput.valueAsNumber)});

botonMostrar.addEventListener ('click', mostrarMayor);

function ingresarNumero (num) {

    numerosArr.push (num);

    numerosInput.value = '';

    numerosInput.focus();

    numeros.innerHTML = `${numerosArr}`;

}

function mostrarMayor () {

    mostrar.innerHTML = `${numerosArr.reduce ((mayor, num) => Math.max (mayor, num), -Infinity)}`;

}

