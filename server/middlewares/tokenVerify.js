import jwt, { decode } from 'jsonwebtoken'

const tokenVerify = (req, res, next) => {
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
            error: 'token is missing or invalid'
        })
    }

    next()
}

export default tokenVerify
