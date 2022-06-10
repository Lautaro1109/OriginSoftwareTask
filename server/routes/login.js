import { Router } from 'express'

import { connection } from '../database/db.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const routes = Router()

routes.post('/', async (req, res) => {
    const { body } = req
    const { username, password } = body

    await connection.query(
        ' SELECT * FROM users WHERE User = ?',
        [username],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error al realizar la consulta'
                })
            }
            if (result.length === 0) {
                return res.status(404).json({
                    message: 'Usuario no encontrado'
                })
            }
            const userData = result[0]
            const passwordCorrect = bcrypt.compareSync(
                password,
                userData.Password
            )

            if (!(userData && passwordCorrect)) {
                return res.status(401).json({
                    error: 'invalid user or password'
                })
            }

            const userForToken = {
                id: userData.Id,
                username: userData.User
            }

            const token = jwt.sign(userForToken, process.env.SECRET)

            res.send({
                name: userData.Name,
                username: userData.User,
                token,
                id: userData.Id
            })
        }
    )
})

export default routes
