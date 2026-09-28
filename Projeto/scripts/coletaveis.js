import { Ambiente } from "./overlay.js";
import { ColetaItens } from '../sons.js';

let qtnColetaveis = 0; //conta a quantidade de coletáveis adquiridos

function initColetaveis() {
    const audioItemColetado = new Audio("Projeto/sounds/coleta_itens.wav");
    audioItemColetado.preload = "auto";
    audioItemColetado.volume = 0.3;

    document.querySelectorAll(".coletavel").forEach((x) => {
        x.addEventListener("click", (e) => {
            //Parte responsável pelo audio de coleta
            if (Ambiente.paused) Ambiente();
            ColetaItens();

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