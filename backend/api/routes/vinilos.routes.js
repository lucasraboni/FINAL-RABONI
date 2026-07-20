import express from 'express'
import * as controllers from '../controllers/vinilos.controllers.js'
import { validateToken } from '../../middlewares/token.validate.js'
import { validateVinilo } from '../../middlewares/vinilos.validate.js'

const router = express.Router()

router.get('/vinilos', controllers.getVinilos)
router.get('/vinilos/:id', controllers.getViniloPorId)
router.post('/vinilos', [validateToken, validateVinilo], controllers.crearVinilo)
router.patch('/vinilos/:id', [validateToken, validateVinilo], controllers.editarVinilo)
router.delete('/vinilos/:id', [validateToken], controllers.borrarVinilo)

export default router