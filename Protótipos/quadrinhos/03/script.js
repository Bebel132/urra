const braco = document.querySelector("#braco");
const img02 = document.querySelector("#img02");
const img03 = document.querySelector("#img03");
const img04 = document.querySelector("#img04");
const baam = document.querySelector("#baam");
const cenaSticky = document.querySelector("#cena-sticky");
const anguloInicial = 270;
const velocidade = 0.082; 
let inicio = 0;
let limiteScroll = 0;
let finalDaAnimacao = false;
let ajusteFinalExecutado = false;


function definirInicio() {
    inicio = img02.getBoundingClientRect().top + window.scrollY;
    const delimitador = window.innerWidth > 1276 ? 700 : 580;
    limiteScroll = img04.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.65 - delimitador;
    atualizarBraco();
}

function mostrarQuadroFinal() {
    braco.style.display = "none";
    img02.style.display = "none";
    img03.style.display = "block";
}

function atualizarBraco() {
    const scroll = window.scrollY;
    const antesDoInicio = scroll < inicio;
    const chegouAoFinal = scroll >= limiteScroll;

    if (finalDaAnimacao && !ajusteFinalExecutado) {
        ajusteFinalExecutado = true;

        setTimeout(() => {
            cenaSticky.style.minHeight = "auto";

            window.scrollTo(
                0,
                img03.getBoundingClientRect().top +
                window.scrollY -
                window.innerHeight * 0.1
            );
        }, 1000);
    }

    if (finalDaAnimacao) {
        mostrarQuadroFinal();
        return;
    }

    if (antesDoInicio) {
        braco.style.display = "none";
        img02.style.display = "block";
        img03.style.display = "none";
        return;
    }

    if (chegouAoFinal) {
        finalDaAnimacao = true;
        mostrarQuadroFinal();
        baam.style.display = "block";

        setTimeout(() => {
            baam.style.display = "none";
        }, 1000);
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