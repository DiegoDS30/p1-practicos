class Usuario {
    
    constructor (nombre, apellido, edad, cedula, departamento, ocupacion, censita, censado) {

        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.cedula = cedula;
        this.departamento = departamento;
        this.ocupacion = ocupacion;
        this.censita = censita;
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

    agregar_censista (add) {

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
    
    agregar_invitado (add) {
            
        let invitado_temp = add;
        this.invitados.push (invitado_temp);

        let invitadosArr = JSON.parse (localStorage.getItem ('usuarios')) || [];
        invitadosArr.push (invitado_temp);

        localStorage.setItem ('invitados', JSON.stringify (this.invitados));
    
    }

}