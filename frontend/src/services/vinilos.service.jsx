import { useApi } from './api.service'

export function useVinilosService() {
    const { call } = useApi()

    const getVinilos = () => call('/vinilos')
    const getViniloPorId = (id) => call('/vinilos/' + id)
    const crearVinilo = (datos) => call('/vinilos', 'POST', datos)
    const editarVinilo = (id, datos) => call('/vinilos/' + id, 'PATCH', datos)
    const borrarVinilo = (id) => call('/vinilos/' + id, 'DELETE')

    return { getVinilos, getViniloPorId, crearVinilo, editarVinilo, borrarVinilo }
}