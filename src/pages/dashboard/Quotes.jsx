import { useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { quotes as initialQuotes } from '../../mocks/quotes'
import { QUOTE_FILTERS, QUOTE_STATUS_LABELS } from '../../utils/quotes'
import styles from './Quotes.module.css'

const Quotes = () => {
  const [quotes, setQuotes] = useState(initialQuotes)
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? quotes : quotes.filter((q) => q.status === filter)),
    [quotes, filter],
  )

  const setStatus = (id, status) => {
    setQuotes((current) => current.map((q) => (q.id === id ? { ...q, status } : q)))
  }

  return (
    <div>
      <h1 className={styles.title}>Cotizaciones y contrataciones</h1>
      <p className={styles.subtitle}>
        Todas las solicitudes llegan al mismo lugar, sin importar si son por un servicio, un show
        o una colaboración.
      </p>

      <div className={styles.filters}>
        {QUOTE_FILTERS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`${styles.filterBtn} ${filter === item.key ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.emptyState}>No hay cotizaciones en este filtro.</p>
      ) : (
        filtered.map((quote) => (
          <div key={quote.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <strong className={styles.clientName}>{quote.clientName}</strong>
                <span className={`${styles.statusBadge} ${styles[`status_${quote.status}`]}`}>
                  {QUOTE_STATUS_LABELS[quote.status]}
                </span>
                <p className={styles.contactLine}>
                  {quote.clientEmail} · {quote.createdLabel}
                </p>
              </div>
              <div className={styles.budget}>
                <span>Presupuesto</span>
                <strong>{quote.budget ? `$${quote.budget.toLocaleString('es-CL')}` : 'Abierto'}</strong>
              </div>
            </div>

            <div className={styles.tags}>
              <span className={styles.tag}>{quote.category}</span>
              {quote.subcategory ? <span className={styles.tagMuted}>{quote.subcategory}</span> : null}
            </div>

            <p className={styles.message}>{quote.message}</p>

            <div className={styles.actions}>
              <Button
                as="a"
                href={`mailto:${quote.clientEmail}`}
                variant="outline-primary"
                size="sm"
              >
                Responder
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={quote.status === 'aceptada'}
                onClick={() => setStatus(quote.id, 'aceptada')}
              >
                Marcar aceptada
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={quote.status === 'rechazada'}
                onClick={() => setStatus(quote.id, 'rechazada')}
              >
                Rechazar
              </Button>
            </div>
          </div>
        ))
      )}

      <p className={styles.footerHint}>
        Estados en <code>quotes.status</code>: nueva · en_conversacion · aceptada · rechazada
      </p>
    </div>
  )
}

export default Quotes
