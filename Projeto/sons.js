const ambiente = new Audio('Projeto/sounds/somambiente.wav');
ambiente.loop = true;
ambiente.volume = 0.3;

const coleta = new Audio('Projeto/sounds/coleta_itens.wav');
coleta.volume = 0.3;

const lanterna = new Audio('Projeto/sounds/lanterna.wav');
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


export function Ambiente() {
    ambiente.play().catch(() => { });
}

export function ColetaItens() {
    coleta.cloneNode().play().catch(() => { });
}

export function Lanterna() {
    lanterna.cloneNode().play().catch(() => { });
}

export function Tropeco() {
    tropeco.cloneNode().play().catch(() => { });
}

export function Batida() {
    batida.cloneNode().play().catch(() => { });
}

export function Alavanca() {
    alavanca.cloneNode().play().catch(() => { });
}
export function FinalHistoria() {
    final.cloneNode().play().catch(() => { });
}

export function Susto() {
    susto.cloneNode().play().catch(() => { });
}