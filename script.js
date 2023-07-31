// Algoritmo

// CALCULARIMC
// 1. Pegar os valores
// 2. Calcular o IMC
// 3. Gerar a classificação do IMC
// 4. Organizar as informações
// 5. Salvar os dados na lista
// 6. Ler a lista com os dados
// 7. Renderizar o conteudo no html
// 8. Botão de limpar os registros 

//Função principal
function calcularImc(event) {
    // Previne que a tela se recarregue quando a função for executada
    // event.preventDefault() 

    console.log("Funcionante!!!");

    // Executa a função pegarValores
    let dadosUsuario = pegarValores();

    // Executa a função calcular e salva seu retorno na variavel imc
    let imc = calcular(dadosUsuario.altura, dadosUsuario.peso);

    // Executa a função classificarImc passando como atributo o valor que esta na variavel imc e salva seu retorno na variavel classificacaoImc
    let classificacaoImc = classificarImc(imc); 

    // Executa a função organizarDados passando os atributos: dadosUsuario, imc e classificacaoImc, e salva seu retorno na variavel usuarioAtualizado
    let usuarioAtualizado = organizarDados(dadosUsuario, imc, classificacaoImc);

    // Executa a função cadastrarUsuario passando como parametro o usuarioAtualizado
    cadastrarUsuario(usuarioAtualizado);

}

// Passo 1 - Pegar valor
function pegarValores() {
    // Obtém os valores que foram digitados em cada elemento identificados pelo ID
    let nomeRecebido = document.getElementById("nome").value.trim(); // trim - apaga os possiveis espaços em branco no inicio e fim da string
    let alturaRecebida = parseFloat(document.getElementById("altura").value);
    let pesoRecebido = parseFloat(document.getElementById("peso").value);

    // Cria um objeto salvando os valores obtidos nos atributos
    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido
    }

    console.log(dadosUsuario);

    // Retorna o objeto dadosUsuario
    return dadosUsuario;
}


//Passo 2 - Calcular
function calcular(altura, peso) {
    // Faz o calculo para encontrar o imc: PESO dividido por(ALTURA vezes ALTURA) e salva na variavel
    let imc = peso / (altura * altura)

    console.log(imc);

    // Retorna a variavel imc
    return imc;
}


//Passo 3 - Classificar
function classificarImc(imc) {
    /*
        Resultado	        Situação
        Abaixo de 18,5      Filezinho!!!
        Entre 18,5 e 24,99	Diliça!!!
        Entre 25 e 29,99	Ta Top!!!
        Acima de 30      	Oh la em casa!!!
    */

    // Avalia o valor que esta dentro da variavel imc e retorna um valor diferente para cada intervalo
    if(imc < 18.5){
        return "Filezinho!!!";

    }else if(imc < 25){
        return "Diliça!!!"

    }else if (imc < 30) {
        return "Ta Top!!!"

    }else{
        return "Oh la em casa!!!"
    }
}


// Passo 4 - Organizar informações
function organizarDados(dadosUsuario, valorImc, classificacaoImc) {
    // Obtém a data e hora atual padrão pt-BR já formatada
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    // Cria um novo objeto passando os atributos do objeto anterior e acrescenta novos atributos
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacao: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    // Retorna o objeto criado
    return dadosUsuarioAtualizado;
}


//Passo 5 - Salvar
function cadastrarUsuario(usuario) {
    // Cria um array vazio
    let listaUsuarios = [];

    // Verifica se existe o item "usuariosCadastrados" no localStorage
    //if (localStorage.getItem("usuariosCadastrados") == true) {
    if (localStorage.getItem("usuariosCadastrados")) {
        // Caso o item exista ele converte e salva no array criado
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    // Acrescenta o usuario recebido a lista
    listaUsuarios.push(usuario)

    // Salva o item "usuariosCadastrados" no localStorage com o conteudo do array convertido para string
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}


// Passo 6 - Ler lista
function carregarUsuarios() {
    // Cria um array vazio
    let listaUsuarios = [];

    // Verifica se existe o item "usuariosCadastrados" no localStorage
    if (localStorage.getItem("usuariosCadastrados")) {
        // Caso o item exista ele converte e salva no array criado
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    // Verifica se o tamanho do array é igual a zero
    if (listaUsuarios.length == 0) {
        // Se o tamanho do array for igual a zero,
        // Obtém o elemento html (tabela) pelo ID
        let tabela = document.getElementById("corpo-tabela");

        //Cria uma linha na tabela com a mensagem "Nenhum usuario cadastrado!""
        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado!</td>
    </tr>`

    }else{
        // Se o tamanho do array for diferente de zero, ou seja tem algum item dentro do array
        // Executa a função montarTabela
        montarTabela(listaUsuarios);
    }
}

// Adiciona o evento a janela/navegador que executa a função carregarUsuarios quando o DOM estiver carregado
window.addEventListener('DOMContentLoaded', () => carregarUsuarios());


// Passo 7 - Montar tabela
function montarTabela(listaDeCadastrados) {
    // Obtém o elemento html (tabela) pelo ID
    let tabela = document.getElementById("corpo-tabela");

    // Cria uma variavel vazia
    let template = '';

    console.log(listaDeCadastrados);

    // Obtém cada item dentro do array listaDeCadastrados
    listaDeCadastrados.forEach(pessoa => {
        // Cria uma linha de tabela mesclando tag html e valor dos atributos do objeto que esta dentro do array
        // E adiciona um bloco de codigo igual o a baixo dentro da variavel template para cada elemento do array
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="altura">${pessoa.altura}</td>
        <td data-cell="peso">${pessoa.peso}</td>
        <td data-cell="valor do IMC">${pessoa.imc}</td>
        <td data-cell="classificação do IMC">${pessoa.classificacao}</td>
        <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
    </tr>`
    });

    // Adiciona o conteudo que esta dentro da variavel template ao elemento tabela
    tabela.innerHTML = template;
}


// Passo 8 - Limpar local storage
function deletarRegistros() {
    // Remove o item "usuariosCadastrados" do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a pagina
    window.location.reload();

}