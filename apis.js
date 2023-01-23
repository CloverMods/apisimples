sayo = process.cwd()
//=============\\
var express = require('express');
var router = express.Router();
var { exec } = require('child_process')
var { dados } = require('./lib/geradordedados');
var fetch = require('node-fetch')
var canvacord = require('canvacord').Canvas
const hx = require('hxz-api');
var zrapi = require("zrapi");
const thiccysapi = require('textmaker-thiccy');
const knights = require("knights-canvas");
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

var criador = ['JG-Bots']; // Nome do criador
var key = 'jg' //apikey das apis

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

 router.all('/loli', async (req, res) => {
   var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/lolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
  router.get('/canvas/*', async (req, res) => {
  var cdapikey = req.query.apikey;
   let { url, texto } = req.query
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
  switch(req.path.replace(/\/canvas/, '').toLowerCase()) {
 case '/canvas/trigger':
 case '/trigger/':
  if (!url) return res.status(408).send(resposta.cdimg)
  res.type('gif')
  res.send(await canvacord.trigger(url))
 break
 case '/canvas/changemymind':
 case '/canvas/changemymind/':
  if (!texto) return res.status(408).send(resposta.cdimg)
  res.type('jpg')
  res.send(await canvacord.changemymind(texto))
  break
 case '/canvas/clyde':
 case '/canvas/clyde/':
  if (!texto) return res.status(408).send(resposta.cdimg)
  res.type('jpg')
  res.send(await canvacord.clyde(texto))
  break

  case '/gtts':
  case '/gtts/':
var cdapikey = req.query.apikey;
let { texto } = req.query
if(!cdapikey) return res.json(resposta.semkey)
if(cdapikey !== key) return res.sendFile(keyinvalida)
if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
res.type('mp3')
res.send(await TextToSpeech.talk([texto]))
break

 default: 
 res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
 }
  } catch (e) {
  console.error(e) 
   res.type('text/json')
   res.status(400).send(resposta.error)
 }
 })
 router.get('/nsfw/hentai', async (req, res) => {
 var cdapikey = req.query.apikey;
 try {
if(!cdapikey) return res.json(resposta.semkey)
 if(cdapikey !== key) return res.sendFile(keyinvalida)
 end = getRandom([,"waifu", "neko"])
 let { url } = await getJson(`https://api.waifu.pics/nsfw/${end}`)
 let buffer = await getBuffer(url)
 res.type('png')
 res.send(buffer)
 } catch {
 res.type('text/json')
 res.status(400).send(resposta.error)
 }
 })

 router.get('/yt/playlink/mp3', async(req, res, next) => {
 apikey = req.query.apikey;
 link = req.query.link
if(apikey !== key) return res.sendFile(keyinexistente)
if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o parametro: LINK"})
PlayLinkMP3(link).then((resultado) => {
 res.json({
 status: true,
 código: 200,
 criador: `${criador}`,
 resultado: resultado
 })}).catch(e => {
res.json({
 msg: `erro no servidor interno`
 })})})

 router.get('/youtube/pesquisar', async(req, res, next) => {
apikey = req.query.apikey;
q = req.query.q
 if(apikey !== key) return res.sendFile(keyinexistente)
 if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o parametro: q"})
 ytSearch(q).then(result => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: result
})}).catch(e => {
res.json({
msg: `erro no servidor interno`
})})})

router.all('/tools/emojimix', async (req, res) => {
apikey = req.query.apikey;
e1 = req.query.emoji1;
e2 = req.query.emoji2;
if(apikey !== key) return res.sendFile(keyinexistente)
if (!e1) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o parametro: EMOJI1"})
if (!e2) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o parametro: EMOJI2"})
emojimix_api = `https://infinitybot-api.herokuapp.com/api/lzcanvas/emojimix?emoji1=${e1}&emoji2=${e2}&apikey=lz`
res.type('png')
res.send(await getBuffer(emojimix_api))
})

 router.get('/yt/playlink/mp4',  async(req, res, next) => {
 apikey = req.query.apikey;
 link = req.query.link
if(apikey !== key) return res.sendFile(keyinexistente)
if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o parametro: LINK"})
PlayLinkMP4(link).then((resultado) => {
 res.json({
 status: true,
 código: 200,
 criador: `${criador}`,
 resultado: resultado
 })}).catch(e => {
res.json({
 msg: `erro no servidor interno`
 })})})

 router.get('/yt/playmp4', async(req, res, next) => {
apikey = req.query.apikey;
q = req.query.q
if(apikey !== key) return res.sendFile(keyinexistente)
if (!q) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o parametro: q"})
PlayVideo(q).then((resultado) => {
 res.json({
 status: true,
 código: 200,
 criador: `${criador}`,
 resultado: resultado
 })}).catch(e => {
res.json({
 msg: `erro no servidor interno`
 })})})

router.get('/others/tradutor', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  texto = req.query.texto
  ling = req.query.linguagem
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  if (!ling) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Uma Linguagem Valida"})
  fetch(`http://api-exteam.herokuapp.com/api/traducao?texto=${texto}&lingua=${ling}&apikey=ale652`)
  .then(e => e.json())
  .then(e => {
  res.json({
    status: true,
    código: 404,
    criador: `${criador}`,
    texto_original: `${texto}`,
    texto_traduzido: `${e.resultado}`,
    lingua: `${ling}`
  })
  })
})

router.get('/others/fazernick', async(req, res, next) => {
  cdapikey = req.query.apikey
  nome = req.query.nome
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!nome) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Nome Valido"})
  fetch(`http://aleatoryapi.herokuapp.com/api/fazernick?nome=${nome}&apikey=ale203`)
  .then(e => e.json())
  .then(e => {
    res.json({
      status: true,
      código: 404,
      criador: `${criador}`,
      resultado: {
          nick1: `${e[1]}`,
          nick2: `${e[2]}`,
          nick3: `${e[3]}`,
          nick4: `${e[4]}`,
          nick5: `${e[5]}`,
          nick6: `${e[6]}`,
          nick7: `${e[7]}`,
          nick8: `${e[8]}`,
          nick9: `${e[9]}`,
          nick10: `${e[10]}`,
          nick11: `${e[11]}`,
          nick12: `${e[12]}`,
          nick13: `${e[13]}`,
          nick14: `${e[14]}`,
          nick15: `${e[15]}`,
          nick16: `${e[16]}`,
          nick17: `${e[17]}`,
          nick18: `${e[18]}`,
          nick19: `${e[19]}`,
          nick20: `${e[20]}`
        }
      }
    )
    })})

    router.get('/download/mediafire', async(req, res, next) => {
      cdapikey = req.query.apikey
      link = req.query.link
     if(!cdapikey) return res.json(resposta.semkey)
      if(cdapikey !== key) return res.sendFile(keyinvalida)
      if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Link Valido"})
      fetch(`http://api-exteam.herokuapp.com/api/mediafire/down?link=${link}&apikey=ale652`)
      .then(e => e.json())
      .then(e => {
        res.json({
          status: true,
          código: 404,
          criador: `${criador}`,
          nomedoarquivo: `${e.nome_arquivo}`,
          tamanho: `${e.tamanho}`,
          download: `${e.link}`
        })
        })})

        router.get('/download/googledrive', async(req, res, next) => {
          cdapikey = req.query.apikey
          link = req.query.link
         if(!cdapikey) return res.json(resposta.semkey)
          if(cdapikey !== key) return res.sendFile(keyinvalida)
          if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Link Valido"})
          fetch(`https://api.zeks.me/api/gdbypass?apikey=apivinz&url=${link}`)
          .then(e => e.json())
          .then(e => {
            res.json({
              status: true,
              código: 404,
              criador: `${criador}`,
              nome_do_arquivo: `${e.data.file_name}`,
              download: `${e.data.download_link}`,
              download_direto: `${e.data.direct_download}`,
            })
            })})

            router.get('/apis-limitadas/consultas/cpf', async(req, res, next) => {
              cdapikey = req.query.apikey
              cpf = req.query.cpf
             if(!cdapikey) return res.json(resposta.semkey)
              if(cdapikey !== key) return res.sendFile(keyinvalida)
              if (!cpf) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Cpf Valido"})
              fetch(`https://ws.hubdodesenvolvedor.com.br/v2/cpf/?cpf=${cpf}&data=23/03/2985_formato_pt_br&token=117803075TWyOZwSkYd212689880`)
              .then(e => e.json())
              .then(e => {
                res.json({
                  status: true,
                  código: 404,
                  criador: `${criador}`,
                  cpf_informado: `${e.result.numero_de_cpf}`,
                  nome_do_titular: `${e.result.nome_da_pf}`,
                  data_de_nascimento: `${e.result.data_nascimento}`,
                  situaçao: `${e.result.situacao_cadastral}`,
                  cadastrado_em: `${e.result.data_inscricao}`,
                })
                })})

            router.get('/consultas/cepv2', async(req, res, next) => {
              cdapikey = req.query.apikey
              cep = req.query.cep
             if(!cdapikey) return res.json(resposta.semkey)
              if(cdapikey !== key) return res.sendFile(keyinvalida)
              if (!cep) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Cep Valido"})
              fetch(`https://www.luc4rio-rest-api.tk/api/consultas/codigopostal2?cep2=${cep}`)
              .then(e => e.json())
              .then(e => {
                res.json({
                  status: true,
                  código: 404,
                  criador: `${criador}`,
                  cep_informado: `${e.CEP_Informado}`,
                  local: `${e.Rua_Encontrada} / ${e.Estado_Encontrado}`,
                  uf: `${e.Sigla_Do_Estado}`,
                  ddd: `${e.DDD_Encontrado}`
                })
                })})
    

        router.get('/consultas/cep', async(req, res, next) => {
          cdapikey = req.query.apikey
          cep = req.query.cep
         if(!cdapikey) return res.json(resposta.semkey)
          if(cdapikey !== key) return res.sendFile(keyinvalida)
          if (!cep) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Cep Valido"})
          fetch(`https://akame-api.herokuapp.com/api/consulta/cep?cep=${cep}&apikey=eXYdgjEf`)
          .then(e => e.json())
          .then(e => {
            res.json({
              status: true,
              código: 404,
              criador: `${criador}`,
              cep_informado: `${e.resultado.cep}`,
              local: `${e.resultado.local} / ${e.resultado.localidade}`,
              bairro: `${e.resultado.bairro}`,
              uf: `${e.resultado.uf}`,
              ddd: `${e.resultado.ddd}`
            })
            })})

            
            router.get('/consultas/ip', async(req, res, next) => {
              cdapikey = req.query.apikey
              ip = req.query.ip
             if(!cdapikey) return res.json(resposta.semkey)
              if(cdapikey !== key) return res.sendFile(keyinvalida)
              if (!ip) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um IP Valido"})
              fetch(`https://www.luc4rio-rest-api.tk/api/consultas/internet?ip=${ip}`)
              .then(e => e.json())
              .then(e => {
                res.json({
                  status: true,
                  código: 404,
                  criador: `${criador}`,
                    ip_informado: `${e.IP_Informado}`,
                    cidade: `${e.Cidade_Encontrada}`,
                    codigo_postal: `${e.Codigo_Postal}`,
                    local: `${e.Regiao_Encontrada} / ${e.Pais_Encontrado}`,
                    provedor1: `${e.Provedor_1}`,
                    provedor2: `${e.Provedor_2}`,
                    sigla_do_pais: `${e.Sigla_Do_Pais}`,
                    horario_local: `${e.Horario_Local}`,
                    latitude: `${e.Latitude}`,
                    longitude: `${e.Longitude}`
                  })
                })})

                router.get('/consultas/cnpj', async(req, res, next) => {
                  cdapikey = req.query.apikey
                  cnpj = req.query.cnpj
                 if(!cdapikey) return res.json(resposta.semkey)
                  if(cdapikey !== key) return res.sendFile(keyinvalida)
                  if (!cnpj) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um CNPJ Valido"})
                  fetch(`https://www.luc4rio-rest-api.tk/api/consultas/juridico?cnpj=${cnpj}`)
                  .then(e => e.json())
                  .then(e => {
                    res.json({
                      status: true,
                      código: 404,
                      criador: `${criador}`,
                        cnpj_informado: `${cnpj}`,
                        nome: `${e.Nome_Encontrado}`,
                        criado_em: `${e.Abertura_CNPJ}`,
                        atividade_principal: `${e.Atividade_Principal}`,
                        atualizado_em: `${e.Atualizado_Em}`,
                        local: `${e.Bairro_Encontrado} / ${e.Cidade_Encontrada} / ${e.Pais_Encontrado}`,
                        situaçao: `${e.Situacao_Encontrada}`,
                        sigla_do_estado: `${e.Sigla_Do_Estado}`,
                        telefone: `${e.Telefone_Encontrado}`,
                        cep: `${e.CEP_Encontrado}`,
                        numero_da_casa: `${e.Numero_Da_Casa}`
                      })
                    })})

                  

            router.get('/consultas/ddd', async(req, res, next) => {
              cdapikey = req.query.apikey
              ddd = req.query.ddd
             if(!cdapikey) return res.json(resposta.semkey)
              if(cdapikey !== key) return res.sendFile(keyinvalida)
              if (!ddd) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um DDD Valido"})
              fetch(`https://akame-api.herokuapp.com/api/consulta/ddd?ddd=${ddd}&apikey=eXYdgjEf`)
              .then(e => e.json())
              .then(e => {
                res.json({
                  status: true,
                  código: 404,
                  criador: `${criador}`,
                  cidades_relacionadas: `${e.resultado.cidades}`
                })
                })})


                router.get('/others/camufladordelinks', async(req, res, next) => {
                  cdapikey = req.query.apikey
                  link = req.query.link
                 if(!cdapikey) return res.json(resposta.semkey)
                  if(cdapikey !== key) return res.sendFile(keyinvalida)
                  if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Link Valido"})
                  fetch(`https://api.zeks.me/api/urlshort?apikey=apivinz&url=${link}`)
                  .then(e => e.json())
                  .then(e => {
                    res.json({
                      status: true,
                      código: 404,
                      criador: `${criador}`,
                      resultado: `${e.result}`
                    })
                    })})


        
        
router.get('/others/attp', async(req, res, next) => {
          cdapikey = req.query.apikey
          txt = req.query.texto
          if (!txt) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um texto Valido"})
         if(!cdapikey) return res.json(resposta.semkey)
          if(cdapikey !== key) return res.sendFile(keyinvalida)
                    let attp = (`https://api.xteam.xyz/attp?file&text=${txt}`)
          let buffer = await getBuffer(attp)
          res.type('webp')
          res.send(buffer)
})
        
        router.get('/canvass/welcome-v1', async(req, res, next) => {
          cdapikey = req.query.apikey
          tit = req.query.titulo
          nm = req.query.nome
          ftp = req.query.fotodeperfil
          ftf = req.query.fotodofundo
          nmg = req.query.nomedogrupo
          if (!tit) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Titulo Valido"})
          if (!nm) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Nome Valido"})
          if (!ftp) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Uma Foto De Perfil Valida"})
          if (!ftf) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Uma Foto De Fundo Valida"})
          if (!nmg) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Nome De Grupo Valido"})
         if(!cdapikey) return res.json(resposta.semkey)
          if(cdapikey !== key) return res.sendFile(keyinvalida)
          let ex = (`http://api-exteam.herokuapp.com/api/welcome?titulo=${tit}&nome=${nm}&perfil=${ftp}&fundo=${ftf}&grupo=${nmg}`)
          let buffer = await getBuffer(ex)
          res.type('jpg')
          res.send(buffer)
            })
            
 router.get('/canvass/goodbye-v1', async(req, res, next) => {
          cdapikey = req.query.apikey
          tit = req.query.titulo
          nm = req.query.nome
          ftp = req.query.fotodeperfil
          ftf = req.query.fotodofundo
          nmg = req.query.nomedogrupo
          if (!tit) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Titulo Valido"})
          if (!nm) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Nome Valido"})
          if (!ftp) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Uma Foto De Perfil Valida"})
          if (!ftf) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Uma Foto De Fundo Valida"})
          if (!nmg) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Nome De Grupo Valido"})
         if(!cdapikey) return res.json(resposta.semkey)
          if(cdapikey !== key) return res.sendFile(keyinvalida)
          let ex = (`http://api-exteam.herokuapp.com/api/welcome?titulo=${tit}&nome=${nm}&perfil=${ftp}&fundo=${ftf}&grupo=${nmg}`)
          let buffer = await getBuffer(ex)
          res.type('jpg')
          res.send(buffer)
            })

//==============\\ HEXA--API //==============\\

router.get('/search/playstore', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { app } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!app) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Nome De Um App Valido"})
  hx.playstore(app)
  .then(result => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: result
    })})
});

router.get('/search/letra', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { musica } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!musica) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Nome De Uma Musica Valida"})
  hx.lirik(musica)
  .then(letradamusica => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: letradamusica
    })})
});

router.get('/search/pinterest', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { nome } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!nome) return res.json({ status : false, criador : `criador`, mensagem : "Nao Achei Essa Imagem :("})
  hx.pinterest(judul)
  .then(pintes => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: pintes
    })})
});

router.get('/download/tiktok', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { link } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Link De Um Video Valido!"})
  hx.ttdownloader(link)
  .then(video => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: video
    })})
});

router.get('/download/instagram', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { link } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Link De Um Video Valido!"})
  hx.igdl(link)
  .then(resultado => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: resultado
    })})
});

router.get('/download/facebook', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { link } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Link De Um Video Valido!"})
  hx.fbdown(link)
  .then(facev => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: facev
    })})
});

router.get('/download/twitter', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { link } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!link) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Link De Um Video Valido!"})
  hx.twitter(link)
  .then(twiv => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: twiv
    })})
});


//===============\\ TEXT-PRO //===============\\

router.get('/textpro/joker-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
    zrapi.textpro("https://textpro.me/create-logo-joker-online-934.html", [texto,])
  .then((data) => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

router.get('/textpro/glitch2-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
texto1 = req.query.texto1
texto2 = req.query.texto2
 if(!cdapikey) return res.json(resposta.semkey)
 if (!texto1) return res.json({ status : false, criador : `criador`, mensagem : "Texto 1 Invalido"})
 if (!texto1) return res.json({ status : false, criador : `criador`, mensagem : "Texto 2 Invalido"})
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  zrapi.textpro("https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html",[texto1, texto2]
  ).then(async (dataa) => {  res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: dataa
    })})
 });

 router.get('/textpro/glitch-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  zrapi.textpro("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", [texto,])
  .then((data) => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/textpro/future-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  zrapi.textpro("https://textpro.me/create-3d-sci-fi-text-effect-online-1050.html", [texto,])
  .then((data) => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/textpro/cam-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  zrapi.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", [texto,])
  .then((data) => {res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/textpro/stone-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  zrapi.textpro("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", [texto,])
  .then((data) => {res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/textpro/thunder-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  zrapi.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", [texto,])
  .then((data) => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/textpro/neon3d-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query.texto
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  zrapi.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", [texto,])
  .then((data) => {res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/textpro/harrypotter-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  zrapi.textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html", [texto,])
  .then((data) => {res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/textpro/pornhub-logo', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  texto1 = req.query.texto1
  texto2 = req.query.texto2
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto1) return res.json({ status : false, criador : `criador`, mensagem : "Texto 1 Invalido"})
  if (!texto1) return res.json({ status : false, criador : `criador`, mensagem : "Texto 2 Invalido"})
  zrapi.textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html",[texto1, texto2]
  ).then(async (dataa) => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: dataa
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

 router.get('/search/playstore', async(req, res, next) => {
  var cdapikey = req.query.apikey;
  let { texto } = req.query
 if(!cdapikey) return res.json(resposta.semkey)
  if(cdapikey !== key) return res.sendFile(keyinvalida)
  if (!texto) return res.json({ status : false, criador : `criador`, mensagem : "Coloque Um Texto Valido"})
  thiccysapi.textpro("https://textpro.me/pornhub-style-logo-online-generator-free-977.html", [texto,])
  .then((data) => { res.json({
      status: true,
      código: 200,
      criador: `${criador}`,
      resultado: data
    })})
  .catch((err) =>
   console.log(err));
 { res.sendFile(error)}});

//===============\\ TEXT-PRO //===============\\

 router.all('/shota', async (req, res) => {
 var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/shotas.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
router.post('/post/body', async (req, res) => {
  res.send(req.body)
})
   router.all('/nsfw/loli', async (req, res) => {
   var cdapikey = req.query.apikey;
   try {
   if(!cdapikey) return res.json(resposta.semkey)
  	if(cdapikey !== key) return res.sendFile(keyinvalida)
   json = JSON.parse(fs.readFileSync('lib/nsfwlolis.json').toString())
   random = json[Math.floor(Math.random() * json.length)]
   res.type('png')
   res.send(await getBuffer(random))
   } catch (e) {
   res.send(resposta.error)
   }
   })
   router.all('/nsfw/miakhalifa', async (req, res) => {
    var cdapikey = req.query.apikey;
    try {
    if(!cdapikey) return res.json(resposta.semkey)
     if(cdapikey !== key) return res.sendFile(keyinvalida)
    json = JSON.parse(fs.readFileSync('lib/nsfwmia.json').toString())
    random = json[Math.floor(Math.random() * json.length)]
    res.type('png')
    res.send(await getBuffer(random))
    } catch (e) {
    res.send(resposta.error)
    }
    })
    router.all('/nsfw/elisa-sanches', async (req, res) => {
      var cdapikey = req.query.apikey;
      try {
      if(!cdapikey) return res.json(resposta.semkey)
       if(cdapikey !== key) return res.sendFile(keyinvalida)
      json = JSON.parse(fs.readFileSync('lib/nsfwelisa.json').toString())
      random = json[Math.floor(Math.random() * json.length)]
      res.type('png')
      res.send(await getBuffer(random))
      } catch (e) {
      res.send(resposta.error)
      }
      })
   router.all('*', async (req, res) => {
   res.status(404).json({
            status:404,
            error: 'A página que você está procurando não foi encontrada',
            endpoint: req.path
        })
})
  

module.exports = router
