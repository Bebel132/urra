const ambiente = new Audio('Projeto/sounds/somambiente.wav');
ambiente.loop = true;
ambiente.volume = 0.3;

const coleta = new Audio('Projeto/sounds/coleta_itens.wav');
coleta.volume = 0.3;

const lanterna = new Audio('Projeto/sounds/lanterna.mp3');
lanterna.volume = 0.3;

const tropeco = new Audio('Projeto/sounds/Som_de_tropeço.wav')
tropeco.volume = 0.5;

const alavanca = new Audio('Projeto/sounds/Alavanca.wav');
alavanca.volume = 0.5;

const batida = new Audio('Projeto/sounds/Batida.wav');
batida.volume = 0.5;

const final = new Audio('Projeto/sounds/cute_deer_sound_UWU.wav');
final.volume = 0.6;

const susto = new Audio('Projeto/sounds/susto.wav');
susto.volume = 0.3;

const eita = new Audio('Projeto/sounds/eita.mp3');
eita.volume = 0.3;

const morreu = new Audio('Projeto/sounds/morreu.mp3');
morreu.volume = 0.3;


export function Ambiente() {
    return ambiente.play().catch(() => { });
}

export function PausarAmbiente() {
    return ambiente.pause();
}

export function ColetaItens() {
    return coleta.cloneNode().play().catch(() => { });
}

export function Lanterna() {
    return lanterna.cloneNode().play().catch(() => { });
}

export function Tropeco() {
    return tropeco.cloneNode().play().catch(() => { });
}

export function Batida() {
    return batida.cloneNode().play().catch(() => { });
}

export function Alavanca() {
    return alavanca.cloneNode().play().catch(() => { });
}
export function FinalHistoria() {
    return final.cloneNode().play().catch(() => { });
}

export function Susto() {
    return susto.cloneNode().play().catch(() => { });
}

export function Eita() {
    return eita.cloneNode().play().catch(() => { });
}

export function Morreu() {
    return morreu.cloneNode().play().catch(() => { });
}