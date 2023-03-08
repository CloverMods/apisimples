sayo = process.cwd()
//=============\\
var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var { dados } = require('./lib/geradordedados');
var fetch = require('node-fetch')
//var canvacord = require('canvacord').Canvas
const hx = require('hxz-api');
var zrapi = require("zrapi");
const thiccysapi = require('textmaker-thiccy');
//const knights = require("knights-canvas");
var fs = require('fs')
const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("./lib/youtube");

exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
  fetch(url, options)
      .then(response => response.json())
      .then(json => {
          // console.log(json)
          resolve(json)
      })
      .catch((err) => {
          reject(err)
      })
})

var criador = ['CloverMods']; // Nome do criador
var key = 'jaJshaAjdga7'//apikey das apis

resposta = { //MSG DE ERRO NO SERVIDOR
    semkey: {
        status: false,
        criador: `${criador}`,
        código: 404,
        mensagem: 
        'ei 🤨 insira a apikey na url'
    },
    cdtxt: {
        status: false,
        criador: `${criador}`,
        código: 404,
        mensagem: 
        'ei 🤨 nao achei nenhum texto na url'
    },
    cdimg: {
        status: false,
        criador: `${criador}`,
        código: 404,
        mensagem: 
        'ei 🤨 Nao Achei Nenhum Link De Imagem Na Url'
    },
    error: {
       status: false,
        criador: `${criador}`,
        mensagem: 
        'ops :/ ocorreu um erro no servidor, tente novamente mais tarde'
    }
}

var keyinvalida = sayo + '/paginas/keysemresultado.html' // html key de invalida

async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}







            router.get('/apis-limitadas/consultas/cpf', async(req, res, next) => {
              cdapikey = req.query.apikey
              cpf = req.query.cpf
             if(!cdapikey) return res.json(resposta.semkey)
              if(cdapikey !== key) return res.sendFile(keyinvalida)
              if (!cpf) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Cpf Valido"})
              fetch(`
              https://webapi.herokuapp.com/puxar?type=api_cpf1&q=${cpf}&token=rF9cMJ9unNea`)
              .then(e => e.json())
              .then(e => {
                res.json(
                e
                )
                })})



router.get('/consultas/cnpj', async(req, res, next) => {
cdapikey = req.query.apikey
cnpj = req.query.cnpj
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!cnpj) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um CNPJ Valido"})
fetch(`https://webapi.herokuapp.com/puxar?type=api_cnpj&q=${cnpj}&token=rF9cMJ9unNea`)
.then(e => e.json())
.then(e => {
res.json(
e
)
})})


router.get('/consultas/score', async(req, res, next) => {
cdapikey = req.query.apikey
q = req.query.q
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um SCORE Valido"})
fetch(`https://webapi.herokuapp.com/puxar?type=api_score&q=${q}&token=rF9cMJ9unNea`)
.then(e => e.json())
.then(e => {
res.json(
e
)
})})

router.get('/consultas/placa', async(req, res, next) => {
cdapikey = req.query.apikey
q = req.query.q
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Uma PLACA Valido"})
fetch(`https://webapi.herokuapp.com/puxar?type=api_placa&q=${q}&token=rF9cMJ9unNea`)
.then(e => e.json())
.then(e => {
res.json(
e
)
})})

router.get('/consultas/nome', async(req, res, next) => {
cdapikey = req.query.apikey
q = req.query.q
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um NOME Valido"})
fetch(`https://webapi.herokuapp.com/puxar?type=api_nome&q=${q}&token=rF9cMJ9unNea`)
.then(e => e.json())
.then(e => {
res.json(
e
)
})})


router.get('/consultas/tele1', async(req, res, next) => {
cdapikey = req.query.apikey
q = req.query.q
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um TELEFONE Valido"})
fetch(`https://webapi.herokuapp.com/puxar?type=api_tel1&q=${q}&token=rF9cMJ9unNea`)
.then(e => e.json())
.then(e => {
res.json(
e
)
})})

router.get('/consultas/tele2', async(req, res, next) => {
cdapikey = req.query.apikey
q = req.query.q
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um TELEFONE Valido"})
fetch(`https://webapi.herokuapp.com/puxar?type=api_tel2&q=${q}&token=rF9cMJ9unNea`)
.then(e => e.json())
.then(e => {
res.json(
e
)
})})


router.get('/consultas/tele3', async(req, res, next) => {
cdapikey = req.query.apikey
q = req.query.q
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um TELEFONE Valido"})
fetch(`https://webapi.herokuapp.com/puxar?type=api_tel3&q=${q}&token=rF9cMJ9unNea`)
.then(e => e.json())
.then(e => {
res.json(
e
)
})})





   router.all('*', async (req, res) => {
   res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
})
  

module.exports = router
