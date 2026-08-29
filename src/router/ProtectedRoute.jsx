import { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { UserContext } from '../context/UserContext'

const ProtectedRoute = () => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  useEffect(() => {
    if (!user && location.pathname.startsWith('/dashboard')) {
      toast.error('Debes iniciar sesión para acceder al panel.')
      return
    }

    if (!user && location.pathname === '/cart') {
      toast.error('Debes iniciar sesión para ver tu carrito.')
    }
  }, [user, location.pathname])

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
