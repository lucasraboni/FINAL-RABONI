import { useState, useEffect } from 'react'
import { useArtistasService } from '../services/artistas.service'

export function useArtistas() {
    const [artistas, setArtistas] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { getArtistas } = useArtistasService()

    useEffect(() => {
        getArtistas()
            .then(data => setArtistas(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { artistas, loading, error }
}

export function useArtista(id) {
    const [artista, setArtista] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { getArtistaPorId } = useArtistasService()

    useEffect(() => {
        getArtistaPorId(id)
            .then(data => setArtista(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    return { artista, loading, error }
}