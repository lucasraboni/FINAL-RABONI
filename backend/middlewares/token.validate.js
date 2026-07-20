import jwt from 'jsonwebtoken'

export function validateToken(req, res, next) {
    try {
        const auth = req.headers.authorization
        if (!auth) return res.status(401).json({ message: 'Token requerido' })

        const [bearer, token] = auth.split(' ')
        if (bearer !== 'Bearer' || !token) return res.status(401).json({ message: 'Token inválido' })

        const usuario = jwt.verify(token, process.env.SECRET_PASSWORD)
        req.usuario = usuario
        next()
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' })
    }
}