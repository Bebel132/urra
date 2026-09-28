const ambiente = new Audio('Projeto/sounds/trilha_sonora.wav');
ambiente.loop = true;
ambiente.volume = 0.3;

const coleta = new Audio('Projeto/sounds/coleta_itens.wav');
coleta.volume = 0.3;

const alavanca = new Audio('Projeto/sounds/Alavanca.wav');
alavanca.volume = 0.5;

const final = new Audio('Projeto/sounds/cute_deer_sound_UWU.wav');
final.volume = 0.6;


export function Ambiente() {
    ambiente.play().catch(() => { });
}

export function ColetaItens() {
    coleta.cloneNode().play().catch(() => { });
}

export function Motor() {
    
}

export function Alavanca() {
    alavanca.cloneNode().play().catch(() => { });
}
export function FinalHistoria() {
    final.cloneNode().play().catch(() => { });
}