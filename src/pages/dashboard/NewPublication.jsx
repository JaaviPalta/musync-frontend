import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import StripePattern from '../../components/ui/StripePattern'
import { PublicationsContext } from '../../context/PublicationsContext'
import {
  PUBLICATION_TYPE_OPTIONS,
  PUBLICATION_FIELD_PLACEHOLDERS,
  priceLabel,
  PUBLICATION_TYPE_LABELS,
} from '../../utils/publications'
import { formatThousands } from '../../utils/format'
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
      externalUrl: existing?.externalUrl ?? '',
      image: undefined,
    },
  })

  const preview = watch()
  const selectedImage = preview.image?.[0]
  const [imagePreview, setImagePreview] = useState(existing?.imageUrl ?? null)
  // El precio queda completamente afuera de react-hook-form: si el formateo
  // con puntos dependiera de su watch()/setValue, hay dos sistemas de estado
  // sincronizándose entre sí en cada tecla, y escribiendo rápido se pierden
  // dígitos (probado: "45000" tecleado rápido terminaba guardando "45").
  // Un solo useState no tiene ese problema, no hay nada con quién correr.
  const [priceDigits, setPriceDigits] = useState(existing?.price != null ? String(existing.price) : '')

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
      price: type === 'portfolio' ? null : priceDigits ? Number(priceDigits) : null,
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
                      </button>
                    </Col>
                  ))}
                </Row>

                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Título</Form.Label>
                  <Form.Control
                    placeholder={PUBLICATION_FIELD_PLACEHOLDERS[type].title}
                    {...register('title', { required: true })}
                  />
                </Form.Group>

                <Form.Group className={styles.field}>
                  <Form.Label className={styles.fieldLabel}>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder={PUBLICATION_FIELD_PLACEHOLDERS[type].description}
                    {...register('description')}
                  />
                </Form.Group>

                <Row className="g-3">
                  {type !== 'portfolio' ? (
                    <Col md={6}>
                      <Form.Group className={styles.field}>
                        <Form.Label className={styles.fieldLabel}>Precio (CLP)</Form.Label>
                        <div className={styles.priceRow}>
                          <Form.Control
                            type="text"
                            name="price"
                            inputMode="numeric"
                            placeholder="9.900"
                            value={formatThousands(priceDigits)}
                            onChange={(event) => setPriceDigits(event.target.value.replace(/\D/g, ''))}
                          />
                          {type === 'service' ? (
                            <Button
                              type="button"
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => setPriceDigits('')}
                            >
                              Cotizar
                            </Button>
                          ) : null}
                        </div>
                        {type === 'service' && !priceDigits ? (
                          <small className={styles.priceHint}>
                            Sin precio fijo: en tu página se muestra "Solicitar cotización".
                          </small>
                        ) : null}
                      </Form.Group>
                    </Col>
                  ) : null}
                  <Col md={type !== 'portfolio' ? 6 : 12}>
                    <Form.Group className={styles.field}>
                      <Form.Label className={styles.fieldLabel}>
                        {type === 'music' || type === 'portfolio'
                          ? 'Link de Spotify o YouTube'
                          : 'Enlace externo (opcional)'}
                      </Form.Label>
                      <Form.Control
                        placeholder={
                          type === 'music' || type === 'portfolio'
                            ? 'https://open.spotify.com/track/... o https://youtube.com/watch?v=...'
                            : 'https://spotify.com/...'
                        }
                        {...register('externalUrl')}
                      />
                      {type === 'music' || type === 'portfolio' ? (
                        <small className={styles.priceHint}>
                          Se muestra reproducible directo en tu página, sin sacar al visitante.
                        </small>
                      ) : null}
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
              {priceLabel({ type, price: priceDigits ? Number(priceDigits) : null })}
            </span>
          </div>

          <div className={styles.sidebarCard}>
            <span className={styles.sidebarTitle}>{PUBLICATION_TYPE_LABELS[type]}</span>
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
