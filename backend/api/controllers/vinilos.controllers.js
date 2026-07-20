// API CONTROLLER DE VINILOS
import * as service from '../../services/vinilos.services.js'

// GET - traer todos
export function getVinilos(req, res) {
    const filter = req.query
    return service.getVinilos(filter)
        .then(vinilos => res.status(200).json(vinilos))
        .catch(err => res.status(500).json({ message: 'No se pueden obtener los vinilos' }))
}

// GET - traer uno por ID
export function getViniloPorId(req, res) {
    const id = req.params.id
    return service.getViniloPorId(id)
        .then(vinilo => {
            if (!vinilo) return res.status(404).json({ message: 'Vinilo no encontrado' })
            res.status(200).json(vinilo)
        })
        .catch(err => res.status(500).json({ message: 'Error interno del servidor' }))
}

// POST - crear un vinilo
export function crearVinilo(req, res) {
    const { titulo, artista, descripcion, precio, link, portada, foto_artista, generos, pais, lanzamiento, artista_id } = req.body
    const vinilo = { titulo, artista, descripcion, precio: parseFloat(precio), link, portada, foto_artista, generos, pais, lanzamiento, artista_id }
    return service.crearVinilo(vinilo)
        .then(vinilo => res.status(201).json(vinilo))
        .catch(err => res.status(500).json({ message: 'Error al crear el vinilo' }))
}

// PATCH - editar un vinilo
export async function editarVinilo(req, res) {
    const id = req.params.id
    const viniloActual = await service.getViniloPorId(id)
    if (!viniloActual) return res.status(404).json({ message: 'Vinilo no encontrado' })

    const datos = {
        titulo: req.body?.titulo ?? viniloActual.titulo,
        descripcion: req.body?.descripcion ?? viniloActual.descripcion,
        precio: req.body?.precio ? parseFloat(req.body.precio) : viniloActual.precio,
        link: req.body?.link ?? viniloActual.link,
        portada: req.body?.portada ?? viniloActual.portada,
        foto_artista: req.body?.foto_artista ?? viniloActual.foto_artista,
        generos: req.body?.generos ?? viniloActual.generos,
        pais: req.body?.pais ?? viniloActual.pais,
        lanzamiento: req.body?.lanzamiento ?? viniloActual.lanzamiento,
    }

    return service.editarVinilo(id, datos)
        .then(vinilo => res.status(200).json(vinilo))
        .catch(err => res.status(500).json({ message: 'Error al editar el vinilo' }))
}

// DELETE - borrar un vinilo
export function borrarVinilo(req, res) {
    const id = req.params.id
    return service.borrarVinilo(id)
        .then(id => res.status(200).json({ message: 'Vinilo eliminado', id }))
        .catch(err => res.status(500).json({ message: 'Error al borrar el vinilo' }))
}
