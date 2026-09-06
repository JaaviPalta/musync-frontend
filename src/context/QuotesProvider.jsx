import { useContext, useEffect, useState } from 'react'
import { QuotesContext } from './QuotesContext'
import { UserContext } from './UserContext'
import { api } from '../lib/api'
import { QUOTE_STATUS_TO_API, QUOTE_STATUS_FROM_API } from '../utils/quotes'

const normalizeQuote = (quote) => ({
  ...quote,
  status: QUOTE_STATUS_FROM_API[quote.status] ?? quote.status,
})

const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([])
  const [loadedUserId, setLoadedUserId] = useState(null)
  const { user } = useContext(UserContext)
  const userId = user?.id

  // Depende de userId (igual que PublicationsProvider), no de un array vacío: así
  // vuelve a pedir las cotizaciones cuando el login termina, en vez de quedarse con
  // el resultado (vacío) del primer chequeo hecho antes de que existiera sesión.
  useEffect(() => {
    if (!userId) return

    api
      .getQuotes()
      .then((data) => {
        setQuotes(data.map(normalizeQuote))
        setLoadedUserId(userId)
      })
      .catch(() => {
        setQuotes([])
        setLoadedUserId(userId)
      })
  }, [userId])

  const visibleQuotes = user && loadedUserId === userId ? quotes : []

  const addQuote = async (data) => {
    const quote = normalizeQuote(await api.createQuote(data))
    setQuotes((current) => [quote, ...current])
    return quote
  }

  const setStatus = async (id, status) => {
    const quote = normalizeQuote(
      await api.updateQuoteStatus(id, QUOTE_STATUS_TO_API[status] || status),
    )
    setQuotes((current) => current.map((q) => (q.id === id ? quote : q)))
  }

  // El backend cambia el status solo (pending → reviewed) apenas alguien manda
  // el primer mensaje en el chat de una cotización — eso no pasa por setStatus,
  // así que después de mandar un mensaje hay que refrescar para que la pestaña
  // que la muestra ("Nuevas" → "En conversación") lo refleje sin recargar.
  const refreshQuotes = async () => {
    if (!userId) return
    const data = await api.getQuotes()
    setQuotes(data.map(normalizeQuote))
    setLoadedUserId(userId)
  }

  return (
    <QuotesContext.Provider value={{ quotes: visibleQuotes, addQuote, setStatus, refreshQuotes }}>
      {children}
    </QuotesContext.Provider>
  )
}

export default QuotesProvider
