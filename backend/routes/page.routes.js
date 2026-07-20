// RUTAS DE PAGINAS
import express from 'express'
import * as controllers from '../controllers/page.controllers.js'

const router = express.Router()

router.post('/contacto', controllers.contactoEnviar)

// ABM DE VINILOS
router.get('/vinilos/agregar', controllers.agregarForm)       // Muestra el formulario de agregar
router.post('/vinilos/agregar', controllers.agregarVinilo)    // Recibe y guarda el formulario
router.get('/vinilos/editar/:id', controllers.editarForm)     // Muestra el formulario de editar
router.post('/vinilos/editar/:id', controllers.editarVinilo)  // Recibe y guarda el formulario
router.get('/vinilos/borrar/:id', controllers.borrarForm)     // Muestra confirmacion de borrado
router.post('/vinilos/borrar/:id', controllers.borrarVinilo)  // Confirma y borra

// ABM DE ARTISTAS
router.get('/artistas/agregar', controllers.agregarArtistaForm)
router.post('/artistas/agregar', controllers.agregarArtista)

// PAGINAS DINAMICAS
router.get('/genero/:genero', controllers.genero)   // Catalogo por genero
router.get('/vinilo/:id', controllers.detalle)    // Detalle de un vinilo

export default router
