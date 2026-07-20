import { Outlet, Link, NavLink } from 'react-router-dom'
import { useEmail, useRol } from '../contexts/Session.context'

const AdminLayout = () => {
    const email = useEmail()
    const rol = useRol()

    return (
        <div className="d-flex admin-wrapper">
            {/* Menú lateral */}
            <aside className="text-white p-3 d-flex flex-column admin-sidebar">
                <h2 className="fs-4 fw-bold text-uppercase bs-purpura mb-1">Vinyl Vibes</h2>
                <p className="small mb-4 admin-muted">Panel de administración</p>

                <nav className="d-flex flex-column">
                    <NavLink end to="/admin" className="admin-link">Dashboard</NavLink>
                    <NavLink to="/admin/vinilos" className="admin-link">Vinilos</NavLink>
                    <NavLink to="/admin/artistas" className="admin-link">Artistas</NavLink>
                    {rol === 'superadmin' && <NavLink to="/admin/usuarios" className="admin-link">Usuarios</NavLink>}
                </nav>

                <div className="mt-auto pt-4">
                    <p className="small mb-2 admin-muted">{email}</p>
                    <Link to="/" className="btn btn-outline-light btn-sm w-100 mb-2">Ver sitio público</Link>
                    <Link to="/logout" className="btn btn-danger btn-sm w-100">Salir</Link>
                </div>
            </aside>

            {/* Contenido */}
            <main className="flex-fill p-4 admin-content">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
