import { useNavigate, Link } from 'react-router-dom'
import { useUsuariosService } from '../../services/usuarios.service'
import { useForm } from 'react-hook-form'

const Register = () => {
    const navigate = useNavigate()
    const { registro: registroService } = useUsuariosService()

    const { register, handleSubmit, watch, setError, formState: { errors, isValid } } = useForm({ mode: 'onChange' })

    const pass = watch('password', '')
    const passConfirm = watch('passwordConfirm', '')

    const validaciones = {
        longitudMin: pass.length >= 8,
        mayuscula: /[A-Z]/.test(pass),
        minuscula: /[a-z]/.test(pass),
        numero: /[0-9]/.test(pass),
        simbolo: /[@$!%*?&._-]/.test(pass)
    }

    const onSubmit = (formData) => {
        registroService(formData.email, formData.password, formData.passwordConfirm)
            .then(() => navigate('/login'))
            .catch(() => setError('root', { message: 'No se pudo registrar. El email ya puede estar en uso.' }))
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow card-register">
                <h2 className="text-center mb-4">Crear Cuenta</h2>

                {errors.root && <div className="alert alert-danger">{errors.root.message}</div>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${watch('email','').length > 0 ? errors.email ? 'is-invalid' : 'is-valid' : ''}`}
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
                            className={`form-control ${pass.length > 0 ? !Object.values(validaciones).every(v => v) ? 'is-invalid' : 'is-valid' : ''}`}
                            placeholder="Mínimo 8 caracteres"
                            {...register('password', {
                                required: 'La contraseña es obligatoria',
                                validate: value => {
                                    if (value.length < 8) return 'Mínimo 8 caracteres'
                                    if (!/[A-Z]/.test(value)) return 'Debe tener una mayúscula'
                                    if (!/[a-z]/.test(value)) return 'Debe tener una minúscula'
                                    if (!/[0-9]/.test(value)) return 'Debe tener un número'
                                    if (!/[@$!%*?&._-]/.test(value)) return 'Debe tener un símbolo'
                                    return true
                                }
                            })}
                        />
                        {pass.length > 0 && (
                            <ul className="list-unstyled mt-2 small">
                                <li className={validaciones.longitudMin ? 'text-success' : 'text-danger'}>{validaciones.longitudMin ? '✔' : '✖'} Mínimo 8 caracteres</li>
                                <li className={validaciones.mayuscula ? 'text-success' : 'text-danger'}>{validaciones.mayuscula ? '✔' : '✖'} Una mayúscula</li>
                                <li className={validaciones.minuscula ? 'text-success' : 'text-danger'}>{validaciones.minuscula ? '✔' : '✖'} Una minúscula</li>
                                <li className={validaciones.numero ? 'text-success' : 'text-danger'}>{validaciones.numero ? '✔' : '✖'} Un número</li>
                                <li className={validaciones.simbolo ? 'text-success' : 'text-danger'}>{validaciones.simbolo ? '✔' : '✖'} Un símbolo (@$!%*?&._-)</li>
                            </ul>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Confirmar Contraseña</label>
                        <input
                            type="password"
                            className={`form-control ${passConfirm.length > 0 ? errors.passwordConfirm ? 'is-invalid' : 'is-valid' : ''}`}
                            placeholder="Repetí tu contraseña"
                            {...register('passwordConfirm', {
                                required: 'Confirmá tu contraseña',
                                validate: value => value === pass || 'Las contraseñas no coinciden'
                            })}
                        />
                        {errors.passwordConfirm && <div className="invalid-feedback">{errors.passwordConfirm.message}</div>}
                    </div>

                    <button type="submit" className={`btn btn-primary w-100 mb-3 ${isValid ? '' : 'disabled'}`}>
                        Registrarse
                    </button>
                    <p className="text-center">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register