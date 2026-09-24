let chegouAoFinal = false;
let chegouNaSelecao = false;
let comicDestravada = false;
let iniciaAnimacaoPagina3 = false;
let jumpscareFeito = false;
let coletavel = 0;
const ambiente = new Audio('Projeto/sounds/trilha_sonora.wav');
ambiente.loop = true;
ambiente.preload = 'auto';
ambiente.volume = 0.3;
let audioLiberado = false;
const itemColetado = new Audio('Projeto/sounds/coleta_itens.wav');
itemColetado.preload = 'auto';
itemColetado.volume = 0.3;
const alavanca = new Audio('Projeto/sounds/Alavanca.wav');
alavanca.preload = 'auto';
alavanca.volume = 0.5;
const somFinal = new Audio('Projeto/sounds/cute_deer_sound_UWU.wav');
somFinal.preload = 'auto';
somFinal.volume = 0.6;
let somFinalTocado = false;

const overlayInicio = document.querySelector("#overlay-inicio");
const btnIniciar = document.querySelector("#btn-iniciar");

function esconderOverlayInicio() {
    overlayInicio?.classList.add("oculto");
    document.body.classList.remove("travado-inicio");
    desbloquearScroll();
}

function unlockAudio() {
    if (audioLiberado) return;
    ambiente.play().then(() => {
        audioLiberado = true;
        esconderOverlayInicio();
    }).catch(() => { });
}

document.addEventListener('pointerdown', unlockAudio, { once: false });
document.addEventListener('keydown', unlockAudio);
window.addEventListener('scroll', unlockAudio, { passive: true });

bloquearScroll();
document.body.classList.add("travado-inicio");
btnIniciar?.addEventListener("click", () => {
    ambiente.play().then(() => {
        audioLiberado = true;
    }).catch(() => { }).finally(() => {
        esconderOverlayInicio();
    });
});
let chegouAoJumpscare = false;
let monstroOculto = true;

function prevenirScroll(e) {
    e.preventDefault();
}

const teclasDeScroll = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
function prevenirScrollTeclado(e) {
    if (teclasDeScroll.includes(e.key)) e.preventDefault();
}

function bloquearScroll() {
    window.addEventListener("wheel", prevenirScroll, { passive: false });
    window.addEventListener("touchmove", prevenirScroll, { passive: false });
    window.addEventListener("keydown", prevenirScrollTeclado);
}

function desbloquearScroll() {
    window.removeEventListener("wheel", prevenirScroll);
    window.removeEventListener("touchmove", prevenirScroll);
    window.removeEventListener("keydown", prevenirScrollTeclado);
}

window.addEventListener("scroll", () => {
    console.log("chegou ao final?:", chegouAoFinal);
    console.log("chegou ao jumpscare?:", chegouAoJumpscare);
    console.log("jumpscare Feito?:", jumpscareFeito);

    if (!chegouNaSelecao) {
        chegouNaSelecao =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight * 0.90;
    }

    if (chegouNaSelecao) {
        document.querySelectorAll(".coletavel").forEach((x) => {
            x.classList.add("bordaColetavel");
        })
    }

    if (comicDestravada) {
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight * 0.83 &&
            !iniciaAnimacaoPagina3
        ) {
            iniciaAnimacaoPagina3 = true;
            if (audioLiberado) {
                const s = alavanca.cloneNode();
                s.volume = 0.5;
                s.play().catch(() => { });
            }
            const chocalhos = document.querySelectorAll(".chocalho");
            const estaveis = document.querySelectorAll(".chocalhoEstavel")

            chocalhos.forEach((x) => {
                x.style.display = "block";
            })

            estaveis.forEach((x) => {
                x.style.display = "none";
            })

            setTimeout(() => {
                chocalhos.forEach((x) => {
                    x.style.display = "none";
                })

                estaveis.forEach((x) => {
                    x.style.display = "block";
                })
            }, 2300);
        }

        if (!chegouAoFinal) {
            chegouAoFinal =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight * 0.85;
        }

        if (!chegouAoJumpscare && comicDestravada && chegouAoFinal) {
            chegouAoJumpscare =
                window.innerHeight + window.scrollY <=
                document.documentElement.scrollHeight * 0.55;
        }

        if (chegouAoFinal && comicDestravada) {

            if (chegouAoJumpscare && !jumpscareFeito) {
                jumpscareFeito = true;
                bloquearScroll();
                setTimeout(() => {
                    desbloquearScroll();
                }, 5000);
            }

            if (!somFinalTocado && audioLiberado) {
                somFinalTocado = true;
                const f = somFinal.cloneNode();
                f.volume = 0.6;
                f.play().catch(e => console.log('erro final', e));
            }
            document.querySelectorAll(".patrao").forEach((x) => {
                x.style.display = "none";
            });

            document.querySelectorAll(".ocultDay").forEach((x) => {
                x.style.display = "block";
            });

            document.querySelectorAll(".monstro").forEach((x) => {
                x.style.display = "block";
            });

        }
    }
});

document.querySelectorAll(".coletavel").forEach((x) => {
    x.addEventListener("click", (e) => {
        if (ambiente.paused && audioLiberado) ambiente.play().catch(() => { });
        const s = itemColetado.cloneNode(); // permite coletas sobrepostas
        s.volume = 1, 5;
        s.play().catch(() => { });
        x.style.display = "none";
        coletavel += 1;

        if (coletavel >= 3) {
            comicDestravada = true;
        }

        if (comicDestravada) {
            document.querySelectorAll(".locked").forEach((x) => {
                x.style.display = "none";
            });

            document.querySelectorAll(".unlocked").forEach((x) => {
                x.style.display = "block";
            });

            document.querySelectorAll(".patrão").forEach((x) => {
                x.style.display = "block";
            });
        }
    });
});

document.querySelectorAll(".oculto").forEach((x) => {
    x.addEventListener("click", (y) => {
        document.querySelectorAll(".oculto").forEach((z) => {
            z.style.display = "none";
        })
    }
    )
})


document.querySelector("#botao-menu").addEventListener("click", () => {
    document.querySelector("#botao-prototipos").classList.toggle("buttonLocked");
});

document.querySelector("#botao-prototipos").addEventListener("click", () => {
    window.location.href = "Prototipos/index.html";
});
