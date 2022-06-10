import jwt from 'jsonwebtoken'

import { connection } from '../database/db.js'

//Verifica la auth
const tokenVerify = async (req, res, next) => {
    const authorization = req.get('authorization')
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodeToken = {}
    try {
        decodeToken = jwt.verify(token, process.env.SECRET)
    } catch (e) {}

    if (!token || !decodeToken.id) {
        return res.status(401).json({
            error: 'Falta el token o es invalido'
        })
    }

    //Ademas verifica que no haya otro registro igual

    const { Symbol, userId } = req.body

    connection.query(`SELECT * FROM symbols`, (err, rows) => {
        const symbols = JSON.parse(JSON.stringify(rows))
        const symbol = symbols.find(symbol => {
            return symbol.Symbol === Symbol && symbol.userId === userId
        })

        if (symbol) {
            return res.status(400).json({
                error: 'Este simbolo ya existe'
            })
        }
        next()
    })
}

export default tokenVerify
