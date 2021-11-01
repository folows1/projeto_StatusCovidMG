let dados = [
    {
        nome: "Pouso Alegre",
        totalCasos: 24677,
        totalObitos: 462,
        totalRecuperados: 24153,
        casosAcompanhamento: 62,
        totalPrimeiraDose: 120626,
        totalSegundaDose: 83943,
        totalDoseUnica: 3713
    },
    {
        nome: "Cidade 2",
        totalCasos: 2,
        totalObitos: 462,
        totalRecuperados: 24153,
        casosAcompanhamento: 62,
        totalPrimeiraDose: 120626,
        totalSegundaDose: 83943,
        totalDoseUnica: 3713
    }
]

let totalCasos = document.getElementById("totalCasos")
let casosAtual = document.getElementById("casosAtual")
let primeiraDose = document.getElementById("primeiraDose")
let totalVacinados = document.getElementById("totalVacinados")
let totalMortes = document.getElementById("totalMortes")
let letalidade = document.getElementById("letalidade")
const select = document.getElementById("select-cidade")

const start = () => {
    changeFront(0)
    select.onchange = handleChange
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
}

start()
