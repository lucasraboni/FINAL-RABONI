import { MongoClient, ObjectId } from 'mongodb'
import { createToken } from './token.service.js'
import bcrypt from 'bcryptjs'

const client = new MongoClient(process.env.MONGO_URI)
const db = client.db(process.env.MONGO_DB)

export async function createUser(usuario) {
    await client.connect()
    const existe = await db.collection('usuarios').findOne({ email: usuario.email })
    if (existe) throw new Error('El email ya está registrado')
    usuario.password = await bcrypt.hash(usuario.password, 11)
    const nuevoUsuario = { ...usuario, passwordConfirm: undefined, rol: 'normal' }
    await db.collection('usuarios').insertOne(nuevoUsuario)
    return { email: nuevoUsuario.email, rol: nuevoUsuario.rol }
}

export async function login(credenciales) {
    await client.connect()
    const usuario = await db.collection('usuarios').findOne({ email: credenciales.email })
    if (!usuario) throw new Error('Usuario o contraseña incorrectos')
    const esValido = await bcrypt.compare(credenciales.password, usuario.password)
    if (!esValido) throw new Error('Usuario o contraseña incorrectos')
    const token = createToken({ email: usuario.email, rol: usuario.rol })
    return { email: usuario.email, rol: usuario.rol, token }
}

export async function getUsuarios() {
    await client.connect()
    return db.collection('usuarios').find({}, { projection: { password: 0 } }).toArray()
}

export async function updateRol(id, rol) {
    await client.connect()
    await db.collection('usuarios').updateOne({ _id: new ObjectId(id) }, { $set: { rol } })
    return db.collection('usuarios').findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
}