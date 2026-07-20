import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useArtistasService } from '../../services/artistas.service'

const NuevoArtista = () => {
    const navigate = useNavigate()
    const { crearArtista } = useArtistasService()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' })

    const onSubmit = (formData) => {
        crearArtista(formData)
            .then(() => navigate('/admin/artistas'))
            .catch(err => console.error(err))
    }

    return (
        <section className="container-xxl my-4 px-3">
            <h2 className="mb-3 fs-2 p-1 text-center bg-dark fw-bold">Agregar Artista</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-dark">
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Nombre *</label>
                        <input className="form-control" placeholder="Nombre del artista"
                            {...register('nombre', { required: 'El nombre es obligatorio' })} />
                        {errors.nombre && <div className="text-danger small">{errors.nombre.message}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label fs-5 bs-purpura">Foto (nombre del archivo) *</label>
                        <input className="form-control" placeholder="Ej: artista.jpg"
                            {...register('foto', { required: 'La foto es obligatoria' })} />
                        {errors.foto && <div className="text-danger small">{errors.foto.message}</div>}
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label fs-5 bs-purpura">Descripción *</label>
                        <textarea className="form-control" rows="3" placeholder="Biografía del artista"
                            {...register('descripcion', { required: 'La descripción es obligatoria' })} />
                        {errors.descripcion && <div className="text-danger small">{errors.descripcion.message}</div>}
                    </div>
                </div>
                <button type="submit" className={`btn btn-admin fs-5 fw-bold text-uppercase ${isValid ? '' : 'disabled'}`}>Agregar</button>
                <Link to="/admin/artistas" className="btn btn-dark fs-5 fw-bold text-uppercase ms-2">Cancelar</Link>
            </form>
        </section>
    )
}

export default NuevoArtista