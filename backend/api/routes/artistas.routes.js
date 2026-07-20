import express from 'express'
import * as controllers from '../controllers/artistas.controllers.js'
import { validateToken } from '../../middlewares/token.validate.js'
import { validateArtista } from '../../middlewares/artistas.validate.js'

const router = express.Router()

router.get('/artistas', controllers.getArtistas)
router.get('/artistas/:id', controllers.getArtistaPorId)
router.get('/artistas/:id/vinilos', controllers.getVinilosPorArtista)
router.post('/artistas', [validateToken, validateArtista], controllers.crearArtista)
router.patch('/artistas/:id', [validateToken, validateArtista], controllers.editarArtista)
router.delete('/artistas/:id', [validateToken], controllers.borrarArtista)

export default router