require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('../src/routes')
const cors = require('cors')

mongoose.connect(process.env.MONGO_URL_CONNECTION)
  .then(() =>{
    console.log('Banco carregado')
    app.emit('pronto')
  })
  .catch(e => console.log(e))


app.use(cors())
app.use(express.json())
app.use(routes)

app.on('pronto', () =>{
    app.listen(process.env.PORT, () =>{
        console.log('Server is running...')
    })
})