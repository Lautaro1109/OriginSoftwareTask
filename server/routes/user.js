import { Router } from 'express'

import { connection } from '../database/db.js'

import bcrypt from 'bcrypt'

const routes = Router()

routes.post('/', async (req, res) => {
    try {
        const { body } = req
        const { username, name, password } = body

        const passwordHash = await bcrypt.hash(password, 10)

        connection.query(
            ' INSERT INTO users (User, Name, Password) VALUES (?, ?, ?)',
            [username, name, passwordHash],
            (err, result) => {
                res.status(201).json({
                    message: 'Usuario creado correctamente'
                })
            }
        )
    } catch (e) {
        res.status(400).json(e.message)
    }
})

export default routes
