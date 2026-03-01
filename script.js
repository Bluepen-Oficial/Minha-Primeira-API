const numeroCEP = document.querySelector('#numCep');
const resultado = document.querySelector('#resultado');
const botao = document.querySelector('#btnBuscar');
const regex = /^\d{5}-?\d{3}$/;

botao.addEventListener('click', () => { buscarCEP() });

function buscarCEP() {
    const validacaoCEP = numeroCEP.value.replace(/[\s\-]/g, '').trim();
    console.log("A", validacaoCEP, validarExpressao(validacaoCEP));

    if (validacaoCEP === "" || validarExpressao(validacaoCEP) === false) {
        console.log("B")
        resultado.innerHTML = "Digite um CEP válido!";
        return
    } 

    buscarEndereco(validacaoCEP);
}

function validarExpressao(valor) {
    return regex.test(valor);
}

function buscarEndereco(numCEP) {
    fetch(`https://cep.awesomeapi.com.br/json/${numCEP}`)
        .then(resposta => resposta.json())
        .then(dados => {
            const endereco = dados;
            console.log(endereco);
            mostrarEndereco(endereco);
        })
        .catch (() => {
            resultado.innerHTML = "Endereço não encontrado!";
        });
}

function mostrarEndereco(busca) {
    console.log("E");
    resultado.innerHTML =  JSON.stringify(busca);
}