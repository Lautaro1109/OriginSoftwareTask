import { Router } from 'express'

import { connection } from '../database/db.js'
import tokenVerify from '../middlewares/tokenVerify.js'

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

routes.post('/', tokenVerify, (req, res) => {
    const { body } = req

    const { Symbol, Name, Currency, userId } = body

    const inserted = connection.query(
        'INSERT INTO symbols (Symbol, Name, Currency, userId) VALUES (?, ?, ?, ?)',
        [Symbol, Name, Currency, userId],
        (err, result) => {}
    )

    res.status(200).json(inserted.values)
})

routes.delete('/:id', tokenVerify, (req, res) => {
    const { id } = req.params

    connection.query(
        'DELETE FROM symbols WHERE id = ?',
        [id],
        (err, result) => {}
    )

    res.send('Deleted')
})

export default routes
