let datos_de_censistas = JSON.parse (localStorage.getItem ('censistas')) || [];
let datos_de_usuarios = JSON.parse (localStorage.getItem ('invitados')) || [];

let datos_temp_censistas = [];
let datos_temp_usuarios = [];

datos_temp_censistas.push (new Censista (12, "test", "user", "xdxd"));
datos_temp_censistas.push (new Censista (34, "test 2", "admin", "admin"));
datos_temp_censistas.push (new Censista (56, "test 3", "test", "test"));

datos_de_usuarios.push (new Usuario ("Artemis", "da Silva", 116, 76546939, "Rivera", "No trabaja", 12, false));
datos_de_usuarios.push (new Usuario ("Elliot", "Perez", 35, 92237146, "Treinta y Tres", "Independiente", 34, false));
datos_de_usuarios.push (new Usuario ("Chris", "da Silva", 81, 61244114, "Montevideo", "Estudiante", 56, false));
datos_de_usuarios.push (new Usuario ("Chris", "Perez", 101, 66431760, "Artigas", "Dependiente", 12, true));
datos_de_usuarios.push (new Usuario ("Oliver", "Gonzalez", 79, 37200685, "Durazno", "Dependiente", 34, true));
datos_de_usuarios.push (new Usuario ("Lady", "Perez", 32, 89967176, "Cerro Largo", "No trabaja", 12, false));
datos_de_usuarios.push (new Usuario ("Lady", "Garcia", 123, 14075188, "Rivera", "Independiente", 12, false));
datos_de_usuarios.push (new Usuario ("Nubia", "Bigotes", 105, 28082404, "Treinta y Tres", "Estudiante", 34, false));
datos_de_usuarios.push (new Usuario ("Chris", "da Silva", 6, 32080652, "Paysandú", "Independiente", 12, false));
datos_de_usuarios.push (new Usuario ("Diego", "Garcia", 37, 13658232, "Lavalleja", "No trabaja", 56, true));
datos_de_usuarios.push (new Usuario ("Rex", "Garcia", 74, 19856529, "San José", "Estudiante", 34, true));
datos_de_usuarios.push (new Usuario ("Lady", "Rodriguez", 95, 97845063, "Paysandú", "Independiente", 12, true));
datos_de_usuarios.push (new Usuario ("Nubia", "Perez", 29, 15792212, "Montevideo", "Estudiante", 34, true));
datos_de_usuarios.push (new Usuario ("Chris", "Garcia", 1, 67697648, "Treinta y Tres", "No trabaja", 12, false));
datos_de_usuarios.push (new Usuario ("Apollo", "da Silva", 80, 75137000, "Montevideo", "Estudiante", 34, false));
datos_de_usuarios.push (new Usuario ("Oliver", "Garcia", 83, 39042291, "Soriano", "No trabaja", 56, false));
datos_de_usuarios.push (new Usuario ("Lady", "Bafundo", 94, 45270751, "Flores", "Dependiente", 56, true));
datos_de_usuarios.push (new Usuario ("Nubia", "da Silva", 8, 79067556, "Colonia", "Estudiante", 34, true));
datos_de_usuarios.push (new Usuario ("Artemis", "Rodriguez", 85, 89700728, "Rio Negro", "Dependiente", 34, false));
datos_de_usuarios.push (new Usuario ("Artemis", "Gonzalez", 44, 86718156, "Lavalleja", "Independiente", 56, true));
datos_de_usuarios.push (new Usuario ("Lady", "Perez", 78, 17123748, "Treinta y Tres", "Independiente", 34, false));
datos_de_usuarios.push (new Usuario ("Apache", "Gonzalez", 106, 4808193, "Rio Negro", "Estudiante", 56, false));
datos_de_usuarios.push (new Usuario ("Rex", "Bafundo", 58, 38009218, "Florida", "Independiente", 12, true));
datos_de_usuarios.push (new Usuario ("Artemis", "Rodriguez", 36, 41730056, "Tacuarembó", "Dependiente", 56, true));
datos_de_usuarios.push (new Usuario ("Oliver", "Rodriguez", 89, 44556168, "Soriano", "Independiente", 34, true));
datos_de_usuarios.push (new Usuario ("Diego", "Garcia", 60, 23183825, "Rio Negro", "Dependiente", 12, false));
datos_de_usuarios.push (new Usuario ("Oliver", "Gonzalez", 93, 90815459, "Flores", "Estudiante", 56, false));
datos_de_usuarios.push (new Usuario ("Chris", "Garcia", 3, 59001451, "Soriano", "No trabaja", 12, false));
datos_de_usuarios.push (new Usuario ("Apollo", "Bafundo", 84, 15428576, "Flores", "Estudiante", 12, true));
datos_de_usuarios.push (new Usuario ("Diego", "Perez", 2, 70794194, "Florida", "Dependiente", 12, true));


for (const dato of datos_temp_censistas) {
    if (!datos_de_censistas.some (censista => censista.id === dato.id)) {
        datos_de_censistas.push (dato);
    }
}

for (const dato of datos_temp_usuarios) {
    if (!datos_de_usuarios.some (usuario => usuario.cedula === dato.cedula)) {
        datos_de_usuarios.push (dato);
    }
}

for (const dato of datos_de_censistas) {
    sistema.Agregar_censista (dato);
}


for (const dato of datos_de_usuarios) {
    sistema.Agregar_invitado (dato);
}

/* 

const NOMBRES = ["Apache", "Oliver", "Rex", "Chris", "Diego", "Nubia", "Artemis", "Apollo", "Elliot", "Lady"]
const APELLIDOS = ["Perez", "Gonzalez", "Garcia", "da Silva", "Bafundo", "Bigotes", "Rodriguez"]

if (datos_de_usuarios.length != 30) {

    const USUARIOS_RANDOM = Generar_usuario_random (30);

    for (const dato of USUARIOS_RANDOM) {
        datos_de_usuarios.push (dato);
    }

}

if (sistema.invitados.length != 30) {

    for (const dato of datos_de_usuarios) {
        sistema.agregar_invitado (dato);
    }

} 

function Elemento_random (arr) {
    let elemento;
    do {
        elemento = arr[Math.floor(Math.random() * arr.length)];
    } while (elemento === 0)
    return elemento;
}

function Generar_cedula_random () {
    let cedula = Math.floor(Math.random() * 100000000);
    return cedula.toString().padStart(8, '0');
}

function Generar_usuario_random (num) {

    let usuarios = [];

    for (let i = 0; i < num; i++) {
        let nombre = Elemento_random (NOMBRES);
        let apellido = Elemento_random (APELLIDOS);
        let edad = Math.floor(Math.random() * 130);
        let cedula;

        do {
            cedula = Generar_cedula_random ();
        } while (!Verificar_cedula (cedula));

        let departamento = Elemento_random (DEPARTAMENTOS);
        let ocupacion = Elemento_random (OCUPACIONES);
        let censista = Elemento_random (datos_de_censistas).id;
        let censado = Math.random() >= 0.5;

        usuarios.push (new Usuario (nombre, apellido, edad, cedula, departamento, ocupacion, censista, censado));

    }

    return usuarios;

}

*/