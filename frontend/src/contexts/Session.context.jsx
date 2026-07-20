import { createContext, useContext, useState } from 'react'

const SessionContext = createContext()

export function SessionProvider({ children }) {
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('session'))?.usuario)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [rol, setRol] = useState(localStorage.getItem('rol'))

    const onLogin = (jwt, usuario, rolUsuario) => {
        localStorage.setItem('session', JSON.stringify({ usuario }))
        localStorage.setItem('token', jwt)
        localStorage.setItem('rol', rolUsuario)
        setEmail(usuario)
        setToken(jwt)
        setRol(rolUsuario)
    }

    const onLogout = () => {
        localStorage.removeItem('session')
        localStorage.removeItem('token')
        localStorage.removeItem('rol')
        setEmail(null)
        setToken(null)
        setRol(null)
    }

    return (
        <SessionContext.Provider value={{ email, token, rol, onLogin, onLogout }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useEmail = () => useContext(SessionContext).email
export const useToken = () => useContext(SessionContext).token
export const useRol = () => useContext(SessionContext).rol
export const useLogin = () => useContext(SessionContext).onLogin
export const useLogout = () => useContext(SessionContext).onLogout