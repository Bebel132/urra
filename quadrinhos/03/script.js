const braco = document.querySelector("#braco");
const img02 = document.querySelector("#img02");
const img03 = document.querySelector("#img03");
const anguloInicial = 270;
const velocidade = 0.2; 
const limiteScroll = window.innerWidth < 1276 ? 2600 : 1720;
let inicio = 0;


function definirInicio() {
    inicio = img02.getBoundingClientRect().top + window.scrollY;
    atualizarBraco();
}

function atualizarBraco() {
    const scroll = window.scrollY;
    const antesDoInicio = scroll < inicio;
    const chegouAoFinal = scroll >= limiteScroll;
    console.log("Scroll atual: " + scroll);
    
    if (antesDoInicio) {
        braco.style.display = "none";
        img02.style.display = "block";
        img03.style.display = "none";
        return;
    }

    if (chegouAoFinal) {
        braco.style.display = "none";
        img02.style.display = "none";
        img03.style.display = "block";
        return;
    }

    const graus = anguloInicial + (scroll - inicio) * velocidade;
    braco.style.display = "block";
    braco.style.transform = `rotate(${graus}deg)`;
    img02.style.display = "block";
    img03.style.display = "none";
}

window.addEventListener("scroll", atualizarBraco);
window.addEventListener("load", definirInicio);
definirInicio();