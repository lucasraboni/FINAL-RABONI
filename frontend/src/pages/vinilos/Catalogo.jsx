import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useVinilos } from '../../hooks/useVinilos'

const GENEROS = ['techno', 'progressive', 'minimal', 'house', 'trance']

const Catalogo = () => {
    const { vinilos, loading, error } = useVinilos()
    const [generoActivo, setGeneroActivo] = useState('todos')

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border"></div></div>
    if (error) return <div className="container mt-5 alert alert-danger">No se pudieron cargar los vinilos.</div>

    const vinilosFiltrados = generoActivo === 'todos'
        ? vinilos
        : vinilos.filter(v => {
            const generos = Array.isArray(v.generos) ? v.generos : [v.generos]
            return generos.map(g => g.toLowerCase()).includes(generoActivo)
        })

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
            <div key={vinilo._id} className="mb-4 col-12 col-sm-6 col-xl-4">
                <div className="text-center bg-black p-2">
                    <div className="image-container">
                        <img className="img-fluid" src={portada} alt={vinilo.titulo} />
                        {fotoArtista && (
                            <img className="img-fluid hover-image" src={fotoArtista} alt={vinilo.artista} />
                        )}
                    </div>
                    <div className="flex-column">
                        <h3 className="mt-2 mb-1 fs-3 fw-bold text-uppercase bs-purpura">{vinilo.artista}</h3>
                        <h4 className="fs-6 mb-2">{vinilo.titulo}</h4>
                        <p className="fs-5 fw-bold">${vinilo.precio}</p>
                        <Link to={`/vinilos/${vinilo._id}`} className="fs-6 fw-bold text-white text-uppercase btn btn-dark w-100">Ver</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Catálogo Completo</h2>
            <div className="row">
                <aside className="col-12 col-md-3 mb-4">
                    <div className="bg-dark p-3">
                        <h3 className="fs-5 fw-bold text-uppercase bs-purpura mb-3">Géneros</h3>
                        <div className="d-flex flex-column gap-2">
                            <button
                                onClick={() => setGeneroActivo('todos')}
                                className={`btn text-uppercase ${generoActivo === 'todos' ? 'btn-admin' : 'btn-outline-light'}`}
                            >
                                Todos
                            </button>
                            {GENEROS.map(g => (
                                <button
                                    key={g}
                                    onClick={() => setGeneroActivo(g)}
                                    className={`btn text-uppercase ${generoActivo === g ? 'btn-admin' : 'btn-outline-light'}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <div className="col-12 col-md-9">
                    {vinilosFiltrados.length === 0
                        ? <p className="fs-4 text-center">No hay vinilos en este género.</p>
                        : <div className="row">{vinilosFiltrados.map(renderVinilo)}</div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Catalogo