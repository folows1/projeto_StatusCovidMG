let dados
let index
let dadosCidade
const tabs = document.querySelectorAll("[data-tab-target]")
const tabContents = document.querySelectorAll("[data-tab-content]")

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("active")
        })
        tabs.forEach((tab) => {
            tab.classList.remove("active")
        })
        tab.classList.add("active")
        target.classList.add("active")
    })
})

let b1 = document.querySelector(".b1")
let b2 = document.querySelector(".b2")
let b3 = document.querySelector(".b3")
let graphImg = document.getElementById("grafico")
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
let li = document.getElementById("spot-ul")

const select = document.getElementById("select-cidade")

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType("application/json")
    rawFile.open("GET", file, true)
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText)
        }
    }
    rawFile.send(null)
}

const start = () => {
    index = 0
    changeFront(index)
    select.onchange = handleChange
    b1.onclick = () => {
        changeGraph(0)
    }
    b2.onclick = () => {
        changeGraph(1)
    }
    b3.onclick = () => {
        changeGraph(2)
    }
}

const preload = () => {
    console.log("start")
    readTextFile("./data/cidades.json", function (text) {
        dados = JSON.parse(text)
        start()
    })
}

const handleChange = () => {
    if (select.value === "Pouso Alegre") {
        index = 0
    } else if (select.value === "Cachoeira de Minas") {
        index = 1
    } else if (select.value === "Santa Rita do Sapuca??") {
        index = 2
    } else if (select.value === "Parais??polis") {
        index = 3
    }
    changeFront(index)
}

const changeFront = (index) => {
    graphImg.src = ""
    li.innerHTML = ""
    dadosCidade = dados[index]
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
    changeSpots()
    changeGraph(0)
}

const changeSpots = () => {
    dadosCidade.spots.forEach((spot) => {
        let itemName = document.createElement("li")
        let itemRua = document.createElement("li")
        let itemCep = document.createElement("li")

        let link = document.createElement("a")
        link.href = spot.link
        link.target = "_blank"
        link.classList.add("a-block")

        let divLink = document.createElement("div")
        divLink.classList.add("div-link")

        itemName.textContent = spot.nome
        itemRua.textContent = spot.rua
        itemCep.textContent = spot.cep

        itemName.classList.add("li-name")
        itemRua.classList.add("li-rua")
        itemCep.classList.add("li-cep")

        divLink.appendChild(itemName)
        divLink.appendChild(itemRua)
        divLink.appendChild(itemCep)
        link.appendChild(divLink)
        li.appendChild(link)
    })
}

const changeGraph = (indexImg) => {
    console.log("img")
    graphImg.src = dadosCidade.paths[indexImg].graph
}

preload()
