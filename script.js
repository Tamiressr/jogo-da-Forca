/* Elemento HTML referente a categoria */
const categoria = document.querySelector("#category");
/* Elemento HTML referente a lista das letras erradas*/
const letrasErradas = document.querySelector(".wrongLetters");
/* Elemento HTML referente a palavra oculta
   Utilizaremos esse mesmo elemento para exibir as mensagens do jogo*/
   const palavraInterface = document.querySelector(".dashes");
/* Array com elementos HTML referentes aos olhos do personagem */
const olhos = Array.from(document.querySelectorAll(".eyes"));
/* Array com elementos HTML referentes as partes do corpo */
let partesBoneco = Array.from(document.querySelectorAll("#person div"));
partesBoneco = partesBoneco.slice(2, partesBoneco.length);
/* Palavra corrente */
let palavraProposta;
/* Lista das letras erradas */
let letrasErradasArray = [];
/* Index da parte do corpo corrente */
let indiceBoneco;
/* Numero de chances do jogador */
const numTentativas = 7;
/* Valor para opacidade dos olhos */
const opacidadeOlhos = 0.3;

const categorias={
    frutas:["Banana", "Laranja", "Maça", "Manga","Uva","Pêra","Acerola"],
    profissoes:["Engenheiro", "Advogado","Esteticista","Ator","Cantor","Programador"],
    animais:["Gato","Cachorro","Cavalo","Hipototamo","Elefante","Égua","Anta"],
    cores:["Azul","Preto","Branco","Amarelo","Verde","Marrom","Cinza"]
};

/*
funções do primeiro commit exibe categorias

*/
function retornaArrayCategorias(){
    return Object.keys(categorias);
}
function retornaCategoria(){
    const arrayCategoria= retornaArrayCategorias();
    let indiceCategoria=retornaNumAleatorio(arrayCategoria.length);
    return arrayCategoria[indiceCategoria];
}
function exibeCategoria(){
    categoria.innerHTML=retornaCategoria();
}

/*-------------------------------------------------------------------------
funções do segundo commit- escolhe a palavra aleatoriamente e oculta na interface
 mostrando apenas  traços
 */
function retornaNumAleatorio(max){
    let numAleatorio=Math.floor(Math.random()*max);
    return numAleatorio;
}
function definePalavraProposta(){
    const arrayPalavras=categorias[categoria.innerHTML];
    let indicePalavra=retornaNumAleatorio(arrayPalavras.length);
    palavraProposta= arrayPalavras[indicePalavra];
    console.log(palavraProposta);
    ocultaPalavra();
}
function ocultaPalavra(){
    let palavraOcultada="";
    for(let i=0;i<palavraProposta.length;i++){
        palavraOcultada+="-";
    }
    exibePalavraInterface(palavraOcultada);
}
function exibePalavraInterface(palavra){
    palavraInterface.innerHTML=palavra;
}
/*-------------------------------------------------------------------------
funções do terceiro commit- verifica a letra informada, preenche o boneco
atualiza a interface com letras erradas informadas e tbm a certa
*/


function tentativa(letra){
    if(palavraProposta.includes(letra)){
        atualizaPalavraInterface(letra);
    }else{
        letrasErradasArray.push(letra);
        letrasErradas.innerHTML="Letras Erradas: "+ letrasErradasArray;
        if(partesBoneco.length>indiceBoneco){

            desenhaBoneco();
        }
    }
}
function atualizaPalavraInterface(letra){
    let palavraAuxiliar= "";
    for(let i=0;i<palavraProposta.length;i++){
        if(palavraProposta[i]===letra){
            palavraAuxiliar+=letra;
        }else if(palavraInterface.innerHTML[i]!="-"){
            palavraAuxiliar+=palavraInterface.innerHTML[i];
        }
        else{
            palavraAuxiliar+="-"
        }
    }
    exibePalavraInterface(palavraAuxiliar);
}

/*
--------------------------------------------------------
*/

/*
Recebe o evento do teclado e passa apenas o valor da letra para a função tentativa
*/
function retornaLetra(e){ 
    tentativa(e.key);
}

/*
Desenha a parte do corpo corrente
*/
function desenhaBoneco(){
    partesBoneco[indiceBoneco].classList.remove("hide");
    indiceBoneco++; 
}

/* 
Desenha os olhos do personagem
*/
function desenhaOlhos(){
    olhos.forEach((olho => {
        olho.style.opacity = 1;
        olho.style.zIndex = 10;
    }));
}

/*
Oculta as partes do corpo do personagem
*/
function ocultaBoneco(){
    olhos.forEach((olho => {
        olho.style.opacity = opacidadeOlhos; 
    }));
    partesBoneco.forEach(parteBoneco => {
        parteBoneco.classList.add("hide");
    });
}

/*
Inicia as configurações do jogo
*/
function iniciaJogo(){
    indiceBoneco = 0;
    letrasErradasArray = [];
    exibeCategoria();
    definePalavraProposta();
    letrasErradas.innerHTML = "Letras erradas: ";
    window.addEventListener("keypress", retornaLetra);
}

window.addEventListener("load", iniciaJogo);
