import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useArtistasService } from '../../services/artistas.service'
import { useArtista } from '../../hooks/useArtistas'

const EditarArtista = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { editarArtista } = useArtistasService()
    const { artista, loading } = useArtista(id)
    const { register, handleSubmit } = useForm()

    const onSubmit = (formData) => {
        editarArtista(id, formData)
            .then(() => navigate('/admin/artistas'))
            .catch(err => console.error(err))
    }

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border"></div></div>

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Editar Artista</h2>
            {artista && (
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-dark">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Nombre</label>
                            <input className="form-control" defaultValue={artista.nombre} {...register('nombre')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Foto (nombre del archivo)</label>
                            <input className="form-control" defaultValue={artista.foto} {...register('foto')} />
                        </div>
                        <div className="col-12 mb-3">
                            <label className="form-label fs-5 bs-purpura">Descripción</label>
                            <textarea className="form-control" rows="3" defaultValue={artista.descripcion} {...register('descripcion')} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-admin fs-5 fw-bold text-uppercase">Guardar</button>
                    <Link to="/admin/artistas" className="btn btn-dark fs-5 fw-bold text-uppercase ms-2">Cancelar</Link>
                </form>
            )}
        </section>
    )
}

export default EditarArtista