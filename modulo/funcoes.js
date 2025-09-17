/********************************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a api de estados e cidades
 * Data:15/09/2025
 * Autor: Isabelle
 * Versão 1.0
 ********************************************************************************************************/
//Import do arquivo estados e cidades
const e = require('express')
const dados = require('./estados_cidades.js')
const MESSAGE_ERROR = {status: false, statuscode: 500, development: 'Isabelle dos Santos de Abreu'}
//Retorna a lista de estados
const getAllEstados = function(){
    //Padrão do Json que será o retorno da função
    let message = {status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', uf: []}
    
    dados.listaDeEstados.estados.forEach(function(item){
        message.uf.push(item.sigla)
    })
    //Adiciona um novo elemento no Json
    message.quantidade = message.uf.length

    //apaga um elemento existente no JSON
    //delete message.status
    if(message.uf.length > 0)
        return message //Resultado Verdadeiro da API 200
    else
        return MESSAGE_ERROR //Resultado Falso da API 500
}

//Retorna dados do estado filtrando pela sigla
const getEstadoBySigla = function(sigla){
    //Padrão do Json que será o retorno da função
    let message = {status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', estado: null}

    //deixa a sigla maiuscula para evitar erros
    const siglaUpper = sigla.toUpperCase();

    //Procura o estado, utilizando find para buscar um unico item especifico
    const estadoEncontrado = dados.listaDeEstados.estados.find(function(item){
        return item.sigla === siglaUpper
    })

    //Verifica se o estado foi encontrado e corrige a nomenclatura de como vai aparece, para que mostre da forma desejada
    if(estadoEncontrado){
        const resultadoCorrigido = {
            uf: estadoEncontrado.sigla,
            descricao: estadoEncontrado.nome,
            capital: estadoEncontrado.capital,
            regiao: estadoEncontrado.regiao
        }

        return resultadoCorrigido

    } else {
        //Caso não for encontado retorna:
        return MESSAGE_ERROR
    } 
}    

// console.log('Resultado para SP:', getEstadoBySigla('SP'))
// console.log('Resultado para AC:', getEstadoBySigla('AC'))

 

//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function(sigla){
    //Padrão do Json que será o retorno da função
    let message = {status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', estado: null}

    //deixa a sigla maiuscula para evitar erros
    const siglaUpper = sigla.toUpperCase();

    //Procura o estado, utilizando find para buscar um unico item especifico
    const capitalEncontrada = dados.listaDeEstados.estados.find(function(item){
        return item.sigla === siglaUpper
    })

    //Verifica se o estado foi encontrado e corrige a nomenclatura de como vai aparece, para que mostre da forma desejada
    if(estadoEncontrado){
        const resultadoCorrigido = {
            uf: estadoEncontrado.sigla,
            descricao: estadoEncontrado.nome,
            capital: estadoEncontrado.capital,
            regiao: estadoEncontrado.regiao
        }

        return resultadoCorrigido

    } else {
        //Caso não for encontado retorna:
        return MESSAGE_ERROR
    } 
}    

}

//Retorna a lista de estados filtrando pela região
const getEstadosByRegiao = function(regiao){

}

//Retorna a lista de estados que formam a capital de um pais filtrando pelo pais
const getEstadoIsCapitalByCountry = function(pais){

}

//Retorna as cidades exitentes em um estado, filtrando pela sigla
const getCidadesBySigla = function(sigla){

}


module.exports = {
    getAllEstados
}