import { useNavigate, Link } from 'react-router-dom'
import { useLogin } from '../../contexts/Session.context'
import { useUsuariosService } from '../../services/usuarios.service'
import { useForm } from 'react-hook-form'

const Login = () => {
    const navigate = useNavigate()
    const login = useLogin()
    const { login: loginService } = useUsuariosService()

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({ mode: 'onChange' })

    const email = watch('email', '')
    const password = watch('password', '')

    const onSubmit = (formData) => {
        loginService({ email: formData.email, password: formData.password })
            .then(data => {
                login(data.token, data.email, data.rol)
                navigate('/')
            })
            .catch(() => setError('root', { message: 'Email o contraseña incorrectos' }))
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow card-login">
                <h2 className="text-center mb-4">Iniciar Sesión</h2>

                {errors.root && <div className="alert alert-danger">{errors.root.message}</div>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${email.length > 0 ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}
                            placeholder="tu@email.com"
                            {...register('email', {
                                required: 'El email es obligatorio',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'No es un email válido'
                                }
                            })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className={`form-control ${password.length > 0 ? errors.password ? 'is-invalid' : 'is-valid' : ''}`}
                            placeholder="Tu contraseña"
                            {...register('password', { required: 'La contraseña es obligatoria' })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">Ingresar</button>
                    <p className="text-center">¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login