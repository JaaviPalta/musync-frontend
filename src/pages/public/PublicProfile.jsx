import { useContext, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Badge } from 'react-bootstrap'
import { Music2, Video, Camera } from 'lucide-react'
import StripePattern from '../../components/ui/StripePattern'
import PublicationCard from '../../components/publication/PublicationCard'
import { currentUser } from '../../mocks/user'
import { PublicationsContext } from '../../context/PublicationsContext'
import { ShowsContext } from '../../context/ShowsContext'
import { PROFILE_FILTERS } from '../../utils/publications'
import styles from './PublicProfile.module.css'

const socialLinks = (profile) =>
  [
    { key: 'spotify', label: 'Spotify', url: profile.spotifyUrl, Icon: Music2 },
    { key: 'youtube', label: 'YouTube', url: profile.youtubeUrl, Icon: Video },
    { key: 'instagram', label: 'Instagram', url: profile.instagramUrl, Icon: Camera },
  ].filter((link) => link.url)

const PublicProfile = () => {
  const { username } = useParams()
  const [filter, setFilter] = useState('all')
  const { publications } = useContext(PublicationsContext)
  const { upcomingShows, pastShows } = useContext(ShowsContext)

  const { artistProfile } = currentUser
  const isKnownArtist = username === artistProfile.username

  const publishedPublications = useMemo(
    () => publications.filter((p) => p.status === 'publicada'),
    [publications],
  )
  const firstService = publishedPublications.find((p) => p.type === 'service')

  const filteredPublications = useMemo(
    () =>
      filter === 'all'
        ? publishedPublications
        : publishedPublications.filter((p) => p.type === filter),
    [filter, publishedPublications],
  )

  const links = socialLinks(artistProfile)

  if (!isKnownArtist) {
    return (
      <Container className={styles.notFound}>
        <h1>Artista no encontrado</h1>
        <p>No existe ninguna página en musync.com/{username}.</p>
        <Link to="/">Volver al inicio</Link>
      </Container>
    )
  }

  return (
    <div>
      <StripePattern className={styles.cover} />

      <Container className={styles.headerSection}>
        <Row className="align-items-end">
          <Col md={8}>
            <StripePattern tone="neutral" className={styles.avatar} />
            <span className={styles.handle}>musync.com/{artistProfile.username}</span>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{artistProfile.artistName}</h1>
              <Badge className={styles.availabilityBadge}>{artistProfile.availability}</Badge>
            </div>
            <p className={styles.roleLine}>
              {artistProfile.roleLine} — {artistProfile.city}, {artistProfile.country}
            </p>
          </Col>
          <Col md={4} className={styles.headerActions}>
            {firstService ? (
              <Button as={Link} to="/cotizar" variant="outline-primary">
                Contrátame
              </Button>
            ) : null}
            {links.some((l) => l.key === 'spotify') ? (
              <Button
                as="a"
                href={artistProfile.spotifyUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline-secondary"
              >
                Escuchar
              </Button>
            ) : null}
          </Col>
        </Row>

        <p className={styles.bio}>{artistProfile.bio}</p>

        <div className={styles.tags}>
          {artistProfile.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </Container>

      <Container className={styles.body}>
        <Row className="g-5">
          <Col lg={8}>
            <div className={styles.filters}>
              {PROFILE_FILTERS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`${styles.filterBtn} ${filter === item.key ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {filteredPublications.length ? (
              <Row className="g-4">
                {filteredPublications.map((pub) => (
                  <Col key={pub.id} sm={6} lg={4}>
                    <PublicationCard publication={pub} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p className={styles.emptyState}>No hay publicaciones en esta categoría todavía.</p>
            )}
          </Col>

          <Col lg={4}>
            <div className={styles.sidebarCard}>
              <span className={styles.sidebarTitle}>Próximos shows</span>
              {upcomingShows.length ? (
                upcomingShows.map((show) => (
                  <div key={show.id} className={styles.showItem}>
                    <strong>{show.name}</strong>
                    <span>
                      {new Date(show.date).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      · {show.city}
                    </span>
                  </div>
                ))
              ) : (
                <p className={styles.emptyState}>Sin shows agendados.</p>
              )}
              <p className={styles.sidebarHint}>Sin venta de entradas en el MVP.</p>
            </div>

            <div className={styles.sidebarCard}>
              <span className={styles.sidebarTitle}>Shows anteriores</span>
              {pastShows.map((show) => (
                <div key={show.id} className={styles.pastShowItem}>
                  {show.name} · {show.dateLabel}
                </div>
              ))}
            </div>

            {links.length ? (
              <div className={styles.sidebarCard}>
                <span className={styles.sidebarTitle}>Enlaces</span>
                {links.map(({ key, label, url, Icon }) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" className={styles.linkItem}>
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PublicProfile
