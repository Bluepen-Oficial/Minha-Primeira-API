const numeroCEP = document.querySelector('#numCep');
const resultado = document.querySelector('#reultado');
const regex = /\d{5}-?\d{3}/g;

function buscarCEP(CEP) {
    if (numeroCEP == " " || regex.test(CEP)){
        resultado.innerHTML = "Digite um CEP válido!"
    }
}