let dados

let totalCasos = document.getElementById("totalCasos")
let casosAtual = document.getElementById("casosAtual")
let primeiraDose = document.getElementById("primeiraDose")
let totalVacinados = document.getElementById("totalVacinados")
let totalMortes = document.getElementById("totalMortes")
let letalidade = document.getElementById("letalidade")
let porcentagem1 = document.getElementById("porcentagem1")
let porcentagem2 = document.getElementById("porcentagem2")
let porcentagemTexto = document.getElementById("porcentagemTexto")
let porcentagem2Texto = document.getElementById("porcentagem2Texto")
const select = document.getElementById("select-cidade")

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

const start = () => {
    changeFront(0)
    select.onchange = handleChange
}

const preload = () => {
    readTextFile("../data/cidades.json", function(text){
        dados = JSON.parse(text);
        start()
    });
}

const handleChange = () => {
    if (select.value === "Pouso Alegre") {
        changeFront(0)
    } else if (select.value === "Cachoeira de Minas") {
        changeFront(1)
    }
}

const changeFront = (index) => {
    let dadosCidade = dados[index]
    console.log(dadosCidade)
    totalCasos.innerHTML = dadosCidade.totalCasos
    casosAtual.innerHTML = dadosCidade.casosAcompanhamento
    primeiraDose.innerHTML = dadosCidade.totalPrimeiraDose
    totalVacinados.innerHTML = dadosCidade.totalVacinados
    totalMortes.innerHTML = dadosCidade.totalObitos
    letalidade.innerHTML = dadosCidade.letalidade
    porcentagem1.style.width = dadosCidade.p1
    porcentagemTexto.innerHTML = dadosCidade.p1
    porcentagem2.style.width = dadosCidade.p2
    porcentagem2Texto.innerHTML = dadosCidade.p2
}

preload()


