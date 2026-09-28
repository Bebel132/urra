import { ambiente } from "./overlay.js";

let qtnColetaveis = 0; //conta a quantidade de coletáveis adquiridos

function initColetaveis() {
    const audioItemColetado = new Audio("Projeto/sounds/coleta_itens.wav");
    audioItemColetado.preload = "auto";
    audioItemColetado.volume = 0.3;

    document.querySelectorAll(".coletavel").forEach((x) => {
        x.addEventListener("click", (e) => {
            //Parte responsável pelo audio de coleta
            if (ambiente.paused) ambiente.play().catch(() => {});
            const s = audioItemColetado.cloneNode(); // permite coletas sobrepostas
            ((s.volume = 1), 5);
            s.play().catch(() => {});

            //Parte responsável pela coleta em si
            x.style.display = "none";
            qtnColetaveis++;

            if (qtnColetaveis == 3) {
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
            }
        });
    });
}

export { initColetaveis, qtnColetaveis };