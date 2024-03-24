const axios = require("axios")
const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors({
    origin: ['http://192.168.0.166:5500', 'https://xavitinho.com', 'https://xavitinho.github.io']
}))

app.listen(process.env.PORT)
app.get("/", (request, response) => txt(request, response))

async function txt(request, response) {
  if (request.query.url) {
    const d = new Date()
    d.setHours(d.getHours() - 3)
    console.log(`${d.getUTCHours()}h${d.getUTCMinutes()}min: ${request.query.url}`)
    axios.get(request.query.url).then((html) => { 
      response.json(html.data) 
      console.log(html.data)
    })
      .catch(erro => response.json({ erro }))
  } else response.json({ erro: "nenhuma url especificada" })
}

