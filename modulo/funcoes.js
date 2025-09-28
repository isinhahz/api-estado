/********************************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a api de estados e cidades
 * Data:15/09/2025
 * Autor: Isabelle
 * Versão 1.0
 ********************************************************************************************************/
//Import do arquivo estados e cidades
const e = require('express')
const dados = require('./estados_cidades.js')
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'Isabelle dos Santos de Abreu' }
//Retorna a lista de estados
const getAllEstados = function () {
    //Padrão do Json que será o retorno da função
    let message = { status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', uf: [] }

    dados.listaDeEstados.estados.forEach(function (item) {
        message.uf.push(item.sigla)
    })
    //Adiciona um novo elemento no Json
    message.quantidade = message.uf.length

    //apaga um elemento existente no JSON
    //delete message.status
    if (message.uf.length > 0)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500
}



//Retorna dados do estado filtrando pela sigla
const getEstadoBySigla = function (sigla) {
    //Padrão do Json que será o retorno da função
    let message = { status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', estado: null }

    //deixa a sigla maiuscula para evitar erros
    const siglaUpper = sigla.toUpperCase();

    //procura o estado, utilizando find para buscar um unico item especifico
    const estadoEncontrado = dados.listaDeEstados.estados.find(function (item) {
        return item.sigla === siglaUpper
    })

    //verifica se o estado foi encontrado e corrige da forma que vai aparecer
    if (estadoEncontrado) {
        const resultadoCorrigido = {
            uf: estadoEncontrado.sigla,
            descricao: estadoEncontrado.nome,
            capital: estadoEncontrado.capital,
            regiao: estadoEncontrado.regiao
        }

        return resultadoCorrigido

    } else {
        //caso não for encontrado
        return MESSAGE_ERROR
    }
}



//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function (sigla) {

    //Padrão do Json que será o retorno da função
    let message = { status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', estado: null }

    //deixa a sigla maiuscula para evitar erros
    const siglaUpper = sigla.toUpperCase();

    //procura o estado, utilizando find para buscar um unico item especifico
    const capitalEncontrada = dados.listaDeEstados.estados.find(function (item) {
        return item.sigla === siglaUpper
    })

    //verifica se o estado foi encontrado e corrige
    if (capitalEncontrada) {
        const resultadoCorrigido = {
            uf: capitalEncontrada.sigla, descricao: capitalEncontrada.nome, capital: capitalEncontrada.capital
        }

        return resultadoCorrigido

    } else {
        //caso não for encontrado
        return MESSAGE_ERROR
    }
}



//Retorna a lista de estados filtrando pela região
const getEstadosByRegiao = function (regiao) {

    let message = {status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', regiao: regiao, estados: []}

    const regiaoUpper = regiao.toUpperCase();

    //filtra todos os estados das regiões
    const estadosFiltrados = dados.listaDeEstados.estados.filter(function (item) {
        return item.regiao.toUpperCase() === regiaoUpper
    })

    if (estadosFiltrados.length > 0) {
        //monta o array de estados
        estadosFiltrados.forEach((estado) => {
            message.estados.push({
                uf: estado.sigla,
                descricao: estado.nome
            })
        })

        return message
    } else {
        return MESSAGE_ERROR
    }
}


//console.log(getEstadosByRegiao('NORDESTE'))


   
//Retorna a lista de estados que formam a capital de um pais filtrando pelo pais
    const getEstadoIsCapitalByCountry = function () {

    let message = {status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', capitais: []}

    //percorre todos os estados
    dados.listaDeEstados.estados.forEach(function (estado) {
        //verifica se o estado tem a propriedade 'capital_pais'
        if (estado.capital_pais) {
            message.capitais.push({
                capital_atual: estado.capital_pais.capital === true,
                uf: estado.sigla,
                descricao: estado.nome,
                capital: estado.capital,
                regiao: estado.regiao,
                capital_pais_ano_inicio: estado.capital_pais.ano_inicio,
                capital_pais_ano_termino: estado.capital_pais.ano_fim
            })
        }
    })

    //verifica se encontrou alguma capital histórica
    if (message.capitais.length > 0) {
        return message
    } else {
        return MESSAGE_ERROR
    }
}

   // console.log(getEstadoIsCapitalByCountry('BRASIL'))
    
    
    //retorna as cidades exitentes em um estado, filtrando pela sigla
    const getCidadesBySigla = function (sigla) {
      
    //padrão do JSON de retorno
    let message = {status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', uf: '', descricao: '', quantidade_cidades: 0,  cidades: []}

    //padroniza a sigla para maiúsculo
    const siglaUpper = sigla.toUpperCase()

    //busca o estado correspondente
    const estadoEncontrado = dados.listaDeEstados.estados.find(function (item) {
        return item.sigla === siglaUpper
    })

      if (estadoEncontrado) {
        message.uf = estadoEncontrado.sigla
        message.descricao = estadoEncontrado.nome
       
        //para ignorar o ID, trazendo apenas os nomes
        message.cidades = estadoEncontrado.cidades.map(cidade => cidade.nome)
        message.quantidade_cidades = message.cidades.length

        return message
    } else {
        return MESSAGE_ERROR // estado não encontrado
    }
}

//console.log(getCidadesBySigla('AC'))

    module.exports = {
        getAllEstados,
        getEstadoBySigla,
        getCapitalBySigla,
        getEstadosByRegiao,
        getEstadoIsCapitalByCountry,
        getCidadesBySigla
    }


