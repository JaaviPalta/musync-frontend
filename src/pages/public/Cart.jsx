import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Minus, Plus, Trash2 } from 'lucide-react'
import StripePattern from '../../components/ui/StripePattern'
import { cartItems as initialCartItems } from '../../mocks/cart'
import { currentUser } from '../../mocks/user'
import { formatPrice } from '../../utils/publications'
import styles from './Cart.module.css'

const Cart = () => {
  const [items, setItems] = useState(initialCartItems)
  const { artistProfile } = currentUser

  const updateQuantity = (id, delta) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      ),
    )
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Container className={styles.page}>
      <h1 className={styles.title}>Tu carrito</h1>
      <p className={styles.subtitle}>Solo música y productos digitales. Los servicios se cotizan aparte.</p>

      {items.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Tu carrito está vacío.</p>
          <Link to={`/artista/${artistProfile.username}`}>
            ← Seguir explorando la página de {artistProfile.artistName}
          </Link>
        </div>
      ) : (
        <Row className="g-4 mt-1">
          <Col lg={8}>
            {items.map((item) => (
              <div key={item.id} className={styles.item}>
                <StripePattern
                  tone={item.type === 'music' ? 'accent' : 'neutral'}
                  className={styles.itemThumb}
                />
                <div className={styles.itemInfo}>
                  <span className={styles.itemBadge}>
                    {item.type === 'music' ? 'Música' : 'Producto digital'}
                  </span>
                  <strong>{item.title}</strong>
                  <span className={styles.itemArtist}>por {item.artistName}</span>
                </div>

                <div className={styles.stepper}>
                  <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                    <Plus size={14} />
                  </button>
                </div>

                <span className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</span>

                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                  aria-label={`Quitar ${item.title}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            <Link to={`/artista/${artistProfile.username}`} className={styles.continueLink}>
              ← Seguir explorando la página de {artistProfile.artistName}
            </Link>
          </Col>

          <Col lg={4}>
            <div className={styles.summary}>
              <span className={styles.summaryTitle}>Resumen</span>
              <div className={styles.summaryRow}>
                <span>{items.length} producto{items.length === 1 ? '' : 's'}</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Entrega</span>
                <span>Descarga digital</span>
              </div>
              <hr className={styles.summaryDivider} />
              <div className={styles.totalRow}>
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <Button variant="outline-primary" className={styles.checkoutBtn}>
                Finalizar compra
              </Button>
              <p className={styles.summaryHint}>
                En el MVP no hay pasarela de pago real: al finalizar se crea una orden con sus{' '}
                <code>order_items</code> en PostgreSQL.
              </p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default Cart
