// PAGE CONTROLLER
import * as vinilosService from '../services/vinilos.services.js'
import * as artistasService from '../services/artistas.services.js'
import * as views from '../views/page.views.js'

// CONTACTO
export function contactoEnviar(req, res) {
    res.send(views.createGraciasPage())
}

// GENERO
export function genero(req, res) {
    const genero = req.params.genero
    vinilosService.getVinilos({ genero: genero })
        .then(vinilos => res.send(views.createGeneroPage(genero, vinilos)))
        .catch(err => res.send(views.create404Page()))
}

// DETALLE
export function detalle(req, res) {
    const id = req.params.id
    vinilosService.getViniloPorId(id)
        .then(vinilo => {
            if (!vinilo) return res.status(404).send(views.create404Page())
            res.send(views.createViniloPage(vinilo))
        })
        .catch(err => res.send(views.create404Page()))
}

// AGREGAR VINILO
export function agregarForm(req, res) {
    artistasService.getArtistas()
        .then(artistas => res.send(views.createViniloForm(artistas)))
        .catch(err => res.send('No se pudo cargar el formulario'))
}

// AGREGAR VINILO
export function agregarVinilo(req, res) {
    const { titulo, artista, descripcion, precio, link, portada, genero, pais, lanzamiento } = req.body
    artistasService.getArtistas()
        .then(artistas => {
            const artistaObj = artistas.find(a => a.nombre === artista)
            const foto_artista = artistaObj ? artistaObj.foto : ''
            const vinilo = { titulo, artista, descripcion, precio: parseFloat(precio), link, portada, foto_artista, generos: [genero], pais, lanzamiento }
            return vinilosService.crearVinilo(vinilo)
        })
        .then(v => res.send(views.createViniloPage(v)))
        .catch(err => res.send('No se pudo guardar el vinilo'))
}

// EDITAR VINILO
export function editarForm(req, res) {
    const id = req.params.id
    vinilosService.getViniloPorId(id)
        .then(vinilo => {
            if (!vinilo) return res.status(404).send(views.create404Page())
            artistasService.getArtistas()
                .then(artistas => res.send(views.editViniloForm(vinilo, artistas)))
                .catch(err => res.send('No se pudo cargar el formulario'))
        })
        .catch(err => res.send(views.create404Page()))
}

// EDITAR VINILO
export function editarVinilo(req, res) {
    const id = req.params.id
    const { titulo, artista, descripcion, precio, link, portada, foto_artista, genero, pais, lanzamiento } = req.body
    const datos = { titulo, artista, descripcion, precio: parseFloat(precio), link, portada, foto_artista, generos: [genero], pais, lanzamiento }
    vinilosService.editarVinilo(id, datos)
        .then(() => res.redirect(`/vinilo/${id}`))
        .catch(err => res.send('No se pudo editar el vinilo'))
}

// BORRAR VINILO
export function borrarForm(req, res) {
    const id = req.params.id
    vinilosService.getViniloPorId(id)
        .then(vinilo => {
            if (!vinilo) return res.status(404).send(views.create404Page())
            res.send(views.deleteViniloForm(vinilo))
        })
        .catch(err => res.send(views.create404Page()))
}

// BORRAR VINILO
export function borrarVinilo(req, res) {
    const id = req.params.id
    vinilosService.borrarVinilo(id)
        .then(() => res.redirect('/'))
        .catch(err => res.send('No se pudo borrar el vinilo'))
}

// AGREGAR ARTISTA
export function agregarArtistaForm(req, res) {
    res.send(views.createArtistaForm())
}

// AGREGAR ARTISTA
export function agregarArtista(req, res) {
    const { nombre, foto, descripcion } = req.body
    artistasService.crearArtista({ nombre, foto, descripcion })
        .then(() => res.send(views.createArtistaForm(true)))
        .catch(err => res.send('No se pudo guardar el artista'))
}
