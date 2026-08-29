import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Navbar as BsNavbar, Container, Nav } from 'react-bootstrap'
import { Diamond, ShoppingBag } from 'lucide-react'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user } = useContext(UserContext)
  const { items } = useContext(CartContext)
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <BsNavbar expand="lg" className={styles.navbar}>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className={styles.brand}>
          <Diamond size={20} className={styles.brandIcon} />
          MUSYNC
        </BsNavbar.Brand>
        <Nav className="ms-auto align-items-center">
          {user ? (
            <>
              <Nav.Link as={Link} to="/cart" className={styles.navLink}>
                <ShoppingBag size={18} className="me-1" />
                Carrito ({cartCount})
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard" className={styles.navLink}>
                {user.artistProfile.artistName}
              </Nav.Link>
            </>
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
