import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import StripePattern from '../../components/ui/StripePattern'
import { PublicationsContext } from '../../context/PublicationsContext'
import { PUBLICATION_TYPE_OPTIONS, priceLabel, PUBLICATION_TYPE_LABELS } from '../../utils/publications'
import styles from './NewPublication.module.css'

const NewPublication = () => {
  const { id } = useParams()
  const { publications, addPublication, updatePublication } = useContext(PublicationsContext)
  const existing = id ? publications.find((p) => String(p.id) === id) : null
  const isEdit = Boolean(existing)

  const [type, setType] = useState(existing?.type ?? 'music')
  const [done, setDone] = useState(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: existing?.title ?? '',
      description: existing?.description ?? '',
      price: existing?.price ?? '',
      externalUrl: existing?.externalUrl ?? '',
      image: undefined,
    },
  })

  const preview = watch()
  const selectedImage = preview.image?.[0]
  const [imagePreview, setImagePreview] = useState(existing?.imageUrl ?? null)

  useEffect(() => {
    if (!selectedImage) return
    const objectUrl = URL.createObjectURL(selectedImage)
    setImagePreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  const onSubmit = async (data, status) => {
    const patch = {
      type,
      title: data.title,
      description: data.description,
      price: data.price ? Number(data.price) : null,
      externalUrl: data.externalUrl || null,
      imageUrl: existing?.imageUrl ?? null,
      image: data.image?.[0],
      status,
    }
    try {
      if (isEdit) {
        await updatePublication(existing.id, patch)
      } else {
        await addPublication(patch)
      }
      setDone(isEdit ? 'edit' : 'create')
      toast.success(
        status === 'borrador'
          ? 'Borrador guardado'
          : isEdit
            ? 'Cambios guardados'
            : 'Publicación creada',
      )
    } catch (error) {
      toast.error(error.message || 'No se pudo guardar la publicación')
    }
  }

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
              <Form onSubmit={(e) => e.preventDefault()}>
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
                  <label className={styles.dropzone}>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      {...register('image', {
                        validate: (files) => !files?.[0] || files[0].size <= 5 * 1024 * 1024 || 'La imagen no puede superar 5 MB',
                      })}
                    />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Vista previa de portada" className={styles.imagePreview} />
                    ) : (
                      <span>Selecciona una imagen JPG, PNG o WebP (máximo 5 MB)</span>
                    )}
                  </label>
                  {errors.image ? <small className={styles.error}>{errors.image.message}</small> : null}
                </Form.Group>

                <div className={styles.submitRow}>
                  <Button
                    type="button"
                    variant="outline-primary"
                    onClick={handleSubmit((data) => onSubmit(data, 'publicada'))}
                  >
                    {isEdit ? 'Guardar cambios' : 'Publicar'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={handleSubmit((data) => onSubmit(data, 'borrador'))}
                  >
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
            {imagePreview ? (
              <img src={imagePreview} alt="Vista previa de portada" className={styles.previewThumb} />
            ) : (
              <StripePattern
                tone={type === 'music' ? 'accent' : 'neutral'}
                className={styles.previewThumb}
              />
            )}
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
