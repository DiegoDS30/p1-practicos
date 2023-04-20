let palindromoInput = document.getElementById ('txtPali');
let botonImprimir = document.getElementById ('btnImprimir');
let mostrar = document.getElementById ('pMostrar');

botonImprimir.addEventListener ('click', function () {

    mostrar.innerHTML = esPalindromo (palindromoInput.value) ? `Es Palindromo` : `No es Palindromo`;

});

function esPalindromo (str) {
    
    let palindromo = str.replace (/[^\w]/g, "").toLowerCase();
    let reverso = palindromo.split('').reverse().join('');

    return palindromo === reverso;

}