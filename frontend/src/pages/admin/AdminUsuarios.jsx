import { useState, useEffect } from 'react'
import { useUsuariosService } from '../../services/usuarios.service'

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const { getUsuarios, updateRol } = useUsuariosService()

    useEffect(() => {
        getUsuarios()
            .then(data => setUsuarios(data))
            .catch(err => console.error(err))
    }, [])

    const handleRolChange = (id, nuevoRol) => {
        updateRol(id, nuevoRol)
            .then(usuarioActualizado => {
                setUsuarios(prev => prev.map(u => u._id === id ? usuarioActualizado : u))
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            <h1 className="fs-2 fw-bold text-white mb-4">Usuarios</h1>
            <div className="bg-dark p-3 rounded">
                <table className="table table-dark table-striped align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Rol actual</th>
                            <th>Cambiar rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(u => (
                            <tr key={u._id}>
                                <td>{u.email}</td>
                                <td><span className="badge bg-secondary">{u.rol || 'normal'}</span></td>
                                <td>
                                    <select
                                        className="form-select form-select-sm select-rol"
                                        value={u.rol || 'normal'}
                                        onChange={e => handleRolChange(u._id, e.target.value)}
                                    >
                                        <option value="normal">normal</option>
                                        <option value="admin">admin</option>
                                        <option value="superadmin">superadmin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminUsuarios