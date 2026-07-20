import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useVinilosService } from '../../services/vinilos.service'
import { useVinilo } from '../../hooks/useVinilos'
import { useArtistas } from '../../hooks/useArtistas'

const EditarVinilo = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { editarVinilo } = useVinilosService()
    const { vinilo, loading } = useVinilo(id)
    const { artistas } = useArtistas()
    const { register, handleSubmit } = useForm()

    const onSubmit = (formData) => {
        const artistaSeleccionado = artistas?.find(a => a.nombre === formData.artista)
        const datos = { ...formData, foto_artista: artistaSeleccionado?.foto || vinilo.foto_artista || '' }
        editarVinilo(id, datos)
            .then(() => navigate('/admin/vinilos'))
            .catch(err => console.error(err))
    }

    if (loading) return <div className="container mt-5 text-center"><div className="spinner-border"></div></div>

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Editar Vinilo</h2>
            {vinilo && (
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-dark">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Título</label>
                            <input className="form-control" defaultValue={vinilo.titulo} {...register('titulo')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Artista</label>
                            <select className="form-control" defaultValue={vinilo.artista} {...register('artista')}>
                                <option value="">-- Seleccioná un artista --</option>
                                {artistas?.map(a => (
                                    <option key={a._id} value={a.nombre}>{a.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 mb-3">
                            <label className="form-label fs-5 bs-purpura">Descripción</label>
                            <textarea className="form-control" rows="3" defaultValue={vinilo.descripcion} {...register('descripcion')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Precio</label>
                            <input type="number" step="0.01" className="form-control" defaultValue={vinilo.precio} {...register('precio')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Géneros</label>
                            <input className="form-control" defaultValue={vinilo.generos} {...register('generos')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Portada (nombre del archivo)</label>
                            <input className="form-control" defaultValue={vinilo.portada} {...register('portada')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Link de escucha</label>
                            <input className="form-control" defaultValue={vinilo.link} {...register('link')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">País</label>
                            <input className="form-control" defaultValue={vinilo.pais} {...register('pais')} />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fs-5 bs-purpura">Año</label>
                            <input className="form-control" defaultValue={vinilo.lanzamiento} {...register('lanzamiento')} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-admin fs-5 fw-bold text-uppercase">Guardar Cambios</button>
                    <Link to="/admin/vinilos" className="btn btn-dark fs-5 fw-bold text-uppercase ms-2">Cancelar</Link>
                </form>
            )}
        </section>
    )
}

export default EditarVinilo