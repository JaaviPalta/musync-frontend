import { useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import StripePattern from '../../components/ui/StripePattern'
import { UserContext } from '../../context/UserContext'
import { PublicationsContext } from '../../context/PublicationsContext'
import { QuotesContext } from '../../context/QuotesContext'
import styles from './RequestQuote.module.css'

const requestTypes = ['Servicio musical', 'Evento / Show', 'Colaboración', 'Otro']

const RequestQuote = () => {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const artistProfile = user?.artistProfile ?? { username: 'demo', artistName: 'el artista' }
  const { publications } = useContext(PublicationsContext)
  const { addQuote } = useContext(QuotesContext)
  const publication = id ? publications.find((p) => String(p.id) === id) : null

  const [requestType, setRequestType] = useState(requestTypes[0])
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    addQuote({
      publicationId: publication?.id ?? null,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      budget: data.budget ? Number(data.budget.replace(/\D/g, '')) || null : null,
      category: requestType,
      subcategory: publication?.title ?? null,
      message: data.message,
    })
    setSubmitted(true)
    toast.success('Solicitud enviada')
  }

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
