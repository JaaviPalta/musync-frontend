import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const DashboardHome = () => {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Resumen</h1>
      <p>Ruta: /dashboard</p>
      <p>Sesión: {user?.artistProfile?.artistName}</p>
      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  )
}

export default DashboardHome
