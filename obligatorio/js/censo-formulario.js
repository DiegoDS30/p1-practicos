let datos_usuarios = sistema.invitados;
let datos_censistas = sistema.censistas;

let buscar_cedula = document.getElementById ('nbrBuscarCedula');
let buscar_boton = document.getElementById ('btnBuscar');
let buscar_aviso = document.getElementById ('pAviso-buscar');

let usuario_form = document.getElementById ('censo-user');
let nombre_usuario = document.getElementById ('txtNombre');
let apellido_usuario = document.getElementById ('txtApellido');
let edad_usuario = document.getElementById ('nbrEdad');
let cedula_usuario = document.getElementById ('nbrCedula');
let departamento_usuario = document.getElementById ('sltDepartamento');
let ocupacion_usuario = document.getElementById ('sltOcupacion');
let aviso_usuario = document.getElementById ('pAviso');
let censista_usuario = 0;

let censista_random = datos_censistas [Math.floor(Math.random() * datos_censistas.length)];

for (let i = 0; i < DEPARTAMENTOS.length; i++) {
    if (i !== 0) {
        let opcion = document.createElement ('option');
        opcion.value = i;
        opcion.innerHTML = DEPARTAMENTOS [i];
        departamento_usuario.appendChild (opcion);
    }
}

for (let i = 0; i < OCUPACIONES.length; i++) {
    if (i !== 0) {
        let opcion = document.createElement ('option');
        opcion.value = i;
        opcion.innerHTML = OCUPACIONES [i];
        ocupacion_usuario.appendChild (opcion);
    }
}

buscar_boton.addEventListener ('click', () => {

    let cedula = Limpiar_numero (buscar_cedula.value);

    if (Verificar_cedula(cedula)) {

        let usuario = sistema.Buscar_invitado ((Number(cedula)));

        if (usuario && !usuario.censado) {

            nombre_usuario.value = usuario.nombre;
            apellido_usuario.value = usuario.apellido;
            edad_usuario.value = usuario.edad;
            cedula_usuario.value = usuario.cedula;
            departamento_usuario.value = DEPARTAMENTOS.indexOf(usuario.departamento);
            ocupacion_usuario.value = OCUPACIONES.indexOf(usuario.ocupacion);

            let campos = document.querySelectorAll ('.habilitar');
            for (const campo of campos) {
                campo.disabled = false;
            }

            censista_usuario = usuario.censista;

            let boton_borrar_caja = document.createElement ('div');
            let boton_borrar = document.createElement ('input');
            boton_borrar_caja.classList.add ('input-caja');
            boton_borrar_caja.classList.add ('boton');
            boton_borrar.classList.add ('boton-borrar');
            boton_borrar.type = 'button';
            boton_borrar.value = 'Borrar';

            usuario_form.appendChild (boton_borrar_caja);
            boton_borrar_caja.appendChild (boton_borrar);

            Habilitar_borrar ();

        } else {

            let campos = document.querySelectorAll ('.habilitar');
            for (const campo of campos) {
                campo.disabled = false;
            }

            cedula_usuario.value = cedula;

        }

    } else {
        
            buscar_aviso.innerHTML = "Ingrese una cedula valida";
    }

});

usuario_form.addEventListener ('submit', (e) => {

    e.preventDefault();

    let nombre_confirmar = nombre_usuario.value;
    let apellido_confirmar = apellido_usuario.value;
    let edad_confirmar = Number (Limpiar_numero (edad_usuario.value));
    let cedula_confirmar = Limpiar_numero (cedula_usuario.value);
    let departamento_confirmar = Select_departamentos (departamento_usuario.value);
    let ocupacion_confirmar = Select_ocupaciones (ocupacion_usuario.value);

    if (nombre_confirmar && apellido_confirmar && edad_confirmar && cedula_confirmar && departamento_confirmar && ocupacion_confirmar) {

        if (Verificar_cedula (cedula_confirmar)) {

            let censista_asignado = censista_usuario === 0 ? censista_random.id : censista_usuario

            let usuario_confirmar = {
                nombre: nombre_confirmar,
                apellido: apellido_confirmar,
                edad: edad_confirmar,
                cedula: Number(cedula_confirmar),
                departamento: departamento_confirmar,
                ocupacion: ocupacion_confirmar,
                censista: censista_asignado,
                censado: false
            }

            if (datos_usuarios.find (usuario => usuario.cedula === usuario_confirmar.cedula)) {
            
                sistema.Actualizar_invitado (usuario_confirmar);

            } else {

                sistema.Agregar_invitado (usuario_confirmar);

            }

            let campos = document.querySelectorAll ('.habilitar');
            for (const campo of campos) {
                if (campo.id !== 'sltDepartamento' && campo.id !== 'sltOcupacion' && campo.id !== 'btnEnviar') {
                    campo.value = '';
                    campo.disabled = true;
                } else if (campo.id === 'sltDepartamento') {
                    campo.value = 0;
                    campo.disabled = true;
                } else if (campo.id === 'sltOcupacion') {
                    campo.value = 0;
                    campo.disabled = true;
                } else if (campo.id === 'btnEnviar') {
                    campo.disabled = true;
                }
            }

            censista_usuario = 0;
            aviso_usuario.innerHTML = `El censista asignado es: ${datos_censistas.find (censista => censista.id === censista_asignado).nombre}`;

        } else {
                
            aviso_usuario.innerHTML = "Ingrese una cedula valida";
    
        }

    } else {
            
        aviso_usuario.innerHTML = "El departamento y la ocupacion deben de ser seleccionados";
    
    }
});

function Habilitar_borrar () {

    document.querySelector ('.boton-borrar').addEventListener ('click', () => {

        let cedula = Limpiar_numero (cedula_usuario.value);

        if (Verificar_cedula (cedula)) {

            let usuario = sistema.Buscar_invitado ((Number(cedula)));

            if (usuario) {

                confirm ('Esta seguro que desea borrar este usuario?')

                sistema.Borrar_invitado (usuario);

                let campos = document.querySelectorAll ('.habilitar');
                for (const campo of campos) {
                    if (campo.id !== 'sltDepartamento' && campo.id !== 'sltOcupacion' && campo.id !== 'btnEnviar') {
                        campo.value = '';
                        campo.disabled = true;
                    } else if (campo.id === 'sltDepartamento') {
                        campo.value = 0;
                        campo.disabled = true;
                    } else if (campo.id === 'sltOcupacion') {
                        campo.value = 0;
                        campo.disabled = true;
                    } else if (campo.id === 'btnEnviar') {
                        campo.disabled = true;
                    }
                }

                aviso_usuario.innerHTML = `Los datos del censo han sido borrados<br>
                <small>* Los usuarios precargados se borran del sistema, pero se vuelven a cargar cuando se recarga o cambia la pagina</small>`;

                document.querySelector ('.boton-borrar').parentElement.remove ();
                document.querySelector ('.boton-borrar').remove ();

            } else {
                    
                aviso_usuario.innerHTML = "Ingrese una cedula valida";
        
            }

        } else {
                
            aviso_usuario.innerHTML = "Ingrese una cedula valida";
        
        }

    });

}