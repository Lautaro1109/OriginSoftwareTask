import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import config from './core/config.js'

import routes from './routes/routes.js'

const app = express()

//Procesamiento de datos
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
//Rutas
app.use('/', routes)

app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config.PORT}`)
})
