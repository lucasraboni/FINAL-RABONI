import { Navigate } from 'react-router-dom'
import { useRol } from '../contexts/Session.context'

const AdminRoute = ({ element }) => {
    const rol = useRol()
    if (rol === 'admin' || rol === 'superadmin') return element
    return <Navigate to="/login" />
}

export default AdminRoute