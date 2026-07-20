// SERVICE DE VINILOS
import { MongoClient, ObjectId } from 'mongodb'

// Conexion a MongoDB Atlas
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db(process.env.MONGO_DB)

// Helper para acceder a la coleccion
const collection = () => db.collection('vinilos')

// GET TODOS LOS VINILOS (con filtros opcionales)
export async function getVinilos(filter = {}) {
    try {
        await client.connect()
        const query = { borrado: { $ne: true } }

        if (filter?.genero) query.generos = filter.genero

        if (filter?.precio_max) query.precio = { $lte: parseInt(filter.precio_max) }

        return collection().find(query).toArray()
    } catch (error) {
        return []
    }
}

// GET UN VINILO POR ID
export async function getViniloPorId(id) {
    try {
        await client.connect()
        return collection().findOne({ _id: new ObjectId(id), borrado: { $ne: true } })
    } catch (error) {
        return null
    }
}

// GET TODOS LOS VINILOS DE UN ARTISTA
export async function getVinilosPorArtista(artista_id) {
    try {
        await client.connect()
        return collection().find({ artista_id: new ObjectId(artista_id), borrado: { $ne: true } }).toArray()
    } catch (error) {
        return []
    }
}

// CREAR UN VINILO
export async function crearVinilo(vinilo) {
    try {
        await client.connect()
        if (vinilo.artista_id) vinilo.artista_id = new ObjectId(vinilo.artista_id)
        const resultado = await collection().insertOne(vinilo)
        return { _id: resultado.insertedId, ...vinilo }
    } catch (error) {
        throw new Error(error)
    }
}

// EDITAR UN VINILO
export async function editarVinilo(id, datos) {
    try {
        await client.connect()
        if (datos.artista_id) datos.artista_id = new ObjectId(datos.artista_id)
        await collection().updateOne(
            { _id: new ObjectId(id) },
            { $set: datos }
        )
        return { _id: id, ...datos }
    } catch (error) {
        throw new Error(error)
    }
}

// BORRAR UN VINILO
export async function borrarVinilo(id) {
    try {
        await client.connect()
        await collection().updateOne(
            { _id: new ObjectId(id) },
            { $set: { borrado: true } }
        )
        return id
    } catch (error) {
        throw new Error(error)
    }
}
