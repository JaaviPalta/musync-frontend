import { useContext, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'sonner'
import { QuotesContext } from '../../context/QuotesContext'
import { confirmDialog } from '../../lib/swal'
import { QUOTE_FILTERS, QUOTE_STATUS_LABELS } from '../../utils/quotes'
import styles from './Quotes.module.css'

const Quotes = () => {
  const { quotes, setStatus } = useContext(QuotesContext)
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? quotes : quotes.filter((q) => q.status === filter)),
    [quotes, filter],
  )

  const handleAccept = (quote) => {
    setStatus(quote.id, 'aceptada')
    toast.success(`Cotización de ${quote.clientName} aceptada`)
  }

  const handleReject = async (quote) => {
    const confirmed = await confirmDialog({
      title: `¿Rechazar la solicitud de ${quote.clientName}?`,
      text: 'Podrás revisarla igual desde el filtro "Rechazadas".',
      confirmText: 'Sí, rechazar',
      danger: true,
    })
    if (!confirmed) return
    setStatus(quote.id, 'rechazada')
    toast.success('Solicitud rechazada')
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
                onClick={() => handleAccept(quote)}
              >
                Marcar aceptada
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={quote.status === 'rechazada'}
                onClick={() => handleReject(quote)}
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
