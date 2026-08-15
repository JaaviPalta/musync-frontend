import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import { Diamond } from 'lucide-react'
import { UserContext } from '../../context/UserContext'
import styles from './Sidebar.module.css'

const navItems = [
  { label: 'Resumen', to: '/dashboard', end: true },
  { label: 'Mi perfil', to: '/dashboard/profile' },
  { label: 'Mis publicaciones', to: '/dashboard/publications' },
  { label: 'Cotizaciones', to: '/dashboard/quotes' },
  { label: 'Shows', to: '/dashboard/shows' },
]

const Sidebar = () => {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <Diamond size={20} className={styles.brandIcon} />
        MUSYNC
      </div>

      <Nav className={`flex-column ${styles.nav}`}>
        {navItems.map((item) => (
          <Nav.Link
            key={item.to}
            as={NavLink}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            {item.label}
          </Nav.Link>
        ))}
      </Nav>

      <div className={styles.footer}>
        <NavLink to={`/artista/${user?.artistProfile?.username}`} className={styles.viewPage}>
          Ver mi página →
        </NavLink>
        <button type="button" className={styles.logout} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default Sidebar
