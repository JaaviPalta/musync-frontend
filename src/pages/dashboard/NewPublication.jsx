import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button } from 'react-bootstrap'
import StripePattern from '../../components/ui/StripePattern'
import { publications } from '../../mocks/publications'
import { PUBLICATION_TYPE_OPTIONS, priceLabel, PUBLICATION_TYPE_LABELS } from '../../utils/publications'
import styles from './NewPublication.module.css'

const NewPublication = () => {
  const { id } = useParams()
  const existing = id ? publications.find((p) => String(p.id) === id) : null
  const isEdit = Boolean(existing)

  const [type, setType] = useState(existing?.type ?? 'music')
  const [done, setDone] = useState(null)

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      title: existing?.title ?? '',
      description: existing?.description ?? '',
      price: existing?.price ?? '',
      externalUrl: existing?.externalUrl ?? '',
    },
  })

  const preview = watch()

  const onSubmit = () => setDone(isEdit ? 'edit' : 'create')

  return (
    <div>
      <Link to="/dashboard/publications" className={styles.backLink}>
        ← Mis publicaciones
      </Link>
      <h1 className={styles.title}>{isEdit ? 'Editar publicación' : 'Crear publicación'}</h1>
      <p className={styles.subtitle}>
        Una sola entidad para todo lo que publicas. El tipo define qué campos se piden y cómo
        aparece en tu página.
      </p>

      <Row className="g-4 mt-1">
        <Col lg={7}>
          <div className={styles.formCard}>
            {done ? (
              <div className={styles.confirmation}>
                <h2>{done === 'create' ? '¡Publicación creada!' : '¡Cambios guardados!'}</h2>
                <p>
                  {done === 'create'
                    ? 'Ya aparece en tu lista de publicaciones.'
                    : 'Los cambios se guardaron sobre esta publicación.'}
                </p>
                <Link to="/dashboard/publications">Volver a Mis publicaciones</Link>
              </div>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Label className={styles.fieldLabel}>Tipo de publicación</Form.Label>
                <Row className="g-2 mb-3">
                  {PUBLICATION_TYPE_OPTIONS.map((option) => (
                    <Col key={option.code} xs={6}>
                      <button
                        type="button"
                        className={`${styles.typeOption} ${type === option.code ? styles.typeOptionActive : ''}`}
                        onClick={() => setType(option.code)}
                      >
                        <strong>{option.label}</strong>
                        <code>{option.code}</code>
                      </button>
                    </Col>
                  ))}
                </Row>

                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Título</Form.Label>
                  <Form.Control
                    placeholder="Cyberpunk Sample Pack"
                    {...register('title', { required: true })}
                  />
                </Form.Group>

                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Qué incluye, para quién es, formato de entrega."
                    {...register('description')}
                  />
                </Form.Group>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className={styles.field}>
                      <Form.Label className={styles.fieldLabel}>Precio (CLP)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="9900"
                        disabled={type === 'service' || type === 'portfolio'}
                        {...register('price')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className={styles.field}>
                      <Form.Label className={styles.fieldLabel}>Enlace externo (opcional)</Form.Label>
                      <Form.Control placeholder="https://spotify.com/..." {...register('externalUrl')} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Imagen de portada</Form.Label>
                  <div className={styles.dropzone}>Arrastra una imagen o pega una URL</div>
                </Form.Group>

                <div className={styles.submitRow}>
                  <Button type="submit" variant="outline-primary">
                    {isEdit ? 'Guardar cambios' : 'Publicar'}
                  </Button>
                  <Button type="button" variant="outline-secondary">
                    Guardar borrador
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>

        <Col lg={5}>
          <div className={styles.sidebarCard}>
            <span className={styles.sidebarTitle}>Vista previa en tu página</span>
            <StripePattern
              tone={type === 'music' ? 'accent' : 'neutral'}
              className={styles.previewThumb}
            />
            <span className={styles.previewBadge}>{PUBLICATION_TYPE_LABELS[type]}</span>
            <strong className={styles.previewTitle}>
              {preview.title || 'Título de tu publicación'}
            </strong>
            <span className={styles.previewPrice}>
              {priceLabel({ type, price: preview.price ? Number(preview.price) : null })}
            </span>
          </div>

          <div className={styles.sidebarCard}>
            <span className={styles.sidebarTitle}>Qué hace cada tipo</span>
            <p className={styles.sidebarText}>
              {PUBLICATION_TYPE_OPTIONS.find((o) => o.code === type)?.helper}
            </p>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default NewPublication
