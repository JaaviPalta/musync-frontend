import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'
import StripePattern from '../../components/ui/StripePattern'
import styles from './EditProfile.module.css'

const AVAILABLE_LABEL = 'Disponible para trabajar'
const UNAVAILABLE_LABEL = 'No disponible por ahora'

const EditProfile = () => {
  const { user, updateProfile } = useContext(UserContext)
  const { artistProfile } = user
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      artistName: artistProfile.artistName,
      roleLine: artistProfile.roleLine,
      bio: artistProfile.bio,
      city: artistProfile.city,
      country: artistProfile.country,
      tags: artistProfile.tags.join(', '),
      available: artistProfile.availability === AVAILABLE_LABEL,
      spotifyUrl: artistProfile.spotifyUrl,
      youtubeUrl: artistProfile.youtubeUrl,
      instagramUrl: artistProfile.instagramUrl,
    },
  })

  const preview = watch()

  const onSubmit = (data) => {
    updateProfile({
      artistName: data.artistName,
      roleLine: data.roleLine,
      bio: data.bio,
      city: data.city,
      country: data.country,
      tags: data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      availability: data.available ? AVAILABLE_LABEL : UNAVAILABLE_LABEL,
      spotifyUrl: data.spotifyUrl,
      youtubeUrl: data.youtubeUrl,
      instagramUrl: data.instagramUrl,
    })
    setSaved(true)
  }

  return (
    <div>
      <h1 className={styles.title}>Editar perfil</h1>
      <p className={styles.subtitle}>
        Esta información aparece en musync.com/{artistProfile.username}.
      </p>

      <Row className="g-4 mt-1">
        <Col lg={7}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Nombre artístico</Form.Label>
                  <Form.Control {...register('artistName', { required: true })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Rol / especialidad</Form.Label>
                  <Form.Control
                    placeholder="Productor · Compositor · Vocalista"
                    {...register('roleLine')}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className={styles.field}>
              <Form.Label className={styles.fieldLabel}>Bio</Form.Label>
              <Form.Control as="textarea" rows={4} {...register('bio')} />
            </Form.Group>

            <Row className="g-3">
              <Col md={6}>
                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Ciudad</Form.Label>
                  <Form.Control {...register('city')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>País</Form.Label>
                  <Form.Control {...register('country')} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className={styles.field}>
              <Form.Label className={styles.fieldLabel}>Tags (separados por coma)</Form.Label>
              <Form.Control placeholder="Electrónica, Ambient" {...register('tags')} />
            </Form.Group>

            <Form.Check
              type="switch"
              id="available-switch"
              label="Disponible para trabajar"
              className={styles.field}
              {...register('available')}
            />

            <Row className="g-3">
              <Col md={4}>
                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Spotify</Form.Label>
                  <Form.Control {...register('spotifyUrl')} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>YouTube</Form.Label>
                  <Form.Control {...register('youtubeUrl')} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Instagram</Form.Label>
                  <Form.Control {...register('instagramUrl')} />
                </Form.Group>
              </Col>
            </Row>

            <div className={styles.submitRow}>
              <Button type="submit" variant="primary">
                Guardar cambios
              </Button>
              {saved ? <span className={styles.savedHint}>Cambios guardados ✓</span> : null}
            </div>
          </Form>
        </Col>

        <Col lg={5}>
          <div className={styles.previewCard}>
            <span className={styles.previewLabel}>Vista previa</span>
            <StripePattern tone="neutral" className={styles.previewAvatar} />
            <h3 className={styles.previewName}>{preview.artistName}</h3>
            <p className={styles.previewRole}>{preview.roleLine}</p>
            <p className={styles.previewLocation}>
              {preview.city}
              {preview.country ? `, ${preview.country}` : ''}
            </p>
            <span className={styles.previewBadge}>
              {preview.available ? AVAILABLE_LABEL : UNAVAILABLE_LABEL}
            </span>
            <p className={styles.previewBio}>{preview.bio}</p>
            <div className={styles.previewTags}>
              {preview.tags
                ?.split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span key={tag} className={styles.previewTag}>
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default EditProfile
