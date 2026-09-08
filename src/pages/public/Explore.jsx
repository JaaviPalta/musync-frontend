import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { Diamond, ShoppingBag } from 'lucide-react'
import StripePattern from '../../components/ui/StripePattern'
import { api } from '../../lib/api'
import { priceLabel } from '../../utils/publications'
import styles from './Explore.module.css'

const normalizeArtist = (artist) => ({
  username: artist.username ?? artist.artistName ?? artist.artist_name ?? artist.name,
  artistName: artist.artistName ?? artist.artist_name ?? artist.name ?? 'Artista',
  roleLine: artist.roleLine ?? artist.specialty ?? artist.role ?? 'Artista',
  city: artist.city ?? 'Sin ciudad',
  country: artist.country ?? 'Sin país',
  availability: artist.availability ?? 'Disponible',
  coverImageUrl: artist.coverImageUrl ?? artist.coverUrl ?? artist.cover_url ?? artist.coverUrl,
  avatarImageUrl: artist.avatarImageUrl ?? artist.avatarUrl ?? artist.avatar_url,
  bio: artist.bio ?? '',
  tags: Array.isArray(artist.tags) ? artist.tags : [],
  publications: Array.isArray(artist.publications) ? artist.publications : [],
})

const ExplorePage = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadArtists = async () => {
      try {
        setLoading(true)

        const list = await api.getArtists()
        const normalized = await Promise.all(
          (Array.isArray(list) ? list : []).map(async (artist) => {
            const username = artist.username ?? artist.artistName ?? artist.artist_name ?? artist.name
            if (!username) return null

            try {
              const publications = await api.getArtistPublications(username)

              return normalizeArtist({
                ...artist,
                username,
                publications: Array.isArray(publications) ? publications : [],
              })
            } catch {
              return normalizeArtist({ ...artist, username })
            }
          }),
        )

        if (!cancelled) {
          const visibleArtists = normalized
            .filter(Boolean)
            .filter((artist) => artist.username !== 'demo')
            .slice(0, 6)

          setArtists(visibleArtists)
          setError('')
        }
      } catch (requestError) {
        if (!cancelled) {
          setArtists([])
          setError(requestError.message || 'No se pudieron cargar los artistas.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadArtists()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Container className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.eyebrow}>Explorar</p>
          <h1 className={styles.title}>Descubre artistas y compra su música</h1>
        </div>
        <Button as={Link} to="/" variant="outline-primary">
          Volver al inicio
        </Button>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <Spinner animation="border" role="status" size="sm" />
          <span>Cargando artistas...</span>
        </div>
      ) : null}

      {!loading && error ? (
        <div className={styles.emptyState}>{error}</div>
      ) : null}

      {!loading && !error ? (
        <Row className="g-4">
          {artists.length ? (
            artists.map((artist) => {
              const visiblePublications = (artist.publications ?? []).filter((pub) => pub.isActive !== false).slice(0, 3)

              return (
                <Col key={artist.username} lg={6}>
                  <article className={styles.artistCard}>
                    {artist.coverImageUrl ? (
                      <img src={artist.coverImageUrl} alt="" className={styles.cover} />
                    ) : (
                      <StripePattern className={styles.cover} />
                    )}

                    <div className={styles.body}>
                      <div className={styles.profileRow}>
                        {artist.avatarImageUrl ? (
                          <img src={artist.avatarImageUrl} alt="" className={styles.avatar} />
                        ) : (
                          <StripePattern tone="neutral" className={styles.avatar} />
                        )}

                        <div>
                          <span className={styles.handle}>musync.com/{artist.username}</span>
                          <h2 className={styles.artistName}>{artist.artistName}</h2>
                          <p className={styles.roleLine}>{artist.roleLine}</p>
                        </div>
                      </div>

                      <p className={styles.bio}>{artist.bio}</p>

                      <div className={styles.tags}>
                        {(artist.tags ?? []).slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={styles.productList}>
                        {visiblePublications.length ? (
                          visiblePublications.map((pub) => (
                            <div key={pub.id} className={styles.productItem}>
                              <div>
                                <span className={styles.productType}>{pub.type === 'music' ? 'Música' : 'Producto'}</span>
                                <strong>{pub.title}</strong>
                              </div>
                              <div className={styles.productMeta}>
                                <span>{priceLabel(pub)}</span>
                                <Link to={`/publication/${pub.id}`} state={{ artistProfile: artist }}>
                                  Ver
                                </Link>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className={styles.empty}>Este artista todavía no tiene productos publicados.</p>
                        )}
                      </div>

                      <div className={styles.actions}>
                        <Button as={Link} to={`/artista/${artist.username}`} variant="outline-primary" size="sm">
                          Ver perfil
                        </Button>
                        <Button
                          as={Link}
                          to={`/publication/${visiblePublications[0]?.id ?? ''}`}
                          state={{ artistProfile: artist }}
                          variant="outline-secondary"
                          size="sm"
                          disabled={!visiblePublications[0]}
                        >
                          <ShoppingBag size={15} className="me-1" />
                          Comprar
                        </Button>
                      </div>
                    </div>
                  </article>
                </Col>
              )
            })
          ) : (
            <Col xs={12}>
              <div className={styles.emptyState}>No hay artistas disponibles en este momento.</div>
            </Col>
          )}
        </Row>
      ) : null}

      <div className={styles.footerNote}>
        <Diamond size={16} />
        <span>Todo el recorrido de compra y perfil público está pensado para clientes que exploran y compran sin complicaciones.</span>
      </div>
    </Container>
  )
}

export default ExplorePage
