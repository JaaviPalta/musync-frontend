import { useContext, useEffect, useState } from 'react'
import { QuotesContext } from './QuotesContext'
import { UserContext } from './UserContext'
import { api } from '../lib/api'

// El front trabaja internamente con los estados en español (nueva/en_conversacion/
// aceptada/rechazada, los mismos que usan los filtros y las etiquetas de Quotes.jsx
// y DashboardHome.jsx), pero la base de datos los guarda en inglés
// (pending/reviewed/accepted/rejected). Sin esta traducción en las dos direcciones,
// una cotización recién traída o actualizada desde la API queda con un status que
// ningún filtro reconoce, y por eso no se movía de pestaña hasta recargar la página
// (recargar tampoco lo arreglaba de verdad: solo parecía, porque "Todas" no filtra).
const STATUS_TO_API = {
  nueva: 'pending',
  en_conversacion: 'reviewed',
  aceptada: 'accepted',
  rechazada: 'rejected',
}

const STATUS_FROM_API = {
  pending: 'nueva',
  reviewed: 'en_conversacion',
  accepted: 'aceptada',
  rejected: 'rechazada',
}

const normalizeQuote = (quote) => ({
  ...quote,
  status: STATUS_FROM_API[quote.status] ?? quote.status,
})

const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([])
  const { user } = useContext(UserContext)
  const userId = user?.id

  // Depende de userId (igual que PublicationsProvider), no de un array vacío: así
  // vuelve a pedir las cotizaciones cuando el login termina, en vez de quedarse con
  // el resultado (vacío) del primer chequeo hecho antes de que existiera sesión.
  useEffect(() => {
    if (!userId) {
      setQuotes([])
      return
    }

    api
      .getQuotes()
      .then((data) => setQuotes(data.map(normalizeQuote)))
      .catch(() => setQuotes([]))
  }, [userId])

  const addQuote = async (data) => {
    const quote = normalizeQuote(await api.createQuote(data))
    setQuotes((current) => [quote, ...current])
    return quote
  }

  const setStatus = async (id, status) => {
    const quote = normalizeQuote(
      await api.updateQuoteStatus(id, STATUS_TO_API[status] || status),
    )
    setQuotes((current) => current.map((q) => (q.id === id ? quote : q)))
  }

  return (
    <QuotesContext.Provider value={{ quotes, addQuote, setStatus }}>
      {children}
    </QuotesContext.Provider>
  )
}

export default QuotesProvider
