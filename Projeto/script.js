let chegouAoFinal = false;
let chegouNaSelecao = false;
let comicDestravada = false;
let iniciaAnimacaoPagina3 = false;
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

function unlockAudio() {
    if (audioLiberado) return;
    audioLiberado = true;
    ambiente.play().catch(() => { audioLiberado = false; })

}

document.addEventListener('pointerdown', unlockAudio, { once: false });
document.addEventListener('keydown', unlockAudio);
window.addEventListener('scroll', unlockAudio, { passive: true });

window.addEventListener("scroll", () => {

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
                document.documentElement.scrollHeight * 0.95;
        }

        if (chegouAoFinal && comicDestravada) {
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


document.querySelector("#botao-menu").addEventListener("click", () => {
    document.querySelector("#botao-prototipos").classList.toggle("buttonLocked");
});

document.querySelector("#botao-prototipos").addEventListener("click", () => {
    window.location.href = "Prototipos/index.html";
});