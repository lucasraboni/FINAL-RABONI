import { Link, useParams } from 'react-router-dom'
import { useVinilo } from '../../hooks/useVinilos'

const Detalle = () => {
    const { id } = useParams()
    const { vinilo, loading, error } = useVinilo(id)

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border"></div></div>
    if (error || !vinilo) return <div className="container mt-5 alert alert-danger">Vinilo no encontrado.</div>

    const portada = vinilo.portada?.startsWith('http')
        ? vinilo.portada
        : `${import.meta.env.VITE_API_URL}/img/${vinilo.portada}`

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">{vinilo.titulo}</h2>
            <div className="row bg-dark p-4 mx-0">
                <div className="col-md-6 text-center">
                    <div className="detalle-portada">
                        <img src={portada} alt={vinilo.titulo} className="img-cover" />
                    </div>
                    <p className="fs-4 fw-bold mt-3">${vinilo.precio}</p>
                </div>
                <div className="col-md-6">
                    <h3 className="bs-purpura">{vinilo.artista}</h3>
                    <p className="fs-6"><strong>Género:</strong> {Array.isArray(vinilo.generos) ? vinilo.generos.join(', ') : vinilo.generos}</p>
                    <p><strong>País:</strong> {vinilo.pais}</p>
                    <p><strong>Lanzamiento:</strong> {vinilo.lanzamiento}</p>
                    <p className="mt-3">{vinilo.descripcion}</p>
                    <div className="mt-3 d-flex gap-2 flex-wrap">
                        {vinilo.link && <a href={vinilo.link} target="_blank" rel="noreferrer" className="btn btn-admin">Ver en Spotify</a>}
                        <Link to="/" className="btn btn-dark">Volver</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Detalle