const ambiente = new Audio("Projeto/sounds/trilha_sonora.wav");
ambiente.loop = true;
ambiente.preload = "auto";
ambiente.volume = 0.3;

function esconderOverlayInicio() {
    document.querySelector("#overlay-inicio").classList.add("oculto");
    document.body.classList.remove("travado-inicio");
}

function initOverlay() {
    document.body.classList.add("travado-inicio");

    document.querySelector("#btn-iniciar").addEventListener("click", () => {
        ambiente
            .play()
            .then(() => {
                audioLiberado = true;
            })
            .catch(() => {})
            .finally(() => {
                esconderOverlayInicio();
            });
        document.body.classList.remove("travado-inicio");
    });

}

export { ambiente, initOverlay };