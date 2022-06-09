import mysql from 'mysql'

import config from '../core/config.js'

export const connection = mysql.createConnection({
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_DATABASE
})

connection.connect(err => {
    if (err) console.log(err)

    console.log('Conexión a la base de datos establecida')
})
