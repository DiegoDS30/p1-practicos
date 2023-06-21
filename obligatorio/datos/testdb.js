let datos_de_censistas = JSON.parse (localStorage.getItem ('censistas')) || [];
let datos_de_usuarios = JSON.parse (localStorage.getItem ('invitados')) || [];

let datos_temp_censistas = [];
let datos_temp_usuarios = [];

datos_temp_censistas.push (new Censista (12, "test", "user", "xdxd"));
datos_temp_censistas.push (new Censista (34, "test 2", "admin", "admin"));
datos_temp_censistas.push (new Censista (56, "test 3", "test", "test"));

datos_temp_usuarios.push (new Usuario ("Diego", "da Silva", 25, 48081939, "Montevideo", "Dependiente", 34, false));
datos_temp_usuarios.push (new Usuario ("Artemis", "Bigotes", 24, 12345678, "Montevideo", "Estudiante", 34, false));
datos_temp_usuarios.push (new Usuario ("Apollo", "Bigotes", 24, 87654321, "Montevideo", "Estudiante", 34, false));
datos_temp_usuarios.push (new Usuario ("Elliot", "Bigotes", 48, 7345678, "Montevideo", "Independiente", 56, false));
datos_temp_usuarios.push (new Usuario ("Lady", "Bigotes", 64, 2654321, "Montevideo", "No trabaja", 56, false));

datos_temp_usuarios.push (new Usuario ("Dio", "Silva", 25, 59991935, "Rivera", "No trabaja", 34, false));
//datos_temp_usuarios.push (new Usuario ("jojo", "Silva", 30, 59991935, "Canelones", "No trabaja", 34, true));


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
    sistema.agregar_censista (dato);
}

for (const dato of datos_de_usuarios) {
    sistema.agregar_invitado (dato);
}