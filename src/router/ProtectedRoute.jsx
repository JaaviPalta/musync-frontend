import { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { toast } from 'sonner'
import { UserContext } from '../context/UserContext'

const ProtectedRoute = ({ allowedRoles = ['artist', 'client'], redirectTo = '/login' }) => {
  const { user, isLoading } = useContext(UserContext)
  const location = useLocation()
  const role = user?.role ?? 'client'
  const isAllowed = allowedRoles.includes(role)

  useEffect(() => {
    // Mientras isLoading es true todavía no sabemos si hay sesión (se está
    // restaurando desde el token guardado) — no hay que avisar "inicia sesión"
    // ni redirigir todavía, o cualquier recarga de página en el dashboard
    // manda a /login por un instante aunque el usuario sí esté logueado.
    if (isLoading) return

    if (!user) {
      if (location.pathname.startsWith('/dashboard')) {
        toast.error('Debes iniciar sesión para acceder al panel.')
      }

      if (location.pathname === '/cart') {
        toast.error('Debes iniciar sesión para ver tu carrito.')
      }

      return
    }

    if (!isAllowed) {
      if (role === 'artist') {
        toast.error('Esta vista es solo para clientes.')
      } else {
        toast.error('Esta vista es solo para artistas.')
      }
    }
  }, [user, isLoading, location.pathname, isAllowed, role])

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando…</span>
        </Spinner>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  if (!isAllowed) {
    return <Navigate to={role === 'artist' ? '/dashboard' : '/explorar'} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
