// Oculta la sección actual cuando se cambia a una nueva.

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

// Muestra la sección nueva cuando se cambia.

Cambiar_seccion ('seccion_ingresar_persona');

function Mostrar_seccion () {
    let idSeccion = this.getAttribute ('id');
    let seccion = `seccion_${idSeccion}`
    console.log (seccion);
    Cambiar_seccion (seccion);
}

// Toma el identificador de la sección nueva para mostrar y oculta la vieja.

function Cambiar_seccion (nueva_seccion) {
    Ocultar_secciones ();
    document.getElementById (nueva_seccion).style.display = 'flex';
    switch (nueva_seccion) {
        case 'seccion_reasignar_persona':
            Reasignar_personas ();
            break;
        case 'seccion_estadisticas':
            Tabla_estadisticas ();
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
let departamento_edad = document.getElementById ('sltDepartamento-edades');

// Cargamos los elementos de los array departamentos y las ocupaciones en las opciones de los select

Cargar_departamentos (departamento_censo);
Cargar_departamentos (departamento_cargado);
Cargar_departamentos (departamento_edad);

Cargar_ocupaciones (ocupacion_censo);
Cargar_ocupaciones (ocupacion_cargado);

censo_form.addEventListener ('submit', (e) => {

    e.preventDefault ();

    let nombre_persona = nombre_censo.value;
    let apellido_persona = apellido_censo.value;
    let edad_persona = Number(Limpiar_numero(edad_censo.value));
    let cedula_persona = Limpiar_numero(cedula_censo.value);
    let departamento_persona = Select_departamentos (departamento_censo.value);
    let ocupacion_persona = Select_ocupaciones (ocupacion_censo.value);

    if (nombre_persona && apellido_persona && edad_persona && cedula_persona && departamento_persona && ocupacion_persona) {

        let cedula_verificada = Verificar_cedula (cedula_persona);

        if (!sistema.Buscar_invitado (Number(cedula_persona)) && cedula_verificada) {

            nuevo_usuario (nombre_persona, apellido_persona, edad_persona, Number(cedula_persona), departamento_persona, ocupacion_persona, censista_actual, true);

            aviso.innerHTML = 'Persona censada con exito!'

            nombre_censo.value = '';
            apellido_censo.value = '';
            edad_censo.value = '';
            cedula_censo.value = '';
            departamento_censo.value = 0;
            ocupacion_censo.value = 0;

        } else {

            aviso.innerHTML = 'La cedula ingresada no es valida o ya se encuentra en el sistema'

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

    if (Verificar_cedula(cedula_encontrada)) {

        let censado = sistema.Buscar_invitado (Number(cedula_encontrada));

        if (censado && (censado.censista === censista_actual) && !censado.censado) {

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
                censista: censista_actual,
                censado: true
            }

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

// --- REASIGNACION DE PERSONAS ---

let reasignar_persona = document.getElementById ('reasignar-personas');
let invitados_reasignar = sistema.Buscar_invitados_censar (censista_actual);

// Muestra todos los invitados que no hayan sido validados y estén asignados al censista actual.

function Reasignar_personas () {

    reasignar_persona.innerHTML = '';

    for (const invitado of invitados_reasignar) {

        if (!invitado.censado && (invitado.censista === censista_actual)) {

            let persona = document.createElement ('div');
            persona.classList.add ('persona');
            persona.id = invitado.cedula;

            let nombre = document.createElement ('p');
            nombre.innerHTML = `${invitado.nombre} ${invitado.apellido}, ${invitado.edad}, ${invitado.cedula}, ${invitado.departamento}, ${invitado.ocupacion}`;
            nombre.classList.add ('parrafo');

            let boton_reasignar_caja = document.createElement ('div');
            boton_reasignar_caja.classList.add ('input-caja');
            boton_reasignar_caja.classList.add ('boton');

            let boton_reasignar = document.createElement ('input');
            boton_reasignar.classList.add ('boton-reasignar');
            boton_reasignar.type = 'button';
            boton_reasignar.value = 'Reasignar';

            let select_reasignar_caja = document.createElement ('div');
            select_reasignar_caja.classList.add ('input-caja');
            select_reasignar_caja.classList.add ('select');

            let select_reasignar = document.createElement ('select');

            for (const censista of datos_censistas) {

                if (censista.id === censista_actual) continue;
                let opcion = document.createElement ('option');
                opcion.value = censista.id;
                opcion.innerHTML = censista.nombre;
                select_reasignar.appendChild (opcion);

            }

            reasignar_persona.appendChild (persona);
            persona.appendChild (nombre);
            persona.appendChild (select_reasignar_caja);
            select_reasignar_caja.appendChild (select_reasignar);
            persona.appendChild (boton_reasignar_caja);
            boton_reasignar_caja.appendChild (boton_reasignar);

        }

    }

    let botones_reasignar = document.querySelectorAll ('.boton-reasignar');
    for (const boton of botones_reasignar) {
        boton.addEventListener ('click', Reasignar_censista);
    }

}

// Toma la cedula de la persona y la id del nuevo censista y reasigna la persona a ese censista.

function Reasignar_censista () {

    let id_invitado = Number(this.parentNode.parentNode.id);
    let id_censista = Number(this.parentNode.previousSibling.firstChild.value);

    sistema.Reasignar_persona_censista (id_invitado, id_censista);

    Reasignar_personas ();

}

// --- TERMINA REASIGNACION DE PERSONAS ---

// --- ESTADISTICAS ---

let personas_censadas = document.getElementById ('personas-censadas');
let personas_por_departamento = document.getElementById ('personas-por-departamento');
let personas_pendientes = document.getElementById ('personas-pendientes');
let select_departamentos = document.getElementById ('sltDepartamento-edades');
let menores_edad = document.getElementById ('menores-edad');
let mayores_edad = document.getElementById ('mayores-edad');

// Genera la tabla de las estadísticas cuando se cambia a la sección.

function Tabla_estadisticas () {

    personas_censadas.innerHTML = '';
    personas_por_departamento.innerHTML = '';
    personas_pendientes.innerHTML = '';

    personas_censadas.innerHTML = Personas_censadas ();
    Personas_por_departamento ();
    personas_pendientes.innerHTML = Personas_pendientes ();

}

// Devuelve la cantidad de personas que sus datos hayan sido validados.

function Personas_censadas () {
    return datos_usuarios.filter (usuario => usuario.censado === true).length;
}

// Calcula el porcentaje de personas que faltan por validar.

function Personas_pendientes () {
    let personas_pendientes_censar = datos_usuarios.filter (usuario => usuario.censado === false).length;
    let total = datos_usuarios.length;
    return `${Math.round ((personas_pendientes_censar / total) * 100)}%`;
}

// Genera en la tabla todos los departamentos y la cantidad de personas que fueron censadas en cada uno de ellos.

function Personas_por_departamento () {

    let cantidad_por_departamento = [];
    for (const departamento of DEPARTAMENTOS) {
        cantidad_por_departamento.push (datos_usuarios.filter (usuario => usuario.departamento === departamento).length);
    }

    let cantidad_a_mostrar = [];

    for (let i = 1; i < DEPARTAMENTOS.length; i++) {
        let temp = {
            departamento: DEPARTAMENTOS[i],
            cantidad: cantidad_por_departamento[i]
        }
        cantidad_a_mostrar.push (temp);
    }

    cantidad_a_mostrar.sort ((a, b) => {
        return b.cantidad - a.cantidad;
    });

    for (const departamento of cantidad_a_mostrar) {
        let fila = document.createElement ('tr');
        let columna_departamento = document.createElement ('td');
        let columna_cantidad = document.createElement ('td');

        fila.classList.add ('fila');

        columna_departamento.innerHTML = departamento.departamento;
        columna_cantidad.innerHTML = departamento.cantidad;

        fila.appendChild (columna_departamento);
        fila.appendChild (columna_cantidad);

        personas_por_departamento.appendChild (fila);
    }

}

select_departamentos.addEventListener ('change', () => {

    menores_edad.innerHTML = '';
    mayores_edad.innerHTML = '';

    let departamento_seleccionado = select_departamentos.value;

    let menores = Personas_menores_edad (departamento_seleccionado);
    let mayores = Personas_mayores_edad (departamento_seleccionado);
    let total = menores + mayores;

    if (menores !== 0 || mayores !== 0) {

        let porcentaje_menores = Math.round ((menores / total) * 100);
        let porcentaje_mayores = Math.round ((mayores / total) * 100);

        let fila_menores = document.createElement ('tr');
        let fila_mayores = document.createElement ('tr');
        let columna_menores = document.createElement ('td');
        let columna_mayores = document.createElement ('td');

        fila_menores.classList.add ('fila');
        fila_mayores.classList.add ('fila');

        columna_menores.innerHTML = `${porcentaje_menores}%`;
        columna_mayores.innerHTML = `${porcentaje_mayores}%`;

        fila_menores.appendChild (columna_menores);
        fila_mayores.appendChild (columna_mayores);

        menores_edad.appendChild (fila_menores);
        mayores_edad.appendChild (fila_mayores);

    } else {

        let fila_menores = document.createElement ('tr');
        let fila_mayores = document.createElement ('tr');
        let columna_menores = document.createElement ('td');
        let columna_mayores = document.createElement ('td');

        fila_menores.classList.add ('fila');
        fila_mayores.classList.add ('fila');

        columna_menores.innerHTML = `0%`;
        columna_mayores.innerHTML = `0%`;

        fila_menores.appendChild (columna_menores);
        fila_mayores.appendChild (columna_mayores);

        menores_edad.appendChild (fila_menores);
        mayores_edad.appendChild (fila_mayores);

    }


})

//La cantidad de menores censadas en el departamento.

function Personas_menores_edad (departamento) {
    return datos_usuarios.filter (usuario => (usuario.edad < 18) && (usuario.departamento === DEPARTAMENTOS[departamento])).length;
}

// La cantidad de personas mayores censadas en el departamento.

function Personas_mayores_edad (departamento) {
    return datos_usuarios.filter (usuario => (usuario.edad >= 18) && (usuario.departamento === DEPARTAMENTOS[departamento])).length;
}

// --- TERMINA ESTADISTICAS ---