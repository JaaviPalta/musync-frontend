import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import styles from './NotFound.module.css'

const NotFound = () => (
  <Container className={styles.notFound}>
    <span className={styles.code}>404</span>
    <h1>Esta página no existe</h1>
    <p>La ruta a la que intentaste acceder no existe en MUSYNC.</p>
    <Button as={Link} to="/" variant="outline-primary">
      Volver al inicio
    </Button>
  </Container>
)

export default NotFound
