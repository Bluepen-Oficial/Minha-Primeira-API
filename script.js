const numeroCEP = document.querySelector('#numCep');
const resultado = document.querySelector('#resultado');
const botao = document.querySelector('#btnBuscar');
const btnLimpar = document.querySelector('#btnLimpar');
const regex = /^\d{5}-?\d{3}$/;
let mapa = null;

botao.addEventListener('click', () => { buscarCEP() });
btnLimpar.addEventListener('click', () => { numeroCEP.value = ""; });

function buscarCEP() {
    const validacaoCEP = numeroCEP.value.replace(/[\s\-]/g, '').trim();
    console.log("A", validacaoCEP, validarExpressao(validacaoCEP));

    if (validacaoCEP === "" || validarExpressao(validacaoCEP) === false) {
        console.log("B");
        resultado.innerHTML = "Digite um CEP válido!";
        numeroCEP.value = "";
        limparMapa();
        return;
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
            if (endereco.code) {
                console.log("G");

                limparMapa();

                console.log(endereco.message);
                mostrarErro(endereco.message);
                numeroCEP.value = "";
                return;
            }
            console.log(endereco);
            console.log(endereco.lat, endereco.lng);

            mostrarEndereco(endereco);
            mostrarMapa(endereco.lat, endereco.lng);

        })
        .catch(() => {
            resultado.innerHTML = "Endereço não encontrado!";
        });
}

function mostrarEndereco(busca) {
    console.log("E");
    resultado.innerHTML = `
    <p id="endereco">
    <b>Endereço:</b> ${busca.address},
    <b>Bairro:</b> ${busca.district},
    <b>Cidade:</b> ${busca.city}-${busca.state}.
    </p>
    `;
}

function mostrarErro(erro) {
    console.log("F");
    resultado.innerHTML = `
    <p id="msgErro">
    ERRO: ${erro}.
    </p>
    `;
}

function mostrarMapa(lat, long) {
    if (mapa) {
        mapa.remove();
    }

    mapa = L.map('map').setView([lat, long], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    L.marker([lat, long]).addTo(mapa);

    document.querySelector('#map').style.border = "1px solid rgb(68, 0, 255)";
}

function limparMapa() {
    if (mapa) {
        mapa.remove();
        mapa = null;
        document.querySelector('#map').style.border = "none";
        document.querySelector('#map').style.background = "none";
    }
}