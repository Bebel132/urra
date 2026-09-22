const gato = document.querySelector("#gato");
const gato2 = document.querySelector("#gato1_2");
const quadros_final_ruim = document.querySelectorAll(".caminho_ruim");
const quadros_final_bom = document.querySelectorAll(".caminho_bom");
const miau = new Audio("miado.mp3");
miau.preload = 'auto';
miau.volume = 0.7;
miau.loop = false;

const scrollEvent = () => {
    if (window.scrollY > gato.parentElement.parentElement.children[2].offsetTop - 100) {
        gato2.style.display = "block";
        gato2.addEventListener("click", () => {
            gato2.style.display = "none";
            gato.click()
        });
    }
}

const clickEvent = () => {
    window.removeEventListener("scroll", scrollEvent);
    window.scrollTo({
        top: gato.parentElement.parentElement.children[2].offsetTop + 50,
        behavior: "smooth"
    });
    miau.play();
    quadros_final_ruim.forEach(e => e.style.display = "none");
    quadros_final_bom.forEach(e => e.style.display = "block");
}

gato.addEventListener("click", clickEvent);
window.addEventListener("scroll", scrollEvent);