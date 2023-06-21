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
        case 'seccion_consultar_censos':
            mostrar_censos ();
            break;
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

let censo_form = document.getElementById ('censo-censista');
let nombre_censo = document.getElementById ('txtNombre-censo');
let apellido_censo = document.getElementById ('txtApellido-censo');
let edad_censo = document.getElementById ('nbrEdad-censo');
let cedula_censo = document.getElementById ('nbrCedula-censo');
let departamento_censo = document.getElementById ('sltDepartamento-censo');
let ocupacion_censo = document.getElementById ('sltOcupacion-censo');
let aviso = document.getElementById ('pAviso-censo');

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

let confirmar_form = document.getElementById ('censo-confirmar');