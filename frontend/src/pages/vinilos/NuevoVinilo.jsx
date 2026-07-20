import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useVinilosService } from '../../services/vinilos.service'
import { useArtistas } from '../../hooks/useArtistas'

const NuevoVinilo = () => {
    const navigate = useNavigate()
    const { crearVinilo } = useVinilosService()
    const { artistas } = useArtistas()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' })

    const onSubmit = (formData) => {
        const artistaSeleccionado = artistas?.find(a => a.nombre === formData.artista)
        const vinilo = { ...formData, foto_artista: artistaSeleccionado?.foto || '' }
        crearVinilo(vinilo)
            .then(() => navigate('/admin/vinilos'))
            .catch(err => console.error(err))
    }

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Nuevo Vinilo</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-dark">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Título *</label>
                        <input className="form-control" {...register('titulo', { required: 'El título es obligatorio' })} />
                        {errors.titulo && <div className="text-danger small">{errors.titulo.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Artista *</label>
                        <select className="form-control" {...register('artista', { required: 'El artista es obligatorio' })}>
                            <option value="">-- Seleccioná un artista --</option>
                            {artistas?.map(a => (
                                <option key={a._id} value={a.nombre}>{a.nombre}</option>
                            ))}
                        </select>
                        {errors.artista && <div className="text-danger small">{errors.artista.message}</div>}
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label fs-5 bs-purpura">Descripción *</label>
                        <textarea className="form-control" rows="3" {...register('descripcion', { required: 'La descripción es obligatoria' })} />
                        {errors.descripcion && <div className="text-danger small">{errors.descripcion.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Precio *</label>
                        <input type="number" step="0.01" className="form-control" {...register('precio', { required: 'El precio es obligatorio' })} />
                        {errors.precio && <div className="text-danger small">{errors.precio.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Géneros *</label>
                        <input className="form-control" placeholder="Electronic, House..." {...register('generos', { required: 'Los géneros son obligatorios' })} />
                        {errors.generos && <div className="text-danger small">{errors.generos.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Portada (nombre del archivo) *</label>
                        <input className="form-control" placeholder="Ej: portada.jpg" {...register('portada', { required: 'La portada es obligatoria' })} />
                        {errors.portada && <div className="text-danger small">{errors.portada.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Link de escucha</label>
                        <input className="form-control" placeholder="https://..." {...register('link')} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">País</label>
                        <input className="form-control" {...register('pais')} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Año</label>
                        <input className="form-control" {...register('lanzamiento')} />
                    </div>
                </div>
                <button type="submit" className={`btn btn-admin fs-5 fw-bold text-uppercase ${isValid ? '' : 'disabled'}`}>Guardar</button>
                <Link to="/admin/vinilos" className="btn btn-dark fs-5 fw-bold text-uppercase ms-2">Cancelar</Link>
            </form>
        </section>
    )
}

export default NuevoVinilo