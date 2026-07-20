// SERVICE DE ARTISTAS
import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db(process.env.MONGO_DB)

// GET TODOS LOS ARTISTAS
export async function getArtistas() {
    await client.connect()
    return db.collection('artistas').find().toArray()
}

// GET UN ARTISTA POR ID
export async function getArtistaPorId(id) {
    await client.connect()
    return db.collection('artistas').findOne({ _id: new ObjectId(id) })
}

// CREAR UN ARTISTA
export async function crearArtista(artista) {
    await client.connect()
    const resultado = await db.collection('artistas').insertOne(artista)
    return { _id: resultado.insertedId, ...artista }
}

// EDITAR UN ARTISTA
export async function editarArtista(id, datos) {
    await client.connect()
    await db.collection('artistas').updateOne({ _id: new ObjectId(id) }, { $set: datos })
    return db.collection('artistas').findOne({ _id: new ObjectId(id) })
}

// BORRAR UN ARTISTA
export async function borrarArtista(id) {
    await client.connect()
    return db.collection('artistas').deleteOne({ _id: new ObjectId(id) })
}