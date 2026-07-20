// MAIN.JS - Punto de entrada de la aplicacion
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import vinilosApiRoutes from './api/routes/vinilos.routes.js'
import artistasApiRoutes from './api/routes/artistas.routes.js'
import usuariosApiRoutes from './api/routes/usuarios.routes.js'

const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/img', express.static('public/img'))

// RUTAS DE LA API
app.use('/api', vinilosApiRoutes)
app.use('/api', artistasApiRoutes)
app.use('/api/usuarios', usuariosApiRoutes)

// ARRANCAR EL SERVIDOR
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`))
