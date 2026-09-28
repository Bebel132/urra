import { initOverlay } from "./scripts/overlay.js";
import { initColetaveis } from "./scripts/coletaveis.js";
import { initEventosDeScroll } from "./scripts/scroll.js";

initOverlay();
initColetaveis();
initEventosDeScroll();

//Parte responsável pelo botão de visualizar repositórios (aparentemente está com erro)
document.querySelector("#botao-menu").addEventListener("click", () => {
    document
        .querySelector("#botao-prototipos")
        .classList.toggle("buttonLocked");
});

document.querySelector("#botao-prototipos").addEventListener("click", () => {
    window.location.href = "Prototipos/index.html";
});
