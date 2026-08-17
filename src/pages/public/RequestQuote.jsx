import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import StripePattern from '../../components/ui/StripePattern'
import { currentUser } from '../../mocks/user'
import { publications } from '../../mocks/publications'
import styles from './RequestQuote.module.css'

const requestTypes = ['Servicio musical', 'Evento / Show', 'Colaboración', 'Otro']

const RequestQuote = () => {
  const { id } = useParams()
  const { artistProfile } = currentUser
  const publication = id ? publications.find((p) => String(p.id) === id) : null

  const [requestType, setRequestType] = useState(requestTypes[0])
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = () => setSubmitted(true)

  return (
    <div className={styles.page}>
      <Link to={`/artista/${artistProfile.username}`} className={styles.backLink}>
        ← Volver a musync.com/{artistProfile.username}
      </Link>

      <h1 className={styles.title}>Solicitar cotización</h1>
      <p className={styles.subtitle}>
        El mismo formulario cubre servicios, shows y colaboraciones. {artistProfile.artistName}{' '}
        recibe tu solicitud en su bandeja.
      </p>

      {publication ? (
        <div className={styles.publicationCard}>
          <StripePattern tone="neutral" className={styles.publicationThumb} />
          <div>
            <span className={styles.publicationEyebrow}>Sobre la publicación</span>
            <strong>
              {publication.title} · {artistProfile.artistName}
            </strong>
          </div>
        </div>
      ) : null}

      <div className={styles.formCard}>
        {submitted ? (
          <div className={styles.confirmation}>
            <h2>¡Solicitud enviada!</h2>
            <p>
              {artistProfile.artistName} revisará tu mensaje y te responderá al email que
              dejaste. Se guardó con estado <strong>nueva</strong>.
            </p>
            <Link to={`/artista/${artistProfile.username}`}>
              Volver a musync.com/{artistProfile.username}
            </Link>
          </div>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Label className={styles.fieldLabel}>Tipo de solicitud</Form.Label>
            <div className={styles.typeOptions}>
              {requestTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${styles.typeBtn} ${requestType === type ? styles.typeBtnActive : ''}`}
                  onClick={() => setRequestType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className={styles.row}>
              <Form.Group className={styles.field}>
                <Form.Label className={styles.fieldLabel}>Tu nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Estudio Andes"
                  isInvalid={!!errors.clientName}
                  {...register('clientName', { required: 'Ingresa tu nombre' })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.clientName?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className={styles.field}>
                <Form.Label className={styles.fieldLabel}>Email de contacto</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="contacto@estudioandes.cl"
                  isInvalid={!!errors.clientEmail}
                  {...register('clientEmail', { required: 'Ingresa tu email' })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.clientEmail?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className={styles.field}>
              <Form.Label className={styles.fieldLabel}>Presupuesto aproximado (opcional)</Form.Label>
              <Form.Control type="text" placeholder="$400.000 CLP" {...register('budget')} />
            </Form.Group>

            <Form.Group className={styles.field}>
              <Form.Label className={styles.fieldLabel}>Cuéntale de qué se trata</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Alcance, referencias, plazos y cualquier detalle que ayude a cotizar."
                isInvalid={!!errors.message}
                {...register('message', { required: 'Cuéntale de qué se trata' })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className={styles.submitRow}>
              <Button type="submit" variant="outline-primary">
                Enviar solicitud
              </Button>
              <span className={styles.submitHint}>
                Se guarda con estado <strong>nueva</strong>
              </span>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}

export default RequestQuote
