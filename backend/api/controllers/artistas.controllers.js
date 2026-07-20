import * as service from '../../services/artistas.services.js'
import * as vinilosService from '../../services/vinilos.services.js'

export function getArtistas(req, res) {
    service.getArtistas()
        .then(artistas => res.status(200).json(artistas))
        .catch(() => res.status(500).json({ message: 'No se pueden obtener los artistas' }))
}

export function getArtistaPorId(req, res) {
    service.getArtistaPorId(req.params.id)
        .then(artista => artista ? res.status(200).json(artista) : res.status(404).json({ message: 'Artista no encontrado' }))
        .catch(() => res.status(500).json({ message: 'Error al obtener el artista' }))
}

export function crearArtista(req, res) {
    const { nombre, foto, descripcion } = req.body
    service.crearArtista({ nombre, foto, descripcion })
        .then(artista => res.status(201).json(artista))
        .catch(() => res.status(500).json({ message: 'Error al crear el artista' }))
}

export function editarArtista(req, res) {
    service.editarArtista(req.params.id, req.body)
        .then(artista => res.status(200).json(artista))
        .catch(() => res.status(500).json({ message: 'Error al editar el artista' }))
}

export function borrarArtista(req, res) {
    service.borrarArtista(req.params.id)
        .then(() => res.status(200).json({ message: 'Artista eliminado' }))
        .catch(() => res.status(500).json({ message: 'Error al borrar el artista' }))
}

export function getVinilosPorArtista(req, res) {
    vinilosService.getVinilosPorArtista(req.params.id)
        .then(vinilos => res.status(200).json(vinilos))
        .catch(() => res.status(500).json({ message: 'Error al obtener vinilos del artista' }))
}
