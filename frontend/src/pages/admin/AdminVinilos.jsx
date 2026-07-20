import { Link } from 'react-router-dom'
import { useVinilos } from '../../hooks/useVinilos'

const AdminVinilos = () => {
    const { vinilos, loading, error } = useVinilos()

    if (loading) return <div className="spinner-border text-light"></div>
    if (error) return <div className="alert alert-danger">No se pudieron cargar los vinilos.</div>

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fs-2 fw-bold text-white mb-0">Vinilos</h1>
                <Link to="/admin/vinilos/nuevo" className="btn btn-admin">+ Nuevo Vinilo</Link>
            </div>
            <div className="bg-dark p-3 rounded">
                <table className="table table-dark table-striped align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Portada</th>
                            <th>Título</th>
                            <th>Artista</th>
                            <th>Género</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vinilos?.map(v => {
                            const portada = v.portada?.startsWith('http') ? v.portada : `${import.meta.env.VITE_API_URL}/img/${v.portada}`
                            return (
                                <tr key={v._id}>
                                    <td><img src={portada} alt={v.titulo} className="img-tabla" /></td>
                                    <td>{v.titulo}</td>
                                    <td>{v.artista}</td>
                                    <td>{Array.isArray(v.generos) ? v.generos.join(', ') : v.generos}</td>
                                    <td>${v.precio}</td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link to={`/admin/vinilos/${v._id}/editar`} className="btn btn-admin btn-sm">Editar</Link>
                                            <Link to={`/admin/vinilos/${v._id}/borrar`} className="btn btn-danger btn-sm">Borrar</Link>
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

export default AdminVinilos