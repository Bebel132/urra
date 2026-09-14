const braco = document.querySelector("#braco");
const img02 = document.querySelector("#img02");
const img03 = document.querySelector("#img03");
const img04 = document.querySelector("#img04");
const anguloInicial = 270;
const velocidade = 0.082; 
let inicio = 0;
let limiteScroll = 0;


function definirInicio() {
    inicio = img02.getBoundingClientRect().top + window.scrollY;
    limiteScroll = (img04.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.65)-700;
    atualizarBraco();
}

function atualizarBraco() {
    const scroll = window.scrollY;
    const antesDoInicio = scroll < inicio;
    const chegouAoFinal = scroll >= limiteScroll;
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
window.addEventListener("resize", definirInicio);
definirInicio();