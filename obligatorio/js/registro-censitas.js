let nombre = document.getElementById ('txtNombre');
let apellido = document.getElementById ('txtApellido');
let usuario = document.getElementById ('txtUsuario');
let pass = document.getElementById ('txtPass');
let pass_confirm = document.getElementById ('txtPassConfirm');
let registro_form = document.getElementById ('registro');
let confirmacion = document.getElementById ('pConfirmacion');

let datos_censistas = sistema.censistas || [];

registro_form.addEventListener ('submit', (e) => {

    e.preventDefault();

    if (nombre.value && apellido.value && usuario.value && pass.value && pass_confirm.value) { // Que todos los campos esten llenos

        if (PASS_REGEX.test (pass.value)) { // La contraseña tiene que cumplir con los estandares

            if (pass.value == pass_confirm.value) { // Las contraseñas tienen que coincidir

                let id_censista_nuevo = Math.floor(Math.random() * (100000 - 1 + 1) + 1); // numero random del 1 al 100000

                // Mientras exista un censista con la id nueva, se van a seguir generando ids nuevas

                while (Verificar_id(datos_censistas, id_censista_nuevo)) {

                    id_censista_nuevo = Math.floor(Math.random() * (100000 - 1 + 1) + 1);

                }

                // Cuando ya haya una id nueva unica, generamos el nuevo censista con los datos ingresados

                nuevo_usuario_censista (id_censista_nuevo, `${nombre.value} ${apellido.value}`, usuario.value, pass.value);

                nombre.value = '';
                apellido.value = '';
                usuario.value = '';
                pass.value = '';
                pass_confirm.value = '';

                confirmacion.innerHTML = 'Te has registrado con exito!! <a href="./ingreso-censistas.html">Ingresa</a> ahora!'
    
            } else {
    
                confirmacion.innerHTML = 'Ambas contraseñas deben de coincidir'
    
            }

        } else {

            confirmacion.innerHTML = 'La contraseña debe de contar con cinco caracteres, por lo menos una mayuscula, una minuscula y un numero'

        }

    }

});


/**
 * La funcion busca si ya existe una ID en un array de objetos.
 * @param datos - el parametro "datos" es un array de objetos
 * @param id - el parametro "id" es un valor que representa el identificador de un objeto.
 * Se usa en la funcion para comprobar si existe un objeto en el array "datos"
 * que tenga el mismo identificador que el pasado como argumento.
 * @returns un valor booleano que indica si existe un objeto en el array "datos" que tenga una propiedad "id"
 */

function Verificar_id (datos, id) {
    return datos.some (dato => dato.id === id);
}