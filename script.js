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
            console.log(endereco.lat, endereco.lng);
            mostrarMapa(endereco.lat, endereco.lng)
        })
        .catch(() => {
            resultado.innerHTML = "Endereço não encontrado!";
        });
}

function mostrarEndereco(busca) {
    console.log("E");
    resultado.innerHTML = `
    <p>
    Endereço: ${busca.address},
    Bairro: ${busca.district},
    Cidade: ${busca.city}-${busca.state}
    </p>
    `;
}

function mostrarMapa(lat, long) {
    let mapa = L.map('map').setView([lat, long], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 16,
        minZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);

    L.marker([lat, long]).addTo(mapa);
}