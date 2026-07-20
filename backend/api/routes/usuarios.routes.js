import express from 'express'
import * as controllers from '../controllers/usuarios.controllers.js'
import { validateLogin, validateRegister } from '../../middlewares/usuarios.validate.js'
import { validateToken } from '../../middlewares/token.validate.js'

const router = express.Router()

router.post('/', [validateRegister], controllers.createUser)
router.post('/login', [validateLogin], controllers.login)
router.get('/', [validateToken], controllers.getUsuarios)
router.patch('/:id', [validateToken], controllers.updateRol)

export default router