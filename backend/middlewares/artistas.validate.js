import { artistaSchema } from '../schemas/artistas.schema.js'

export function validateArtista(req, res, next) {
    artistaSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}
