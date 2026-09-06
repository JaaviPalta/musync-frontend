import { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import { api } from '../../lib/api'
import styles from './QuoteThread.module.css'

// Mismo enfoque que la página pública de seguimiento: sin WebSockets, solo
// refresca cada pocos segundos mientras el panel está abierto.
const POLL_INTERVAL_MS = 6000

const QuoteThread = ({ quoteId, artistName, onMessageSent }) => {
  const [messages, setMessages] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const load = () => {
      api
        .getQuoteMessages(quoteId)
        .then((data) => {
          if (!cancelled) {
            setMessages(data)
            setLoaded(true)
          }
        })
        .catch(() => {})
    }

    load()
    const interval = setInterval(load, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [quoteId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const handleSend = async (event) => {
    event.preventDefault()
    const trimmed = body.trim()
    if (!trimmed) return

    setSending(true)
    try {
      await api.sendQuoteMessage(quoteId, trimmed)
      setBody('')
      const refreshed = await api.getQuoteMessages(quoteId)
      setMessages(refreshed)
      onMessageSent?.()
    } catch (error) {
      toast.error(error.message || 'No se pudo enviar el mensaje')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.thread}>
        {!loaded ? (
          <p className={styles.hint}>Cargando conversación…</p>
        ) : messages.length === 0 ? (
          <p className={styles.hint}>Todavía no hay mensajes. Escribe el primero.</p>
        ) : (
          messages.map((item) => (
            <div
              key={item.id}
              className={`${styles.bubble} ${
                item.sender === 'artist' ? styles.bubbleArtist : styles.bubbleClient
              }`}
            >
              <strong>{item.sender === 'artist' ? artistName : 'Cliente'}</strong>
              <p>{item.body}</p>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <Form onSubmit={handleSend} className={styles.replyForm}>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Escribe tu respuesta..."
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <Button type="submit" variant="outline-primary" size="sm" disabled={sending || !body.trim()}>
          {sending ? 'Enviando…' : 'Enviar'}
        </Button>
      </Form>
    </div>
  )
}

export default QuoteThread
