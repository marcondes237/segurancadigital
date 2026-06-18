const campoSenha = document.querySelector('#campo-senha');
const slider = document.querySelector('#tamanho');
const numeroSenha = document.querySelector('#numero-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');
const entropiaEl = document.querySelector('.entropia');

let tamanhoSenha = 12;

const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*?";

slider.addEventListener('input', () => {
    tamanhoSenha = slider.value;
    numeroSenha.textContent = tamanhoSenha;
    gerarSenha();
});

checkbox.forEach(cb => cb.addEventListener('change', gerarSenha));

function gerarSenha(){

    let alfabeto = "";

    if(checkbox[0].checked) alfabeto += letrasMaiusculas;
    if(checkbox[1].checked) alfabeto += letrasMinusculas;
    if(checkbox[2].checked) alfabeto += numeros;
    if(checkbox[3].checked) alfabeto += simbolos;

    if(alfabeto.length === 0){
        campoSenha.value = "";
        return;
    }

    let senha = "";

    for(let i=0;i<tamanhoSenha;i++){
        const rand = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[rand];
    }

    campoSenha.value = senha;

    calcularForca(alfabeto.length);
}

function calcularForca(tamanhoAlfabeto){

    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    forcaSenha.classList.remove('fraca','media','forte');

    if(entropia > 57){
        forcaSenha.classList.add('forte');
    } else if(entropia > 35){
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    const dias = Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24));

    entropiaEl.textContent =
        `Pode levar até ${dias} dias para quebrar essa senha.`;
}

gerarSenha();
