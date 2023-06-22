class Usuario {
    
    constructor (nombre, apellido, edad, cedula, departamento, ocupacion, censista, censado) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.cedula = cedula;
        this.departamento = departamento;
        this.ocupacion = ocupacion;
        this.censista = censista;
        this.censado = censado;

    }

}

class Censista {

    constructor (id, nombre, usuario, pass) {
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
        this.pass = pass;
    }

}

class Sistema {

    constructor () {
        this.censistas = [];
        this.invitados = [];
    }

    /**
     * La funcion agrega un censista al array y lo guarda en local storage.
     * @param add - el parametro "add" es un objeto que representa un nuevo censista
     * a ser agregado al array de censistas y a ser guardado en local storage.
     */

    Agregar_censista (add) {

        let censista_temp = add;
        this.censistas.push (censista_temp);

        let censistasArr = JSON.parse (localStorage.getItem ('censistas')) || [];
        censistasArr.push (censista_temp);

        localStorage.setItem ('censistas', JSON.stringify (this.censistas));
    
    }

    /**
     * La funcion agrega un invitado al array y lo guarda en local storage.
     * @param add - el parametro "add" es un objeto que representa un nuevo invitado
     * a ser agregado al array de invitados y a ser guardado en local storage.
     */
    
    Agregar_invitado (add) {
            
        let invitado_temp = add;

        if (!this.invitados.some (invitado => invitado.cedula === invitado_temp.cedula)) {
            this.invitados.push (invitado_temp);
            localStorage.setItem ('invitados', JSON.stringify (this.invitados));
        }
    
    }

    Buscar_invitado (ci) {
        return this.invitados.find (invitado => invitado.cedula === ci);
    }

    Actualizar_invitado (upd) {

        let invitado_temp = upd
        let invitado_a_cambiar = this.invitados.findIndex (invitado => invitado.cedula === invitado_temp.cedula);

        this.invitados [invitado_a_cambiar] = invitado_temp;
        console.log (this.invitados[invitado_a_cambiar]);

        localStorage.setItem ('invitados', JSON.stringify (this.invitados));

    }

    Borrar_invitado (ci) {

        let invitado_a_borrar = this.invitados.findIndex (invitado => invitado.cedula === ci);
        this.invitados.splice (invitado_a_borrar, 1);

        localStorage.setItem ('invitados', JSON.stringify (this.invitados));

    }

    Buscar_invitados_censar (censista) {
        return this.invitados.filter (invitado => invitado.censista === censista && invitado.censado === false);
    }

    Reasignar_persona_censista (invitado, censista) {

        let invitado_cedula = invitado;
        let invitado_a_cambiar = this.invitados.findIndex (invitado => invitado.cedula === invitado_cedula);

        console.log (invitado_a_cambiar);

        this.invitados[invitado_a_cambiar].censista = censista;
        console.log (this.invitados[invitado_a_cambiar]);

        localStorage.setItem ('invitados', JSON.stringify (this.invitados));

    }

}