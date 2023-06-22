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

for (let i = 0; i < DEPARTAMENTOS.length; i++) {
    if (i !== 0) {
        let opcion = document.createElement ('option');
        opcion.value = i;
        opcion.innerHTML = DEPARTAMENTOS [i];

        let opcion_cargado = document.createElement ('option');
        let opcion_edad = document.createElement ('option');

        opcion_cargado = opcion.cloneNode (true);
        opcion_edad = opcion.cloneNode (true);

        departamento_censo.appendChild (opcion);
        departamento_cargado.appendChild (opcion_cargado);
        departamento_edad.appendChild (opcion_edad);
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

function Reasignar_censista () {

    let id_invitado = Number(this.parentNode.parentNode.id);
    console.log (id_invitado);
    let id_censista = Number(this.parentNode.previousSibling.firstChild.value);
    console.log (id_censista);

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

function Tabla_estadisticas () {

    personas_censadas.innerHTML = '';
    personas_por_departamento.innerHTML = '';
    personas_pendientes.innerHTML = '';

    personas_censadas.innerHTML = Personas_censadas ();
    Personas_por_departamento ();
    personas_pendientes.innerHTML = Personas_pendientes ();

}

function Personas_censadas () {
    return datos_usuarios.filter (usuario => usuario.censado === true).length;
}

function Personas_pendientes () {
    return datos_usuarios.filter (usuario => usuario.censado === false).length;
}

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

    if (menores !== 0) {

        let total = menores + mayores;

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

function Personas_menores_edad (departamento) {
    return datos_usuarios.filter (usuario => usuario.edad < 18 && usuario.departamento === DEPARTAMENTOS[departamento]).length;
}

function Personas_mayores_edad (departamento) {
    return datos_usuarios.filter (usuario => usuario.edad >= 18 && usuario.departamento === DEPARTAMENTOS[departamento]).length;
}

// --- TERMINA ESTADISTICAS ---