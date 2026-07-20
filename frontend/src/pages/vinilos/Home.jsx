import { Link, useParams } from 'react-router-dom'
import { useVinilos } from '../../hooks/useVinilos'

const Home = () => {
    const { genero } = useParams()
    const { vinilos, loading, error } = useVinilos()

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border"></div></div>
    if (error) return <div className="container mt-5 alert alert-danger">No se pudieron cargar los vinilos.</div>

    const vinilosFiltrados = genero
        ? vinilos.filter(v => {
            const generos = Array.isArray(v.generos) ? v.generos : [v.generos]
            return generos.map(g => g.toLowerCase()).includes(genero.toLowerCase())
        })
        : vinilos.slice(0, 4)

    const renderVinilo = (vinilo) => {
        const portada = vinilo.portada?.startsWith('http')
            ? vinilo.portada
            : `${import.meta.env.VITE_API_URL}/img/${vinilo.portada}`
        const fotoArtista = !vinilo.foto_artista
            ? null
            : vinilo.foto_artista.startsWith('http')
                ? vinilo.foto_artista
                : `${import.meta.env.VITE_API_URL}/img/${vinilo.foto_artista}`

        return (
            <div key={vinilo._id} className="mb-4 col-12 col-sm-6 col-lg-4 col-xl-3">
                <div className="text-center bg-black p-2">
                    <div className="image-container">
                        <img className="img-fluid" src={portada} alt={vinilo.titulo} />
                        {fotoArtista && (
                            <img className="img-fluid hover-image" src={fotoArtista} alt={vinilo.artista} />
                        )}
                    </div>
                    <div className="flex-column">
                        <h3 className="mt-2 mb-1 fs-2 fw-bold text-uppercase bs-purpura">{vinilo.artista}</h3>
                        <h4 className="fs-5 mb-2">{vinilo.titulo}</h4>
                        <ul className="px-1 list-unstyled">
                            <li><p className="descripcion-tarjeta px-3 fs-6 text-start">{vinilo.descripcion}</p></li>
                            <li><p className="fs-6 text-start"><strong>Género:</strong> {Array.isArray(vinilo.generos) ? vinilo.generos.join(', ') : vinilo.generos}</p></li>
                            <li><p className="fs-6 text-start"><strong>Lanzamiento:</strong> {vinilo.lanzamiento}</p></li>
                            <li><p className="fs-6 text-start"><strong>País:</strong> {vinilo.pais}</p></li>
                            <li><p className="fs-4 fw-bold">${vinilo.precio}</p></li>
                            <li className="mt-2">
                                <Link to={`/vinilos/${vinilo._id}`} className="fs-6 fw-bold text-white text-uppercase btn btn-dark w-100">Ver</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {!genero && (
                <>
                    <section className="container-xxl my-4 px-3">
                        <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Bienvenidos a Vinyl Vibes!!</h2>
                        <div className="mb-3 p-4 fs-4">
                            <p>Fundada por apasionados de la música electrónica, nuestra tienda se dedica a ofrecer una selección curada de vinilos que capturan la esencia y la energía del techno.</p>
                            <p>Creemos en la filosofía de que la música es más que un entretenimiento; es una experiencia que conecta a las personas, despierta emociones y crea recuerdos duraderos.</p>
                        </div>
                    </section>

                    <section className="container-xxl my-4 px-3">
                        <div className="bg-dark p-4">
                            <h2 className="mb-3 fs-2 p-1 text-center fw-bold">Explorar por Género</h2>
                            <div className="row row-cols-1 row-cols-md-5 g-4 mt-2">
                                {['techno', 'progressive', 'minimal', 'house', 'trance'].map(g => (
                                    <div key={g} className="col text-center">
                                        <Link to={`/genero/${g}`} className="btn btn-admin w-100 fs-5 py-4 text-uppercase">{g}</Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="container-xxl my-4 px-3">
                        <div className="bg-dark p-4">
                            <h2 className="mb-3 fs-2 p-1 text-center fw-bold">Vinilos Destacados</h2>
                            <div className="row pt-2">
                                {vinilosFiltrados.map(renderVinilo)}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {genero && (
                <section className="container-xxl my-4 px-0">
                    <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">{genero}</h2>
                    <div className="mx-3 px-2 pt-4 bg-dark row">
                        {vinilosFiltrados.map(renderVinilo)}
                    </div>
                </section>
            )}
        </>
    )
}

export default Home
