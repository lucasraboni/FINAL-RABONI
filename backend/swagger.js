// Script para auto-generar la documentacion
import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        title: 'Vinyl Vibes API',
        description: 'API de tienda de vinilos de musica electronica - Parcial 1 Aplicaciones Hibridas'
    },
    host: 'localhost:3333',
    basePath: '/api',
    schemes: ['http']
}

const endpointsFiles = [
    './api/routes/vinilos.routes.js',
    './api/routes/artistas.routes.js'
]

const swagger = swaggerAutogen()
swagger('swagger.json', endpointsFiles, doc)
