const PASS_REGEX = new RegExp (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{5,}$/);
const DATOS = '../datos/db.json';

async function Traer_datos (destino, tipo_user) {

    let datos = []

    fetch (destino)
        .then (res => res.json())
        .then (data => {
            datos = data.tipo_user;
        })

    return datos

}