let salarioElectricista = 200;
let salarioAsistente = 150;

let diasInput = document.getElementById ('nbrDias');
let horasInput = document.getElementById ('nbrHoras');
let costoInput = document.getElementById ('nbrCosto');
let asistenteSi = document.getElementById ('chkAssistSi');
let calcular = document.getElementById ('btnCalcular');
let mostrar = document.getElementById ('pMostrar');

calcular.addEventListener ('click', function () {

    mostrar.innerHTML = `${presupuestoTotal (diasInput.valueAsNumber, horasInput.valueAsNumber, costoInput.valueAsNumber, asistenteSi.checked)}`;

})


function presupuestoTotal (dias, horas, costo, asistente) {

    if (asistente) {

        return salarioUsuario (1, horas, dias) + salarioUsuario (0, horas, dias) + totalMateriales (costo); 

    } else {

        return salarioUsuario (0, horas, dias) + totalMateriales (costo);

    }

}

function numeroPositivo (num) {

    return num >= 0;

}

function salarioUsuario (usuario, horas, dias) {

    if (!numeroPositivo(horas) || !numeroPositivo(dias)) {

        return `Ingrese horas o dias correctos`

    } else if (usuario === 1) {

        return (dias * horas) * salarioAsistente;

    } else {

        return (dias * horas) * salarioElectricista;

    }

}

function totalMateriales (costo) {

    if (!numeroPositivo(costo)) {

        return `Ingrese correctamente el coste de los materiales`

    } else {

        return costo * 1.10;

    }

}