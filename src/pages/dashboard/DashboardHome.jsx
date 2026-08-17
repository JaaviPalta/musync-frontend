import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'
import StripePattern from '../../components/ui/StripePattern'
import { publications } from '../../mocks/publications'
import { quotes } from '../../mocks/quotes'
import { orders } from '../../mocks/orders'
import { PUBLICATION_TYPE_LABELS, priceLabel } from '../../utils/publications'
import styles from './DashboardHome.module.css'

const DashboardHome = () => {
  const { user } = useContext(UserContext)
  const { artistProfile } = user

  const activeCount = useMemo(
    () => publications.filter((p) => p.status === 'publicada').length,
    [],
  )
  const pendingQuotes = useMemo(() => quotes.filter((q) => q.status === 'nueva').length, [])
  const latestPublications = publications.slice(0, 4)
  const newestQuotes = quotes.slice(0, 3)

  const stats = [
    { label: 'Publicaciones activas', value: activeCount, to: '/dashboard/publications' },
    { label: 'Cotizaciones pendientes', value: pendingQuotes, to: '/dashboard/quotes' },
    { label: 'Órdenes recibidas', value: orders.length, to: '/dashboard/orders' },
  ]

  return (
    <div>
      <h1 className={styles.title}>Resumen</h1>
      <p className={styles.subtitle}>
        Hola de nuevo, {artistProfile.artistName}. Tu página está publicada en{' '}
        <Link to={`/artista/${artistProfile.username}`}>musync.com/{artistProfile.username}</Link>
      </p>

      <Button as={Link} to="/dashboard/publications/new" variant="outline-primary" className="mb-4">
        Nueva publicación
      </Button>

      <Row className="g-3 mb-4">
        {stats.map((stat) => (
          <Col key={stat.label} sm={4}>
            <Link to={stat.to} className={styles.statCard}>
              <span className={styles.statLabel}>{stat.label}</span>
              <strong className={styles.statValue}>{stat.value}</strong>
            </Link>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Últimas publicaciones</h2>
              <Link to="/dashboard/publications" className={styles.panelLink}>
                Ver todas →
              </Link>
            </div>
            {latestPublications.map((pub) => (
              <div key={pub.id} className={styles.listItem}>
                <StripePattern
                  tone={pub.type === 'music' ? 'accent' : 'neutral'}
                  className={styles.listThumb}
                />
                <div className={styles.listInfo}>
                  <strong>{pub.title}</strong>
                  <span>{PUBLICATION_TYPE_LABELS[pub.type]}</span>
                </div>
                <span className={styles.listPrice}>{priceLabel(pub)}</span>
              </div>
            ))}
          </div>
        </Col>

        <Col lg={5}>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h2 className={styles.panelTitle}>Cotizaciones nuevas</h2>
              <Link to="/dashboard/quotes" className={styles.panelLink}>
                Bandeja →
              </Link>
            </div>
            {newestQuotes.map((quote) => (
              <div key={quote.id} className={styles.quoteItem}>
                <div className={styles.quoteHeader}>
                  <strong>{quote.clientName}</strong>
                  <span>{quote.createdLabel}</span>
                </div>
                <span className={styles.quoteMeta}>
                  {quote.category}
                  {quote.budget ? ` · $${quote.budget.toLocaleString('es-CL')}` : ' · presupuesto abierto'}
                </span>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardHome
