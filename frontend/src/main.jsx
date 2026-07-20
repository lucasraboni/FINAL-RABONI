import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SessionProvider } from './contexts/Session.context'
import router from './routes/Router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SessionProvider>
            <RouterProvider router={router} />
        </SessionProvider>
    </StrictMode>
)