const PASS_REGEX = new RegExp (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{5,}$/);
const DATOS = '../datos/db.json';

let sistema = new Sistema ();

function nuevo_usuario_censista (id, nombre, usuario, pass) {
    let censista_nuevo = new Censista (id, nombre, usuario, pass);
    sistema.agregar_censista (censista_nuevo);
}

function nuevo_usuario (nombre, apellido, edad, cedula, departamento, ocupacion, censita, censado) {
    let usuario_nuevo = new Usuario (nombre, apellido, edad, cedula, departamento, ocupacion, censita, censado);
    sistema.agregar_invitado (usuario_nuevo);
}