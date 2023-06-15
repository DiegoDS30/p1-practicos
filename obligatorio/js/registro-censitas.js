let nombre = document.getElementById ('txtNombre');
let apellido = document.getElementById ('txtApellido');
let usuario = document.getElementById ('txtUsuario');
let pass = document.getElementById ('txtPass');
let pass_confirm = document.getElementById ('txtPassConfirm');
let registro_form = document.getElementById ('registro');
let confirmacion = document.getElementById ('pConfirmacion');

// let datos_censistas = Traer_datos (DATOS, censistas) no funca jeje

let datos_censistas = []

fetch (DATOS)
    .then (res => res.json())
    .then (data => { 
        datos_censistas = data.censistas;
});

registro_form.addEventListener ('submit', (e) => {

    e.preventDefault();

    if (nombre.value && apellido.value && usuario.value && pass.value && pass_confirm.value) {

        if (PASS_REGEX.test (pass.value)) {

            if (pass.value == pass_confirm.value) {

                let id_censista_nuevo = Math.floor(Math.random() * (100000 - 1 + 1) + 1); // numero random del 1 al 100000

                // Mientras exista un censista con la id nueva, se van a seguir generando ids nuevas

                while (Verificar_id(datos_censistas, id_censista_nuevo)) {

                    id_censista_nuevo = Math.floor(Math.random() * (100000 - 1 + 1) + 1);

                }

                // Cuando ya haya una id nueva, generamos el nuevo censista con los datos ingresados

                let nuevo_censista = {
                    id: id_censista_nuevo,
                    nombre: `${nombre.value} ${apellido.value}`,
                    usuario: usuario.value,
                    pass: pass.value
                }

                fetch(DATOS, {
                    method: "POST",
                    body: nuevo_censista,
                    headers: {
                        "Content-type": "application/json"
                    }
                });
        
                datos_censistas.push(nuevo_censista);
    
            } else {
    
                confirmacion.innerHTML = 'Ambas contraseñas deben de coincidir'
    
            }

        } else {

            confirmacion.innerHTML = 'La contraseña debe de contar con cinco caracteres, por lo menos una mayuscula, una minuscula y un numero'

        }

    }

});

/* Funcion para verificar que no exista ya un censista con la id generada
   @param datos - un array
   @param id - la id a buscar
*/

function Verificar_id (datos, id) {

    return datos.some (dato => dato.id === id);

}