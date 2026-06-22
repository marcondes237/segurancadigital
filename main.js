const senha = document.getElementById("senha");
const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");
const barra = document.getElementById("forca");
const texto = document.getElementById("textoForca");

tamanho.addEventListener("input",()=>{
    valorTamanho.textContent=tamanho.value;
});

function gerarSenha(){

    let chars="abcdefghijklmnopqrstuvwxyz";

    if(document.getElementById("maiusculas").checked){
        chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if(document.getElementById("numeros").checked){
        chars+="0123456789";
    }

    if(document.getElementById("simbolos").checked){
        chars+="!@#$%&*?";
    }

    let novaSenha="";

    for(let i=0;i<tamanho.value;i++){
        novaSenha+=chars.charAt(
            Math.floor(Math.random()*chars.length)
        );
    }

    senha.value=novaSenha;
    verificarForca(novaSenha);
}

function verificarForca(senha){

    let pontos=0;

    if(senha.length>=8) pontos++;
    if(/[A-Z]/.test(senha)) pontos++;
    if(/[0-9]/.test(senha)) pontos++;
    if(/[!@#$%&*?]/.test(senha)) pontos++;

    if(pontos<=2){
        barra.style.width="30%";
        barra.style.background="#ef4444";
        texto.textContent="Senha Fraca";
    }
    else if(pontos===3){
        barra.style.width="70%";
        barra.style.background="#facc15";
        texto.textContent="Senha Média";
    }
    else{
        barra.style.width="100%";
        barra.style.background="#22c55e";
        texto.textContent="Senha Forte";
    }
}

gerarSenha();
