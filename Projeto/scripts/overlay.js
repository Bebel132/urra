import { Ambiente } from '../sons.js';


function esconderOverlayInicio() {
    document.querySelector("#overlay-inicio").classList.add("oculto");
    document.body.classList.remove("travado-inicio");
}

function initOverlay() {
    document.body.classList.add("travado-inicio");

    document.querySelector("#btn-iniciar").addEventListener("click", () => {
        Ambiente()
            .then(() => {
                audioLiberado = true;
            })
            .catch(() => { })
            .finally(() => {
                esconderOverlayInicio();
            });
        document.body.classList.remove("travado-inicio");
    });

}

export { Ambiente, initOverlay };