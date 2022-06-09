import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_DATABASE = process.env.DB_DATABASE

export default {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_DATABASE
}
