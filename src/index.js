const express = require('express')
const cors = require('cors')
// const puppeteer = require('puppeteer')
const app = express()
const port = 3335
const axios = require('axios')
const cheerio = require('cheerio')

// Allow all applications front end to aceess, you should put website cors({origin: 'http://example.com'}) in prod
app.use(cors())

app.get('/', (req, res) => {
  return res.json({ message: '😍 Endpoints are working!! YEAH' })
})


app.get('/b3', (req, res) => {

  axios('https://www.infomoney.com.br/cotacoes/ibovespa/').then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const value = $('.value > p').text();
    const percentage = $('.percentage > p').text().match(/\S+/gi).toString();

    return res.json({
      ibovespa: {
      cotacao: value,
      porcentagem: percentage,
      },
      ITSA4: {
        cotacao: value,
        porcentagem: percentage,
      }
    })
  }).catch(console.error);

})

app.listen(port, () => {
  console.log(`😍 Back-end started at http://localhost:${port}`)
})