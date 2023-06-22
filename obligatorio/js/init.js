const PASS_REGEX = new RegExp (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/);
const DATOS = '../datos/db.json';
const DEPARTAMENTOS = [false, 'Montevideo', 'Canelones', 'Maldonado', 'Rocha', 'Colonia', 'San José', 'Soriano', 'Flores', 'Florida', 'Lavalleja', 'Durazno', 'Tacuarembó', 'Paysandú', 'Rio Negro', 'Salto', 'Artigas', 'Rivera', 'Cerro Largo', 'Treinta y Tres']
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
    mostrar_usuario.innerHTML = `Bienvenido ${user}!`

    censo.style.display = "none"

    sitio.href = './index.html'
    sitio.innerHTML = 'Salir'

}

document.getElementById ('sitio').addEventListener ('click', () => {
    localStorage.removeItem ('user');
});

function nuevo_usuario_censista (id, nombre, usuario, pass) {
    let censista_nuevo = new Censista (id, nombre, usuario, pass);
    sistema.agregar_censista (censista_nuevo);
}

function nuevo_usuario (nombre, apellido, edad, cedula, departamento, ocupacion, censista, censado) {
    let usuario_nuevo = new Usuario (nombre, apellido, edad, cedula, departamento, ocupacion, censista, censado);
    sistema.agregar_invitado (usuario_nuevo);
}

function Select_departamentos (departamento) {
    return DEPARTAMENTOS [departamento];
}

function Select_ocupaciones (ocupacion) {
    return OCUPACIONES [ocupacion];
}

function Limpiar_numero (num) {
    return num.replace(/\D/g, '');
}

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