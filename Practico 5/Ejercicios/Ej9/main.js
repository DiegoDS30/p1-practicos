let matriculaInput = document.getElementById ('txtMatricula');
let imprimirBoton = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

imprimirBoton.addEventListener ('click', function () { 
    
    mostrar.innerHTML = `${buscarMatricula (matriculaInput.value)}`

});

function buscarMatricula (str) {

    let reg = /[A-Za-z]{3}-\d{4}/;

    if (reg.test(str)) {

        let comienza = str[0].toLowerCase();

        switch (comienza) {

            case 'a': return `Canelones`
                break;

            case 'b': return `Maldonado`
                break;

            case 'c': return `Rocha`
                break;

            case 'd': return `Treinta y Tres`
                break;

            case 'e': return `Cerro Largo`
                break;

            case 'f': return `Rivera`
                break;

            case 'g': return `Artigas`
                break;

            case 'h': return `Salto`
                break;

            case 'i': return `Paysandu`
                break;

            case 'j': return `Rio Negro`
                break;

            case 'k': return `Soriano`
                break;

            case 'l': return `Colonia`
                break;

            case 'm': return `San Jose`
                break;

            case 'n': return `Flores`
                break;

            case 'o': return `Florida`
                break;

            case 'p': return `Lavalleja`
                break;

            case 'q': return `Durazno`
                break;

            case 'r': return `Tacuarembo`
                break;

            case 's': return `Montevideo`
                break;

            default: return `Matricula con codigo incorrecto`;

        }

    } else {

        return `Formato de matricula incorrecta`

    }

}