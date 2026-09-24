let chegouAoFinal = false;
let chegouNaSelecao = false;
let comicDestravada = false;
let iniciaAnimacaoPagina3 = false;
let jumpscareFeito = false;
let coletavel = 0;
let chegouAoJumpscare = false;
let monstroOculto =true;

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
    console.log("chegou ao final?:",chegouAoFinal);
    console.log("chegou ao jumpscare?:",chegouAoJumpscare);
    console.log("jumpscare Feito?:",jumpscareFeito);

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

        if (!chegouAoJumpscare && comicDestravada && chegouAoFinal){
            chegouAoJumpscare =
                window.innerHeight + window.scrollY <=
                document.documentElement.scrollHeight * 0.55;
        }

        if (chegouAoFinal && comicDestravada) {

            if(chegouAoJumpscare && !jumpscareFeito){
            jumpscareFeito = true;
            bloquearScroll();
            setTimeout(() => {
                desbloquearScroll();
            }, 5000);
            }

            document.querySelectorAll(".patrao").forEach((x) => {
                x.style.display = "none";
            });

            document.querySelectorAll(".ocultDay").forEach((x) => {
                x.style.display = "block";
            });

            document.querySelectorAll(".monstro").forEach((x) => {
                if(monstroOculto){
                x.style.display = "block";
                }
            });

        }
    }
});

document.querySelectorAll(".coletavel").forEach((x) => {
    x.addEventListener("click", (e) => {
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

        if(monstroOculto){
        document.querySelectorAll(".oculto").forEach((z) => {
            z.style.display = "none";
            monstroOculto = false;
            })
        }
    }
)})


document.querySelector("#botao-menu").addEventListener("click", () => {
    document.querySelector("#botao-prototipos").classList.toggle("buttonLocked");
});

document.querySelector("#botao-prototipos").addEventListener("click", () => {
    window.location.href = "Prototipos/index.html";
});
