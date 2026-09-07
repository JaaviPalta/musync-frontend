import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import StripePattern from '../../components/ui/StripePattern'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import { api } from '../../lib/api'
import { PUBLICATION_TYPE_LABELS, priceLabel } from '../../utils/publications'
import { getEmbedInfo } from '../../utils/embed'
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
  const location = useLocation()
  const { user } = useContext(UserContext)
  const { addItem } = useContext(CartContext)
  const [detail, setDetail] = useState({ id: null, publication: null, notFound: false })

  useEffect(() => {
    api
      .getPublication(id)
      .then((result) =>
        setDetail({ id, publication: result ?? null, notFound: !result }),
      )
      .catch(() => setDetail({ id, publication: null, notFound: true }))
  }, [id])

  const publication = detail.id === id ? detail.publication : null
  const notFound = detail.id === id && detail.notFound
  const artistProfile =
    publication?.artistProfile ??
    location.state?.artistProfile ??
    user?.artistProfile ??
    { username: 'demo', artistName: 'el artista' }

  if (!publication && !notFound) {
    return <Container className={styles.notFound}>Cargando publicación...</Container>
  }

  if (notFound) {
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
  const embed = getEmbedInfo(publication.externalUrl)

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
          {embed ? (
            <iframe
              key={embed.embedUrl}
              src={embed.embedUrl}
              title={publication.title}
              className={embed.type === 'spotify' ? styles.embedSpotify : styles.embedYoutube}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : publication.imageUrl ? (
            <img src={publication.imageUrl} alt={publication.title} className={styles.image} />
          ) : (
            <StripePattern
              tone={publication.type === 'music' ? 'accent' : 'neutral'}
              className={styles.image}
            />
          )}
          {!embed && publication.externalUrl ? (
            <a href={publication.externalUrl} target="_blank" rel="noreferrer" className={styles.externalLink}>
              Escuchar / ver enlace externo ↗
            </a>
          ) : null}
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
