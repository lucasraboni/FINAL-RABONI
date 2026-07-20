import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useArtistasService } from '../../services/artistas.service'

const BorrarArtista = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [artista, setArtista] = useState(null)
    const { getArtistaPorId, borrarArtista } = useArtistasService()

    useEffect(() => {
        getArtistaPorId(id)
            .then(data => setArtista(data))
            .catch(err => console.error(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        borrarArtista(id)
            .then(() => navigate('/admin/artistas'))
            .catch(err => console.error(err))
    }

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Borrar Artista</h2>
            <div className="p-4 bg-dark text-center">
                {artista && <>
                    <img src={`${import.meta.env.VITE_API_URL}/img/${artista.foto}`} className="mb-4 img-borrar" />
                    <h3 className="bs-purpura">{artista.nombre}</h3>
                    <p className="fs-5">¿Estás seguro que querés borrar este artista?</p>
                </>}
                <form onSubmit={handleSubmit}>
                    <button type="submit" className="btn btn-danger fs-5 fw-bold text-uppercase me-2">Sí, borrar</button>
                    <Link to="/admin/artistas" className="btn btn-dark fs-5 fw-bold text-uppercase">Cancelar</Link>
                </form>
            </div>
        </section>
    )
}

export default BorrarArtista