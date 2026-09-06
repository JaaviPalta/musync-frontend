import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Form, Button, Spinner } from 'react-bootstrap'
import { toast } from 'sonner'
import { api } from '../../lib/api'
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_FROM_API } from '../../utils/quotes'
import styles from './QuoteTracking.module.css'

// No hay WebSockets acá a propósito (ver conversación sobre el chat): mientras
// esta pantalla está abierta, refresca el hilo cada pocos segundos para que
// las respuestas del artista aparezcan sin que el cliente tenga que recargar.
const POLL_INTERVAL_MS = 6000

const QuoteTracking = () => {
  const { token } = useParams()
  const [quote, setQuote] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const loadQuote = () => {
      api
        .getTrackedQuote(token)
        .then((data) => {
          if (!cancelled) setQuote(data)
        })
        .catch(() => {
          if (!cancelled) setNotFound(true)
        })
    }

    loadQuote()
    const interval = setInterval(loadQuote, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [token])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [quote?.messages?.length])

  const handleSend = async (event) => {
    event.preventDefault()
    const trimmed = body.trim()
    if (!trimmed) return

    setSending(true)
    try {
      await api.sendTrackedMessage(token, trimmed)
      setBody('')
      const refreshed = await api.getTrackedQuote(token)
      setQuote(refreshed)
    } catch (error) {
      toast.error(error.message || 'No se pudo enviar el mensaje')
    } finally {
      setSending(false)
    }
  }

  if (notFound) {
    return (
      <Container className={styles.notFound}>
        <h1>No encontramos esta conversación</h1>
        <p>Revisa que el link sea exactamente el mismo que te llegó por correo.</p>
        <Link to="/">Volver al inicio</Link>
      </Container>
    )
  }

  if (!quote) {
    return (
      <Container className={styles.loading}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando…</span>
        </Spinner>
      </Container>
    )
  }

  const statusEs = QUOTE_STATUS_FROM_API[quote.status] ?? quote.status

  return (
    <Container className={styles.page}>
      <span className={styles.eyebrow}>Conversación con</span>
      <h1 className={styles.title}>{quote.artistProfile.artistName}</h1>
      <span className={`${styles.statusBadge} ${styles[`status_${statusEs}`]}`}>
        {QUOTE_STATUS_LABELS[statusEs] ?? statusEs}
      </span>

      {quote.publication ? (
        <p className={styles.subtitle}>Sobre: {quote.publication.title}</p>
      ) : null}

      <div className={styles.thread}>
        <div className={`${styles.bubble} ${styles.bubbleClient}`}>
          <strong>{quote.clientName}</strong>
          <p>{quote.message}</p>
        </div>

        {quote.messages.map((item) => (
          <div
            key={item.id}
            className={`${styles.bubble} ${
              item.sender === 'artist' ? styles.bubbleArtist : styles.bubbleClient
            }`}
          >
            <strong>{item.sender === 'artist' ? quote.artistProfile.artistName : quote.clientName}</strong>
            <p>{item.body}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <Form onSubmit={handleSend} className={styles.replyForm}>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Escribe tu respuesta..."
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <Button type="submit" variant="outline-primary" disabled={sending || !body.trim()}>
          {sending ? 'Enviando…' : 'Enviar'}
        </Button>
      </Form>
    </Container>
  )
}

export default QuoteTracking
