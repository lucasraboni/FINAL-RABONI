import { Link } from 'react-router-dom'
import { useArtistas } from '../../hooks/useArtistas'

const AdminArtistas = () => {
    const { artistas, loading, error } = useArtistas()

    if (loading) return <div className="spinner-border text-light"></div>
    if (error) return <div className="alert alert-danger">No se pudieron cargar los artistas.</div>

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-2 fw-bold text-white mb-0">Artistas</h1>
                <Link to="/admin/artistas/nuevo" className="btn btn-admin">+ Nuevo Artista</Link>
            </div>
            <div className="bg-dark p-3 rounded">
                <table className="table table-dark table-striped align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artistas?.map(a => {
                            const foto = a.foto?.startsWith('http') ? a.foto : `${import.meta.env.VITE_API_URL}/img/${a.foto}`
                            return (
                                <tr key={a._id}>
                                    <td><img src={foto} alt={a.nombre} className="img-tabla" /></td>
                                    <td>{a.nombre}</td>
                                    <td className="td-descripcion">{a.descripcion}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link to={`/admin/artistas/${a._id}/editar`} className="btn btn-admin btn-sm">Editar</Link>
                                            <Link to={`/admin/artistas/${a._id}/borrar`} className="btn btn-danger btn-sm">Borrar</Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminArtistas