import { Router } from 'express'

import { connection } from '../database/db.js'

const routes = Router()

routes.post('/symbols', (req, res) => {
    const { body } = req

    const { userId } = body

    connection.query(
        `SELECT * FROM symbols WHERE userId = ${userId}`,
        (err, rows) => {
            if (err) {
                res.status(500).send('Error')
            } else {
                res.json(rows)
            }
        }
    )
})

routes.post('/', async (req, res) => {
    const { body } = req
    const { Symbol, Name, Currency, userId } = body

    const insert = await connection.query(
        ' INSERT INTO symbols (Symbol, Name, Currency, userId) VALUES (?, ?, ?, ?)',
        [Symbol, Name, Currency, userId],
        (err, result) => {
            if (err) res.send(err)
        }
    )

    res.send(insert.values)
})

export default routes
