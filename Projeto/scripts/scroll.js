import { qtnColetaveis } from "./coletaveis.js";
import { } from '../sons.js';

let posicaoLeitor = 0; //calcula a posição do leitor

let comicTerror = false; //variável booleana que define se a comic está em sua forma de terror ou não

let iniciaAnimacaoPagina3 = false;
let iniciaAnimacaoPagina2 = false;

const posicaoEventosDeScroll = {
    pg1: 0.9, //coloca borda nos itens coletáveis
    pg2: 0.58, //mostra a animação do balao de surpresa da página 2
    pg2_bichao: 0.52, //mostra o bichão da página 2
    pg3: 0.98, //transforma a comic em terror
    pg3Animacoes: 0.86, //inicia as animações da página 3
}

//Essas são as variáveis que definem os efeitos sonoros
const alavanca = new Audio("Projeto/sounds/Alavanca.wav");
alavanca.preload = "auto";
alavanca.volume = 0.5;
const somFinal = new Audio("Projeto/sounds/cute_deer_sound_UWU.wav");
somFinal.preload = "auto";
somFinal.volume = 0.6;
let somFinalTocado = false;

function initEventosDeScroll() {
    window.addEventListener("scroll", () => {
        console.log(posicaoLeitor);
    
        //Calculo para saber onde o Leitor está posicionado em % no comic
        posicaoLeitor =
            (window.innerHeight + window.scrollY) /
            document.documentElement.scrollHeight;
    
        //Aqui os itens receberão um outline se o leitor chegar ao final da leitura sem ter coletado todos eles
        if (posicaoLeitor >= posicaoEventosDeScroll.pg1 && qtnColetaveis < 3) {
            document.querySelectorAll(".coletavel").forEach((x) => {
                x.classList.add("bordaColetavel");
            });
        }
    
        //As interações dentro desses parenteses só acontecerão após a comic ser destravada
        if (qtnColetaveis == 3) {
            //Parte do código responsável por localizar se a comic deve ou não ser transformada em terror
            if (!comicTerror) {
                comicTerror = posicaoLeitor >= posicaoEventosDeScroll.pg3;
            }
    
            //Parte que efetivamente transforma a comic em terror
            if (comicTerror) {
                document.querySelector("#balaoSurpresa").style.display = "block";
                document.querySelectorAll(".terror").forEach((x) => {
                    x.style.display = "block";
                });
                document.querySelectorAll(".padrao").forEach((x) => {
                    x.style.display = "none";
                });
    
                //Parte responsável pelo som da criatura
                if (!somFinalTocado) {
                    somFinalTocado = true;
                    const f = somFinal.cloneNode();
                    f.volume = 0.6;
                    f.play().catch((e) => console.log("erro final", e));
                }
            }
    
            //Esse conjunto realiza a animação de chocalho da página 3 (está com erro)
            if (
                posicaoLeitor >= posicaoEventosDeScroll.pg3Animacoes &&
                !iniciaAnimacaoPagina3
            ) {
                iniciaAnimacaoPagina3 = true;
    
                const tropeco = document.querySelector("#tropeco");
                const chocalha = document.querySelector("#chocalha");
                const batida = document.querySelector("#batida");
    
                tropeco.style.animation = "tropeco 2s ease-in-out 2";
    
                setTimeout(() => {
                    chocalha.style.animation = "chocalhar .5s ease-in-out 5";
                }, 4000);
    
                setTimeout(() => {
                    batida.style.animation = "batida .5s ease-in-out 5";
                }, 6500);
            }

            if (
                posicaoLeitor <= posicaoEventosDeScroll.pg2 
                && !iniciaAnimacaoPagina2
                && comicTerror
            ) {
                console.log("heklhsakjl")
                iniciaAnimacaoPagina2 = true;
                document.querySelector("#balaoSurpresa").style.animation = "surpresa 0.5s ease-out 4";
            } 

            if (
                posicaoLeitor <= posicaoEventosDeScroll.pg2_bichao
                && comicTerror
            ) {
                document.querySelectorAll(".cena").forEach(x => {
                    x.style.display = "none";
                })

                const imagensJumpscare = document.querySelectorAll(".imagensJumpscare");

                imagensJumpscare[0].style.display = "block";

                imagensJumpscare.forEach((elemento, indice) => {
                    elemento.addEventListener("click", () => {
                        const proximaImagemDoJumpscare = imagensJumpscare[indice + 1];
                        if (!proximaImagemDoJumpscare) {
                            return;
                        }

                        elemento.style.display = "none";

                        if (proximaImagemDoJumpscare) {
                            const eUltimaImagem = indice + 1 === imagensJumpscare.length - 1;

                            proximaImagemDoJumpscare.style.display = eUltimaImagem
                                ? "flex"
                                : "block";

                            proximaImagemDoJumpscare.style.filter = eUltimaImagem 
                                ? "none"
                                : "brightness(0) invert(1)";
                                
                            proximaImagemDoJumpscare.style.backgroundColor = eUltimaImagem
                                ? "#ff0000"
                                : "transparent";

                            document.body.classList.add("pisca");

                            setTimeout(() => {
                                proximaImagemDoJumpscare.style.filter = "none";
                                proximaImagemDoJumpscare.style.backgroundColor = "transparent";

                                document.body.classList.remove("pisca");
                            }, 100);
                        }
                    });
                });
            }
        }
    });
}

export { initEventosDeScroll };