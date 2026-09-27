//Essas são as variáveis que vão definir a localização do leitor

let posicaoLeitor = 0; //calcula a posição do leitor

let comicTerror = false; //variável booleana que define se a comic está em sua forma de terror ou não
let jumpscare = false; //variável booleana que define se o leitor já levou o jumpscare

let iniciaAnimacaoPagina3 = false;
let coletavel = 0; //conta a quantidade de coletáveis adquiridos

//Essas são as variáveis que definem os efeitos sonoros

const ambiente = new Audio("Projeto/sounds/trilha_sonora.wav");
ambiente.loop = true;
ambiente.preload = "auto";
ambiente.volume = 0.3;
let audioLiberado = false;
const itemColetado = new Audio("Projeto/sounds/coleta_itens.wav");
itemColetado.preload = "auto";
itemColetado.volume = 0.3;
const alavanca = new Audio("Projeto/sounds/Alavanca.wav");
alavanca.preload = "auto";
alavanca.volume = 0.5;
const somFinal = new Audio("Projeto/sounds/cute_deer_sound_UWU.wav");
somFinal.preload = "auto";
somFinal.volume = 0.6;
let somFinalTocado = false;

//Não faço ideia

const overlayInicio = document.querySelector("#overlay-inicio");
const btnIniciar = document.querySelector("#btn-iniciar");

function esconderOverlayInicio() {
    overlayInicio?.classList.add("oculto");
    document.body.classList.remove("travado-inicio");
    desbloquearScroll();
}

function unlockAudio() {
    if (audioLiberado) return;
    ambiente
        .play()
        .then(() => {
            audioLiberado = true;
            esconderOverlayInicio();
        })
        .catch(() => {});
}

document.addEventListener("pointerdown", unlockAudio, { once: false });
document.addEventListener("keydown", unlockAudio);
window.addEventListener("scroll", unlockAudio, { passive: true });

bloquearScroll();
document.body.classList.add("travado-inicio");
btnIniciar?.addEventListener("click", () => {
    ambiente
        .play()
        .then(() => {
            audioLiberado = true;
        })
        .catch(() => {})
        .finally(() => {
            esconderOverlayInicio();
        });
});
let chegouAoJumpscare = false;
let monstroOculto = true;

function prevenirScroll(e) {
    e.preventDefault();
}

const teclasDeScroll = [
    "ArrowUp",
    "ArrowDown",
    "PageUp",
    "PageDown",
    "Home",
    "End",
    " ",
];
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
    console.log(posicaoLeitor);

    //Calculo para saber onde o Leitor está posicionado em % no comic
    posicaoLeitor =
        (window.innerHeight + window.scrollY) /
        document.documentElement.scrollHeight;

    //Aqui os itens receberão um outline se o leitor chegar ao final da leitura sem ter coletado todos eles
    if (posicaoLeitor >= 0.9 && coletavel < 3) {
        document.querySelectorAll(".coletavel").forEach((x) => {
            x.classList.add("bordaColetavel");
        });
    }

    //As interações dentro desses parenteses só acontecerão após a comic ser destravada
    if (coletavel >= 3) {
        //Parte do código responsável por localizar se a comic deve ou não ser transformada em terror
        if (!comicTerror) {
            comicTerror = posicaoLeitor >= 0.9;
        }

        //Parte que efetivamente transforma a comic em terror
        if (comicTerror) {
            document.querySelectorAll(".terror").forEach((x) => {
                x.style.display = "block";
            });
            document.querySelectorAll(".padrao").forEach((x) => {
                x.style.display = "none";
            });
        }

        //Responsável por localizar se o leitor está na tela da criatura
        if (comicTerror && posicaoLeitor <= 0.52) {
            //Parte responsável por travar a visão do leitor
            if (!jumpscare) {
                jumpscare = true;
                bloquearScroll();
                setTimeout(() => {
                    desbloquearScroll();
                }, 5000);
            }

            //Parte responsável pelo som da criatura
            if (!somFinalTocado && audioLiberado) {
                somFinalTocado = true;
                const f = somFinal.cloneNode();
                f.volume = 0.6;
                f.play().catch((e) => console.log("erro final", e));
            }
        }

        //Esse conjunto realiza a animação de chocalho da página 3 (está com erro)
        if (
            window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight * 0.83 &&
            !iniciaAnimacaoPagina3
        ) {
            iniciaAnimacaoPagina3 = true;
            if (audioLiberado) {
                const s = alavanca.cloneNode();
                s.volume = 0.5;
                s.play().catch(() => {});
            }
            const chocalhos = document.querySelectorAll(".chocalho");
            const estaveis = document.querySelectorAll(".chocalhoEstavel");

            chocalhos.forEach((x) => {
                x.style.display = "block";
            });

            estaveis.forEach((x) => {
                x.style.display = "none";
            });

            setTimeout(() => {
                chocalhos.forEach((x) => {
                    x.style.display = "none";
                });

                estaveis.forEach((x) => {
                    x.style.display = "block";
                });
            }, 2300);
        }
    }
});

//Parte responsável pela coleta e desbloqueio da comic
document.querySelectorAll(".coletavel").forEach((x) => {
    x.addEventListener("click", (e) => {
        //Parte responsável pelo audio de coleta
        if (ambiente.paused && audioLiberado) ambiente.play().catch(() => {});
        const s = itemColetado.cloneNode(); // permite coletas sobrepostas
        ((s.volume = 1), 5);
        s.play().catch(() => {});

        //Parte responsável pela coleta em si
        x.style.display = "none";
        coletavel += 1;

        //Parte responsável por efetivamente destravar a comic
        document.querySelectorAll(".padrao").forEach((x) => {
            x.style.display = "block";
        });
        document.querySelectorAll(".desbloqueado").forEach((x) => {
            x.style.display = "block";
        });
        document.querySelectorAll(".bloqueado").forEach((x) => {
            x.style.display = "none";
        });
    });
});

//Parte responsável pelo botão de visualizar repositórios (aparentemente está com erro)
document.querySelector("#botao-menu").addEventListener("click", () => {
    document
        .querySelector("#botao-prototipos")
        .classList.toggle("buttonLocked");
});

document.querySelector("#botao-prototipos").addEventListener("click", () => {
    window.location.href = "Prototipos/index.html";
});
