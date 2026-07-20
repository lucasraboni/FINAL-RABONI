import { useState, useEffect } from 'react'
import { useVinilosService } from '../services/vinilos.service'

export function useVinilos() {
    const [vinilos, setVinilos] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { getVinilos } = useVinilosService()

    useEffect(() => {
        getVinilos()
            .then(data => setVinilos(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return { vinilos, loading, error }
}

export function useVinilo(id) {
    const [vinilo, setVinilo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { getViniloPorId } = useVinilosService()

    useEffect(() => {
        getViniloPorId(id)
            .then(data => setVinilo(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [id])

    return { vinilo, loading, error }
}