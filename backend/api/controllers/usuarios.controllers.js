import * as service from '../../services/usuarios.services.js'

export function createUser(req, res) {
    service.createUser(req.body)
        .then(usuario => res.status(201).json(usuario))
        .catch(err => res.status(400).json({ message: err.message }))
}

export function login(req, res) {
    service.login(req.body)
        .then(usuario => res.status(200).json(usuario))
        .catch(() => res.status(400).json({ message: 'Usuario o contraseña incorrectos' }))
}

export function getUsuarios(req, res) {
    service.getUsuarios()
        .then(usuarios => res.status(200).json(usuarios))
        .catch(() => res.status(500).json({ message: 'Error al obtener usuarios' }))
}

export function updateRol(req, res) {
    service.updateRol(req.params.id, req.body.rol)
        .then(usuario => res.status(200).json(usuario))
        .catch(() => res.status(500).json({ message: 'Error al actualizar rol' }))
}