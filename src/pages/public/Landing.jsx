import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Diamond } from 'lucide-react'
import StripePattern from '../../components/ui/StripePattern'
import { UserContext } from '../../context/UserContext'
import { demoArtistProfile } from '../../utils/demoArtist'
import styles from './Landing.module.css'

const steps = [
  {
    n: '1',
    title: 'Crea tu cuenta',
    text: 'Nombre artístico, email y contraseña. Nada más.',
  },
  {
    n: '2',
    title: 'Completa tu perfil',
    text: 'Bio, ciudad, avatar y tus enlaces.',
  },
  {
    n: '3',
    title: 'Publica tu trabajo',
    text: 'Música, productos digitales, servicios y portafolio.',
  },
  {
    n: '4',
    title: 'Comparte tu link',
    text: 'Desde ahí te compran o te piden cotización.',
  },
]

const publicationTypes = [
  {
    label: 'Música',
    code: 'music',
    text: 'Tracks y lanzamientos, con enlace a Spotify o YouTube y opción de venta.',
  },
  {
    label: 'Producto digital',
    code: 'digital_product',
    text: 'Sample packs, presets, partituras. Se agregan al carrito.',
  },
  {
    label: 'Servicio',
    code: 'service',
    text: 'Producción, mezcla, clases. Muestra el botón de cotización.',
  },
  {
    label: 'Portafolio',
    code: 'portfolio',
    text: 'Trabajo hecho que prueba tu experiencia. Sin precio.',
  },
]

const reasons = [
  {
    n: '01',
    title: 'Un solo link, no seis',
    text: 'Deja de enviar enlaces separados de Spotify, YouTube, Drive y tu correo.',
  },
  {
    n: '02',
    title: 'Luce profesional al instante',
    text: 'Una página propia genera más confianza que un perfil de redes disperso.',
  },
  {
    n: '03',
    title: 'Convierte oyentes en clientes',
    text: 'Tus servicios y productos viven junto a tu música, listos para contratar.',
  },
]

const Landing = () => {
  const { user, logout } = useContext(UserContext)
  const artistProfile = {
    username: user?.artistProfile?.username ?? 'demo',
    artistName: user?.artistProfile?.artistName ?? 'Tu proyecto musical',
    roleLine: user?.artistProfile?.roleLine ?? 'Artista independiente',
  }
  const profilePath = `/artista/${artistProfile.username}`
  const demoProfile = demoArtistProfile
  const previewTags = demoProfile.tags?.slice(0, 3) ?? []

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Container className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            <Diamond size={20} className={styles.brandIcon} />
            MUSYNC
          </Link>
          <nav className={styles.nav}>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#por-que">Para quién es</a>
            <Link to="/explorar">Explorar artistas</Link>
            <Link to="/artista/demo">Ejemplo</Link>
          </nav>
          {user ? (
            <button type="button" className={styles.loginLink} onClick={logout}>
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          )}
          <Button as={Link} to={user ? profilePath : '/register'} variant="outline-primary" size="sm">
            {user ? 'Ir a mi perfil' : 'Crear mi página'}
          </Button>
        </Container>
      </header>

      <main>
        <Container className={styles.hero}>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <span className={styles.eyebrow}>Tu página profesional de músico</span>
              <h1 className={styles.heroTitle}>
                Un solo link para mostrar quién eres y cómo trabajar contigo.
              </h1>
              <p className={styles.heroText}>
                Centraliza tu identidad artística, tu música, tu portafolio y tus servicios en una
                página propia — y vende o recibe solicitudes de contratación desde ahí mismo.
              </p>
              <div className={styles.heroActions}>
                <Button as={Link} to={user ? profilePath : '/register'} variant="primary">
                  {user ? 'Ir a mi perfil' : 'Crear mi página'}
                </Button>
                <Button
                  as={Link}
                  to={`/artista/${artistProfile.username}`}
                  variant="outline-secondary"
                >
                  Ver una página de ejemplo
                </Button>
              </div>
              <p className={styles.heroHint}>
                Tu dirección será <span className={styles.accentText}>musync.com/tu-nombre</span>
              </p>
            </Col>

            <Col lg={6}>
              <Link to="/artista/demo" className={styles.previewCardLink}>
                <div className={styles.previewCard}>
                  {demoProfile.coverImageUrl ? (
                    <img src={demoProfile.coverImageUrl} alt="" className={styles.previewCover} />
                  ) : (
                    <StripePattern className={styles.previewCover} />
                  )}

                  <div className={styles.previewBody}>
                    {demoProfile.avatarImageUrl ? (
                      <img
                        src={demoProfile.avatarImageUrl}
                        alt=""
                        className={styles.previewAvatar}
                      />
                    ) : (
                      <StripePattern tone="neutral" className={styles.previewAvatar} />
                    )}

                    <span className={styles.previewHandle}>musync.com/{demoProfile.username}</span>
                    <h2 className={styles.previewName}>{demoProfile.artistName}</h2>
                    <p className={styles.previewRole}>{demoProfile.roleLine}</p>

                    <div className={styles.previewTags}>
                      {previewTags.map((tag) => (
                        <span key={tag} className={styles.previewTag}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.previewActions}>
                      <Button variant="outline-primary" size="sm">
                        Contrátame
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        Escuchar
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>

        <section id="como-funciona" className={styles.section}>
          <Container>
            <h2 className={styles.sectionTitle}>Cómo funciona</h2>
            <p className={styles.sectionSubtitle}>
              Cuatro pasos desde crear la cuenta hasta recibir trabajo.
            </p>
            <Row className="g-4 mt-1">
              {steps.map((step) => (
                <Col key={step.n} sm={6} lg={3}>
                  <div className={styles.card}>
                    <span className={styles.cardEyebrow}>Paso {step.n}</span>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p className={styles.cardText}>{step.text}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className={styles.section}>
          <Container>
            <h2 className={styles.sectionTitle}>Qué puedes publicar</h2>
            <p className={styles.sectionSubtitle}>
              Un mismo sistema de publicaciones, cuatro tipos. Lo que cambia es cómo se comporta
              en tu página.
            </p>
            <Row className="g-4 mt-1">
              {publicationTypes.map((type) => (
                <Col key={type.code} sm={6} lg={3}>
                  <div className={styles.card}>
                    <h3 className={styles.cardTitle}>{type.label}</h3>
                    <p className={styles.cardText}>{type.text}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section id="por-que" className={styles.section}>
          <Container>
            <h2 className={styles.sectionTitle}>Por qué centralizar tu presencia</h2>
            <Row className="g-4 mt-1">
              {reasons.map((reason) => (
                <Col key={reason.n} md={4}>
                  <div className={styles.card}>
                    <span className={styles.cardNumber}>{reason.n}</span>
                    <h3 className={styles.cardTitle}>{reason.title}</h3>
                    <p className={styles.cardText}>{reason.text}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className={styles.section}>
          <Container>
            <div className={styles.ctaBanner}>
              <div>
                <h2 className={styles.ctaTitle}>Arma tu página hoy</h2>
                <p className={styles.ctaText}>
                  Gratis para crear tu perfil y publicar. Sin comisiones en el MVP.
                </p>
              </div>
              <Button as={Link} to={user ? profilePath : '/register'} variant="outline-primary">
                {user ? 'Ir a mi perfil' : 'Crear mi página'}
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <footer className={styles.footer}>
        <Container className={styles.footerInner}>
          <span className={styles.brand}>
            <Diamond size={18} className={styles.brandIcon} />
            MUSYNC
          </span>
          <span className={styles.footerText}>Proyecto final Full Stack — {new Date().getFullYear()}</span>
        </Container>
      </footer>
    </div>
  )
}

export default Landing
