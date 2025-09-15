/********************************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a api de estados e cidades
 * Data:15/09/2025
 * Autor: Isabelle
 * Versão 1.0
 ********************************************************************************************************/
//Import do arquivo estados e cidades
const dados = require('./estados_cidades.js')
const MESSAGE_ERROR = {status: false, statuscode: 500, development: 'Isabelle dos Santos de Abreu'}
//Retorna a lista de estados
const getAllEstados = function(){
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

}

//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function(sigla){

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