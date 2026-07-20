import { useApi } from './api.service'

export function useArtistasService() {
    const { call } = useApi()

    const getArtistas = () => call('/artistas')
    const getArtistaPorId = (id) => call('/artistas/' + id)
    const crearArtista = (datos) => call('/artistas', 'POST', datos)
    const editarArtista = (id, datos) => call('/artistas/' + id, 'PATCH', datos)
    const borrarArtista = (id) => call('/artistas/' + id, 'DELETE')

    return { getArtistas, getArtistaPorId, crearArtista, editarArtista, borrarArtista }
}