import { useApi } from './api.service'

export function useUsuariosService() {
    const { call } = useApi()

    const login = (credenciales) => call('/usuarios/login', 'POST', credenciales)
    const registro = (email, password, passwordConfirm) =>
        call('/usuarios', 'POST', { email, password, passwordConfirm })
    const getUsuarios = () => call('/usuarios')
    const updateRol = (id, rol) => call('/usuarios/' + id, 'PATCH', { rol })

    return { login, registro, getUsuarios, updateRol }
}