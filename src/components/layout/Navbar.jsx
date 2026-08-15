import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar as BsNavbar, Container, Nav } from 'react-bootstrap'
import { Diamond, ShoppingBag } from 'lucide-react'
import { UserContext } from '../../context/UserContext'
import { cartItems } from '../../mocks/cart'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user } = useContext(UserContext)

  return (
    <BsNavbar expand="lg" className={styles.navbar}>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className={styles.brand}>
          <Diamond size={20} className={styles.brandIcon} />
          MUSYNC
        </BsNavbar.Brand>
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/cart" className={styles.navLink}>
            <ShoppingBag size={18} className="me-1" />
            Carrito ({cartItems.length})
          </Nav.Link>
          {user ? (
            <Nav.Link as={Link} to="/dashboard" className={styles.navLink}>
              {user.artistProfile.artistName}
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login" className={styles.navLink}>
              Log in
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
