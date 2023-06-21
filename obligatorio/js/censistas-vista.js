function Ocultar_secciones () {
    let secciones = document.querySelectorAll ('.seccion');
    for (const seccion of secciones) {
        seccion.style.display = 'none';
    }
}

let botones = document.querySelectorAll ('.cambiar');
for (const boton of botones) {
    boton.addEventListener ('click', Mostrar_seccion);
}

Cambiar_seccion ('seccion_ingresar_persona');

function Mostrar_seccion () {
    let idSeccion = this.getAttribute ('id');
    let seccion = `seccion_${idSeccion}`
    console.log (seccion);
    Cambiar_seccion (seccion);
}

function Cambiar_seccion (nueva_seccion) {
    Ocultar_secciones ();
    document.getElementById (nueva_seccion).style.display = 'flex';
    switch (nueva_seccion) {
        case 'seccion_reasignar_persona':
            reasignar_personas ();
            break;
        case 'seccion_estadisticas':
            tabla_estadisticas ();
            break;
    }
}

let datos_usuarios = sistema.invitados || [];
let datos_censistas = sistema.censistas || [];
let censista_actual = user_id;

// --- INICIA FORMULARIO DE CENSO ---

let censo_form = document.getElementById ('censo-censista');
let nombre_censo = document.getElementById ('txtNombre-censo');
let apellido_censo = document.getElementById ('txtApellido-censo');
let edad_censo = document.getElementById ('nbrEdad-censo');
let cedula_censo = document.getElementById ('nbrCedula-censo');
let departamento_censo = document.getElementById ('sltDepartamento-censo');
let ocupacion_censo = document.getElementById ('sltOcupacion-censo');
let aviso = document.getElementById ('pAviso-censo');


let departamento_cargado = document.getElementById ('sltDepartamento-cargado');
let ocupacion_cargado = document.getElementById ('sltOcupacion-cargado');

// Cargamos los elementos de los array departamentos y las ocupaciones en las opciones de los select

for (let i = 0; i < DEPARTAMENTOS.length; i++) {
    if (i !== 0) {
        let opcion = document.createElement ('option');
        opcion.value = i;
        opcion.innerHTML = DEPARTAMENTOS [i];
        departamento_censo.appendChild (opcion);
        departamento_cargado.appendChild (opcion);
    }
}

for (let i = 0; i < OCUPACIONES.length; i++) {
    if (i !== 0) {
        let opcion = document.createElement ('option');
        opcion.value = i;
        opcion.innerHTML = OCUPACIONES [i];
        ocupacion_censo.appendChild (opcion);
        ocupacion_cargado.appendChild (opcion);
    }
}

censo_form.addEventListener ('submit', (e) => {

    e.preventDefault ();

    let nombre_persona = nombre_censo.value;
    let apellido_persona = apellido_censo.value;
    let edad_persona = Number(Limpiar_numero(edad_censo.value));
    let cedula_persona = Limpiar_numero(cedula_censo.value);
    let departamento_persona = Select_departamentos (departamento_censo.value);
    let ocupacion_persona = Select_ocupaciones (ocupacion_censo.value);

    if (nombre_persona && apellido_persona && edad_persona && cedula_persona && departamento_persona && ocupacion_persona) {

        if (Verificar_cedula(cedula_persona)) {

            nuevo_usuario (nombre_persona, apellido_persona, edad_persona, Number(cedula_persona), departamento_persona, ocupacion_persona, censista_actual, true);

            aviso.innerHTML = 'Persona censada con exito!'

            nombre_censo.value = '';
            apellido_censo.value = '';
            edad_censo.value = '';
            cedula_censo.value = '';
            departamento_censo.value = 0;
            ocupacion_censo.value = 0;

        } else {

            aviso.innerHTML = 'La cedula ingresada no es valida'

        }

    } else {

        aviso.innerHTML = 'El departamento y la ocupacion deben de ser seleccionados'

    }

});

// --- TERMINA FORMULARIO DE CENSO ---

// --- CONSULTA DE CENSOS ---

let cedula_buscar = document.getElementById ('nbrBuscarCedula');
let boton_buscar = document.getElementById ('btnBuscar');
let aviso_buscar = document.getElementById ('pAviso-buscar');

let confirmar_form = document.getElementById ('censo-confirmar');
let nombre_cargado = document.getElementById ('txtNombre-cargado');
let apellido_cargado = document.getElementById ('txtApellido-cargado');
let edad_cargado = document.getElementById ('nbrEdad-cargado');
let cedula_cargado = document.getElementById ('nbrCedula-cargado');
let aviso_cargado = document.getElementById ('pAviso-cargado');

boton_buscar.addEventListener ('click', () => {

    let cedula_encontrada = Limpiar_numero (cedula_buscar.value);

    if (cedula_encontrada) {

        let censado = sistema.Buscar_invitado (Number(cedula_encontrada));

        if (censado && (censado.censita === censista_actual) && !censado.censado) {

            nombre_cargado.value = censado.nombre;
            apellido_cargado.value = censado.apellido;
            edad_cargado.value = censado.edad;
            cedula_cargado.value = censado.cedula;
            departamento_cargado.value = DEPARTAMENTOS.indexOf(censado.departamento);
            ocupacion_cargado.value = OCUPACIONES.indexOf(censado.ocupacion);

            let campos = document.querySelectorAll ('.habilitar');
            for (const campo of campos) {
                campo.disabled = false;
            }

        } else {

            aviso_buscar.innerHTML = 'La cedula ingresada no se encuentra en el sistema, ya fue censada o no fue asignado a usted'

        }

    } else {

        aviso_buscar.innerHTML = 'La cedula ingresada no es valida';

    }


});

confirmar_form.addEventListener ('submit', (e) => {

    e.preventDefault ();

    let nombre_persona = nombre_cargado.value;
    let apellido_persona = apellido_cargado.value;
    let edad_persona = Number(Limpiar_numero(edad_cargado.value));
    let cedula_persona = Limpiar_numero(cedula_cargado.value);
    let departamento_persona = Select_departamentos (departamento_cargado.value);
    let ocupacion_persona = Select_ocupaciones (ocupacion_cargado.value);

    if (nombre_persona && apellido_persona && edad_persona && cedula_persona && departamento_persona && ocupacion_persona) {
    
        if (Verificar_cedula (cedula_persona)) {

            let invitado_actualizado = {
                nombre: nombre_persona,
                apellido: apellido_persona,
                edad: edad_persona,
                cedula: Number(cedula_persona),
                departamento: departamento_persona,
                ocupacion: ocupacion_persona,
                censita: censista_actual,
                censado: true
            }

            console.log (invitado_actualizado);

            sistema.Actualizar_invitado (invitado_actualizado);

            let campos = document.querySelectorAll ('.habilitar');
            for (const campo of campos) {
                if (campo.id !== 'sltDepartamento-cargado' && campo.id !== 'sltOcupacion-cargado' && campo.id !== 'btnConfirmar') {
                    campo.value = '';
                    campo.disabled = true;
                } else if (campo.id === 'sltDepartamento-cargado') {
                    campo.value = 0;
                    campo.disabled = true;
                } else if (campo.id === 'sltOcupacion-cargado') {
                    campo.value = 0;
                    campo.disabled = true;
                } else if (campo.id === 'btnConfirmar') {
                    campo.disabled = true;
                }
            }

            aviso_cargado.innerHTML = 'Persona actualizada con exito!'

        } else {

            aviso_cargado.innerHTML = 'La cedula ingresada no es valida'

        }

    } else {

        aviso_cargado.innerHTML = 'El departamento y la ocupacion deben de ser seleccionados'

    }

});

// --- TERMINA CONSULTA DE CENSOS ---