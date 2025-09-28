/********************************************************************************************************
 * Objetivo: API responsavel em criar endPoints referente estados e cidades
 * Data:15/09/2025
 * Autor: Isabelle
 * Versão 1.0
 * 
 * Observações: Instalar dependencias para criar a API
 *      express     - npm install express --save        Instala as dependencias para criar uma API
 *      cors        - npm install cors --save           Instala as dependencias para configurar as permissões de uma API
 *      body-parser - npm install body-parser --save    Instala as dependencias para receber os tipos de dados via POST ou PUT
 ********************************************************************************************************/

//Import das dependencias
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import do arquivo de funções
const dados = require ('./modulo/funcoes.js')
//Define a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta
    //em execussão local podemos definir uma porta livre
const PORT = process.PORT || 8080

//instancia na classe do express
const app = express()

//Configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') //IP de origem
    response.header('Access-Control-Allow-Methods', 'GET') //Metodos (Verbos) do protocolo HTTP

    app.use(cors())
    next() //Proximo
})

//Retorna todos os estados
//EndPoints
app.get('/v1/estados', function(request, response){
    let estados = dados.getAllEstados()

    response.status(estados.statuscode)
    response.json(estados)
})

//Request -> recebe os dados
//Response -> Envia os dados na API

//retorna os dados do estado pela sigla
app.get('/v1/estado/sigla/:uf', (request, response) => {
    let uf = request.params.uf
    let resultado = dados.getEstadoBySigla(uf)
    response.status(resultado.statuscode || 200)
    response.json(resultado)
})

//retorna a capital de um estado pela sigla
app.get('/v1/estado/capital/:uf', (request, response) => {
    let uf = request.params.uf
    let resultado = dados.getCapitalBySigla(uf)
    response.status(resultado.statuscode || 200)
    response.json(resultado)
})

//retorna cidades do estado pela sigla (sem ID)
app.get('/v1/cidades/sigla/:uf', (request, response) => {
    let uf = request.params.uf
    let resultado = dados.getCidadesBySigla(uf)
    response.status(resultado.statuscode || 200)
    response.json(resultado)
})

//retorna os estados de uma região
app.get('/v1/regiao/:regiao', (request, response) => {
    let regiao = request.params.regiao
    let resultado = dados.getEstadosByRegiao(regiao)
    response.status(resultado.statuscode || 200)
    response.json(resultado)
})

//retorna os estados que já foram capital do Brasil
app.get('/v1/capitais-brasil', (request, response) => {
    let resultado = dados.getEstadoIsCapitalByCountry()
    response.status(resultado.statuscode || 200)
    response.json(resultado)
})

//Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições ....')
})