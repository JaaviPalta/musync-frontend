import { useContext, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { toast } from 'sonner'
import { UserContext } from '../context/UserContext'

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(UserContext)
  const location = useLocation()

  useEffect(() => {
    // Mientras isLoading es true todavía no sabemos si hay sesión (se está
    // restaurando desde el token guardado) — no hay que avisar "inicia sesión"
    // ni redirigir todavía, o cualquier recarga de página en el dashboard
    // manda a /login por un instante aunque el usuario sí esté logueado.
    if (isLoading) return

    if (!user && location.pathname.startsWith('/dashboard')) {
      toast.error('Debes iniciar sesión para acceder al panel.')
      return
    }

    if (!user && location.pathname === '/cart') {
      toast.error('Debes iniciar sesión para ver tu carrito.')
    }
  }, [user, isLoading, location.pathname])

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando…</span>
        </Spinner>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
