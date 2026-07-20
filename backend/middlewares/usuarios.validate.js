import { loginSchema, registerSchema } from '../schemas/usuarios.schema.js'

export function validateLogin(req, res, next) {
    loginSchema.validate(req.body)
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}

export function validateRegister(req, res, next) {
    registerSchema.validate(req.body, { abortEarly: false })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}