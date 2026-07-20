import { Link } from 'react-router-dom'
import { useVinilos } from '../../hooks/useVinilos'
import { useArtistas } from '../../hooks/useArtistas'

const Dashboard = () => {
    const { vinilos } = useVinilos()
    const { artistas } = useArtistas()

    return (
        <>
            <h1 className="fs-2 fw-bold text-white mb-4">Dashboard</h1>
            <div className="row g-3">
                <div className="col-md-6">
                    <div className="bg-dark p-4 rounded text-center">
                        <p className="fs-1 fw-bold bs-purpura mb-0">{vinilos?.length ?? '...'}</p>
                        <p className="text-white mb-3">Vinilos</p>
                        <Link to="/admin/vinilos" className="btn btn-admin btn-sm">Gestionar</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-dark p-4 rounded text-center">
                        <p className="fs-1 fw-bold bs-purpura mb-0">{artistas?.length ?? '...'}</p>
                        <p className="text-white mb-3">Artistas</p>
                        <Link to="/admin/artistas" className="btn btn-admin btn-sm">Gestionar</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard