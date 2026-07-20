import { Link } from 'react-router-dom'
import { useEmail, useRol } from '../contexts/Session.context'

const NavBar = () => {
    const email = useEmail()
    const rol = useRol()
    const puedeABM = rol === 'admin' || rol === 'superadmin'

    return (
        <header className="container-fluid py-2 navbar-vinyl">
            <div className="container-xxl px-3 d-flex flex-column flex-md-row justify-content-md-between align-items-center">
                <h1 className="fs-1 text-black fw-bold text-uppercase mb-0">Vinyl Vibes</h1>
                <img className="d-none d-md-block m-2 logo-vinyl" src={`${import.meta.env.VITE_API_URL}/img/logo-vinyl.png`} alt="logo" />
            </div>
            <nav className="navbar navbar-expand-lg text-uppercase navbar-vinyl">
                <div className="container-xxl px-3">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/artistas">Artistas</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/catalogo">Catálogo</Link></li>
                            {puedeABM && <li className="nav-item"><Link className="nav-link fw-bold" to="/admin">Panel Admin</Link></li>}
                        </ul>
                        <ul className="navbar-nav">
                            {!email && <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Iniciar Sesión</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/register">Registrarse</Link></li>
                            </>}
                            {email && <>
                                <li className="nav-item"><span className="nav-link text-muted">{email}</span></li>
                                <li className="nav-item"><Link className="nav-link" to="/logout">Salir</Link></li>
                            </>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar
