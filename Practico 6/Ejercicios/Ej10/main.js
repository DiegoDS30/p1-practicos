let botonIngresar = document.getElementById ('btnIngresar');
let botonEliminar = document.getElementById ('btnEliminar');
let mostrar = document.getElementById ('pMostrar');
let inputEliminar = document.getElementById ('txtEliminar');

let eliminar = []

botonIngresar.addEventListener ('click', function () { agrearArr (eliminar, inputEliminar.value) });
botonEliminar.addEventListener ('click', function () { eliminarDelArr (eliminar, inputEliminar.value) });

function agrearArr (arr, str) {

    arr.push (str);

    return mostrar.innerHTML = `Actualmente en el array: ${arr}`

}

function eliminarDelArr (arr, str) {

    let index = arr.indexOf (str)

    if (index > -1) {

        arr.splice (index, 1);

        return mostrar.innerHTML = `Actualmente en el array: ${arr}`

    } else {

        return mostrar.innerHTML = `El elemento no existe en el array, los elementos que tiene son: ${arr}`

    }

}