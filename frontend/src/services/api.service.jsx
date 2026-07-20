import { useNavigate } from 'react-router-dom'
import { useToken } from '../contexts/Session.context'

export function useApi() {
    const token = useToken()
    const navigate = useNavigate()

    const call = (uri, method = 'GET', body) => {
        return fetch(`${import.meta.env.VITE_API_URL}/api` + uri, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body ? JSON.stringify(body) : undefined
        })
            .then(res => {
                if (res.ok) return res.json()
                if (res.status === 401) navigate('/login')
                throw new Error('Error en la petición')
            })
    }

    return { call }
}