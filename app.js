/*
let titulo = document.querySelector('h1'); //Seleciona o H1 do HTML 
titulo.innerHTML = 'Jogo do Número Secreto'; //Manipula o H1 com o texto

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/
let listaDeNumerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTextoNoHtml(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNoHtml('h1', 'Jogo do número secreto!');
    exibirTextoNoHtml('p', 'Escolha um número entre 1 e ' + numeroMaximo);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value; //Seleciona o valor do input do HTML
    let palavraTentativa = tentativas > 1 ? ' tentativas!' : ' tentativa!';
    let mensagemAcerto = 'Você descobriu o número secreto com ' + tentativas + palavraTentativa;
    
    if(chute == numeroSecreto){
        exibirTextoNoHtml('h1', 'Você acertou!');
        exibirTextoNoHtml('p', mensagemAcerto);
        document.getElementById('reiniciar').removeAttribute('disabled'); //Selecionando uma tag pelo id (botão 'Novo Jogo' do HTML) e removendo um atributo (disabled)
    }else{
        if(chute > numeroSecreto){
            exibirTextoNoHtml('p', 'O número secreto é menor!');
        }else{
            exibirTextoNoHtml('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

//Gerando um número aleatório 
function gerarNumAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);

    if(listaDeNumerosSorteados == numeroMaximo){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){ //verificando se o numero gerado ja está no array
        return gerarNumAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido); //inserindo numero no array
        return numeroEscolhido;
    }
}

//Fazendo o campo voltar a não ter nada para um novo chute
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

//Função para reiniciar jogo
function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); //Adicionando atributo 'disabled' (true = começando habilitando)
}