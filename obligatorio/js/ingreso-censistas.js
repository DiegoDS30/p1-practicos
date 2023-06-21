let usuario = document.getElementById ('txtUsuario');
let pass = document.getElementById ('txtPass');
let ingreso_form = document.getElementById ('ingreso');
let confirmacion = document.getElementById ('pConfirmacion');

let datos_censistas = sistema.censistas || [];

ingreso_form.addEventListener ('submit', (e) => {

    e.preventDefault();

    let usuario_temp = usuario.value;
    usuario_temp = usuario_temp.toLowerCase ();

    let pass_temp = pass.value;

    if (usuario_temp && pass_temp) { // Que todos los campos esten llenos

        if (Verificar_pass (datos_censistas, usuario_temp, pass_temp)) { // Que la contraseña sea correcta

            let censista = datos_censistas.find (censista => censista.usuario === usuario_temp);

            localStorage.setItem ('user', JSON.stringify (censista));

            alert ('Bienvenido ' + usuario_temp);

            window.location.href = '../index.html';

        } else {

            confirmacion.innerHTML = 'El usuario y/o la contraseña son incorrectos';

        }

    } else {

        confirmacion.innerHTML = 'Por favor, complete todos los campos';

    }

});

function Verificar_pass (datos, user, pass) {
    return datos.some (dato => dato.usuario === user && dato.pass === pass);
}