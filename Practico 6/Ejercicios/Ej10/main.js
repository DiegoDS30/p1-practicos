let repetidosInput = document.getElementById ('txtRepetidos');
let botonIngresar = document.getElementById ('btnIngresar');
let botonReducir = document.getElementById ('btnReducir');
let mostrar = document.getElementById ('pMostrar');

let repArr = [];

botonIngresar.addEventListener ('click', function () {ingresarArr (repetidosInput.value)});
botonReducir.addEventListener ('click', reducirArr);

function ingresarArr (char) {

    repArr.push (char);

    repetidosInput.value = '';
    repetidosInput.focus ();

    return mostrar.innerHTML = `Actualmente en el array: ${repArr}`;

}

function reducirArr () {

    repArr = [... new Set (repArr)];

    // sin Set
    // repArr = repArr.filter ((repetido, index, arr) => arr.indexOf(repetido) === index);
    // Con filter loopeamos el array dejamos solo los valores que pasan la CB function
    // la cual se fija si el valor es la primera vez que aparece, si no es duplicado
    // y no lo devuelve

    return mostrar.innerHTML = `Actualmente en el array: ${repArr}`;

}