import { useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import StripePattern from '../../components/ui/StripePattern'
import { currentUser } from '../../mocks/user'
import { PublicationsContext } from '../../context/PublicationsContext'
import { CartContext } from '../../context/CartContext'
import { PUBLICATION_TYPE_LABELS, priceLabel } from '../../utils/publications'
import styles from './PublicationDetail.module.css'

const specRows = (publication) =>
  [
    ['Formato', publication.format],
    ['Tamaño', publication.sizeLabel],
    ['Licencia', publication.license],
  ].filter(([, value]) => value)

const PublicationDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { artistProfile } = currentUser
  const { publications } = useContext(PublicationsContext)
  const { addItem } = useContext(CartContext)
  const publication = publications.find((p) => String(p.id) === id)

  if (!publication) {
    return (
      <Container className={styles.notFound}>
        <h1>Publicación no encontrada</h1>
        <Link to={`/artista/${artistProfile.username}`}>
          ← Volver a musync.com/{artistProfile.username}
        </Link>
      </Container>
    )
  }

  const rows = specRows(publication)
  const isPurchasable = publication.type === 'music' || publication.type === 'digital_product'

  const handleAddToCart = () => {
    addItem({ ...publication, artistName: artistProfile.artistName })
    toast.success(`${publication.title} agregado al carrito`)
  }

  const handleBuyNow = () => {
    addItem({ ...publication, artistName: artistProfile.artistName })
    navigate('/cart')
  }

  return (
    <Container className={styles.page}>
      <Link to={`/artista/${artistProfile.username}`} className={styles.backLink}>
        ← Volver a musync.com/{artistProfile.username}
      </Link>

      <Row className="g-5 mt-1">
        <Col lg={6}>
          <StripePattern
            tone={publication.type === 'music' ? 'accent' : 'neutral'}
            className={styles.image}
          />
        </Col>

        <Col lg={6}>
          <span className={styles.badge}>{PUBLICATION_TYPE_LABELS[publication.type]}</span>
          <h1 className={styles.title}>{publication.title}</h1>
          <Link to={`/artista/${artistProfile.username}`} className={styles.byline}>
            por {artistProfile.artistName}
          </Link>

          <p className={styles.price}>{priceLabel(publication)}</p>
          {publication.type === 'digital_product' && publication.sizeLabel ? (
            <p className={styles.deliveryHint}>
              Descarga inmediata tras la compra · {publication.sizeLabel}
            </p>
          ) : null}

          {publication.description ? (
            <p className={styles.description}>{publication.description}</p>
          ) : null}

          <div className={styles.actions}>
            {isPurchasable ? (
              <>
                <Button variant="outline-primary" onClick={handleAddToCart}>
                  Agregar al carrito
                </Button>
                <Button variant="outline-secondary" onClick={handleBuyNow}>
                  Comprar ahora
                </Button>
              </>
            ) : null}
            {publication.type === 'service' ? (
              <Button as={Link} to={`/publication/${publication.id}/cotizar`} variant="outline-primary">
                Solicitar cotización
              </Button>
            ) : null}
            {publication.type === 'portfolio' ? (
              <p className={styles.portfolioHint}>
                Este trabajo es parte del portafolio de {artistProfile.artistName}.
              </p>
            ) : null}
          </div>

          {rows.length ? (
            <div className={styles.specs}>
              {rows.map(([label, value]) => (
                <div key={label} className={styles.specRow}>
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}

export default PublicationDetail
