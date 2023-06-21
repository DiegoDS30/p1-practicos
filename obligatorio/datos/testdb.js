let datos_de_censistas = JSON.parse (localStorage.getItem ('censistas')) || [];
let datos_de_usuarios = JSON.parse (localStorage.getItem ('invitados')) || [];

let datos_temp_censistas = [];
let datos_temp_usuarios = [];

datos_temp_censistas.push (new Censista (12, "test", "user", "xdxd"));
datos_temp_censistas.push (new Censista (34, "test 2", "admin", "admin"));

datos_temp_usuarios.push (new Usuario ("Diego", "da Silva", 25, 48081939, "Montevideo", "Dependiente", 34, false));

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