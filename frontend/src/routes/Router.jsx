import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import AdminLayout from '../components/AdminLayout'
import AdminRoute from '../components/AdminRoute'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Logout from '../pages/auth/Logout'

import Home from '../pages/vinilos/Home'
import Detalle from '../pages/vinilos/Detalle'
import NuevoVinilo from '../pages/vinilos/NuevoVinilo'
import EditarVinilo from '../pages/vinilos/EditarVinilo'
import BorrarVinilo from '../pages/vinilos/BorrarVinilo'
import Catalogo from '../pages/vinilos/Catalogo'

import Artistas from '../pages/artistas/Artistas'
import NuevoArtista from '../pages/artistas/NuevoArtista'
import EditarArtista from '../pages/artistas/EditarArtista'
import BorrarArtista from '../pages/artistas/BorrarArtista'

import Dashboard from '../pages/admin/Dashboard'
import AdminVinilos from '../pages/admin/AdminVinilos'
import AdminArtistas from '../pages/admin/AdminArtistas'
import AdminUsuarios from '../pages/admin/AdminUsuarios'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/catalogo', element: <Catalogo /> },
            { path: '/genero/:genero', element: <Home /> },
            { path: '/vinilos/:id', element: <Detalle /> },
            { path: '/artistas', element: <Artistas /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '/logout', element: <Logout /> },
            { path: '*', element: <div className="container mt-5"><h1>404 - Página no encontrada</h1></div> }
        ]
    },
    {
        path: '/admin',
        element: <AdminRoute element={<AdminLayout />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'vinilos', element: <AdminVinilos /> },
            { path: 'vinilos/nuevo', element: <NuevoVinilo /> },
            { path: 'vinilos/:id/editar', element: <EditarVinilo /> },
            { path: 'vinilos/:id/borrar', element: <BorrarVinilo /> },
            { path: 'artistas', element: <AdminArtistas /> },
            { path: 'artistas/nuevo', element: <NuevoArtista /> },
            { path: 'artistas/:id/editar', element: <EditarArtista /> },
            { path: 'artistas/:id/borrar', element: <BorrarArtista /> },
            { path: 'usuarios', element: <AdminUsuarios /> }
        ]
    }
])

export default router