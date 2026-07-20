import { viniloSchema } from '../schemas/vinilos.schema.js'

export function validateVinilo(req, res, next) {
    viniloSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}
