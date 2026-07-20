import { useArtistas } from '../../hooks/useArtistas'

const Artistas = () => {
    const { artistas, loading, error } = useArtistas()

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border"></div></div>
    if (error) return <div className="container mt-5 alert alert-danger">No se pudieron cargar los artistas.</div>

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Artistas</h2>
            <div className="row bg-dark p-4 mx-0">
                {artistas?.map(artista => {
                    const foto = artista.foto?.startsWith('http')
                        ? artista.foto
                        : `${import.meta.env.VITE_API_URL}/img/${artista.foto}`
                    return (
                        <div key={artista._id} className="mb-4 col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
                            <div className="text-center bg-black p-2 h-100 d-flex flex-column justify-content-between">
                                <img src={foto} alt={artista.nombre} className="img-cuadrada" />
                                <h3 className="mt-2 fs-4 fw-bold text-uppercase bs-purpura">{artista.nombre}</h3>
                                <p className="fs-6 px-2 text-start">{artista.descripcion}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Artistas