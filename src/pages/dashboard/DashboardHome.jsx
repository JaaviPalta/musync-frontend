import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const DashboardHome = () => {
  const { user } = useContext(UserContext)

  return (
    <div>
      <h1>Resumen</h1>
      <p>Ruta: /dashboard</p>
      <p>Sesión: {user?.artistProfile?.artistName}</p>
    </div>
  )
}

export default DashboardHome
