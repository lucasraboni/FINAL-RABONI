import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useVinilosService } from '../../services/vinilos.service'

const BorrarVinilo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [vinilo, setVinilo] = useState(null)
    const { getViniloPorId, borrarVinilo } = useVinilosService()

    useEffect(() => {
        getViniloPorId(id)
            .then(data => setVinilo(data))
            .catch(err => console.error(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        borrarVinilo(id)
            .then(() => navigate('/admin/vinilos'))
            .catch(err => console.error(err))
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 text-center card-borrar">
                <h4 className="mb-3">¿Eliminar vinilo?</h4>
                {vinilo && <p className="fs-5">¿Querés eliminar <strong>{vinilo.titulo}</strong>?</p>}
                <form onSubmit={handleSubmit} className="d-flex gap-2 justify-content-center">
                    <button type="submit" className="btn btn-danger">Sí, eliminar</button>
                    <Link to="/admin/vinilos" className="btn btn-secondary">Cancelar</Link>
                </form>
            </div>
        </div>
    )
}

export default BorrarVinilo