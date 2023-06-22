const PASS_REGEX = new RegExp (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/); // La contraseña debe de contar con cinco caracteres, por lo menos una mayuscula, una minuscula y un numero
const DATOS = '../datos/db.json';
// Almacena los departamentos del Uruguay para cargar dinámicamente
const DEPARTAMENTOS = [false, 'Montevideo', 'Canelones', 'Maldonado', 'Rocha', 'Colonia', 'San José', 'Soriano', 'Flores', 'Florida', 'Lavalleja', 'Durazno', 'Tacuarembó', 'Paysandú', 'Rio Negro', 'Salto', 'Artigas', 'Rivera', 'Cerro Largo', 'Treinta y Tres']
// Almacena las ocupaciones para cargar dinámicamente
const OCUPACIONES = [false, 'Dependiente', 'Independiente', 'Estudiante', 'No trabaja']

let sistema = new Sistema ();

let user = JSON.parse(localStorage.getItem('user')).usuario;
let user_id = JSON.parse(localStorage.getItem('user')).id;

if (user === null) {

  location.href='../login.html';

}

if (user != '') {

    let mostrar_usuario = document.getElementById ('mostrar_usuario');
    let censo = document.getElementById ('censo');
    let sitio = document.getElementById ('sitio');

    mostrar_usuario.href = './censistas-vista.html'
    mostrar_usuario.innerHTML = `Administración de ${user}`

    censo.style.display = "none"

    sitio.href = './index.html'
    sitio.innerHTML = 'Salir'

}

document.getElementById ('sitio').addEventListener ('click', () => {
    localStorage.removeItem ('user');
});

// Genera un objeto nuevo de tipo censista y lo agrega al array de censistas.

function nuevo_usuario_censista (id, nombre, usuario, pass) {
    let censista_nuevo = new Censista (id, nombre, usuario, pass);
    sistema.Agregar_censista (censista_nuevo);
}

// Genera un objeto nuevo de tipo invitado y lo agrega al array de invitados.

function nuevo_usuario (nombre, apellido, edad, cedula, departamento, ocupacion, censista, censado) {
    let usuario_nuevo = new Usuario (nombre, apellido, edad, cedula, departamento, ocupacion, censista, censado);
    sistema.Agregar_invitado (usuario_nuevo);
}

// Genera dinámicamente en las etiquetas los departamentos.

function Cargar_departamentos (tag) {

    for (let i = 0; i < DEPARTAMENTOS.length; i++) {
        if (i !== 0) {
            let opcion = document.createElement ('option');
            opcion.value = i;
            opcion.innerHTML = DEPARTAMENTOS [i];
            tag.appendChild (opcion);
        }
    }

}

// Genera dinámicamente en las etiquetas las ocupaciones.

function Cargar_ocupaciones (tag) {

    for (let i = 0; i < OCUPACIONES.length; i++) {
        if (i !== 0) {
            let opcion = document.createElement ('option');
            opcion.value = i;
            opcion.innerHTML = OCUPACIONES [i];
            tag.appendChild (opcion);
        }
    }

}

// Carga en variables el departamento según su índice.

function Select_departamentos (departamento) {
    return DEPARTAMENTOS [departamento];
}

// Carga en variables la ocupación según su índice.

function Select_ocupaciones (ocupacion) {
    return OCUPACIONES [ocupacion];
}

// Elimina caracteres y símbolos.

function Limpiar_numero (num) {
    return num.replace(/\D/g, '');
}

// Valida que el número verificador sea correcto.

function Verificar_cedula (ci) {

    let cedula = Limpiar_numero (ci);
    if (cedula.length === 7) {
        cedula = '0' + cedula;
    }

    let codigo = '2987634';
    let acumulador = 0;
    let digito_a_verificar = cedula.charAt (cedula.length - 1);

    for (let i = 0; i < cedula.length - 1; i++) {
        let multiplicacion = Number(cedula.charAt(i)) * Number(codigo.charAt(i));
        acumulador += multiplicacion;
    }

    let digito_verificador = (10 - (acumulador % 10)) % 10;

    return Number(digito_a_verificar) === digito_verificador;

}