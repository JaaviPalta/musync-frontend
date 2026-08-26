import { useEffect, useState } from 'react'
import { QuotesContext } from './QuotesContext'
import { api } from '../lib/api'

const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    if (localStorage.getItem('musync_token')) api.getQuotes().then(setQuotes).catch(() => {})
  }, [])

  const addQuote = async (data) => {
    const quote = await api.createQuote(data)
    setQuotes((current) => [quote, ...current])
    return quote
  }

  const setStatus = async (id, status) => {
    const statusMap = { nueva: 'pending', en_conversacion: 'reviewed', aceptada: 'accepted', rechazada: 'rejected' }
    const quote = await api.updateQuoteStatus(id, statusMap[status] || status)
    setQuotes((current) => current.map((q) => (q.id === id ? quote : q)))
  }

  return (
    <QuotesContext.Provider value={{ quotes, addQuote, setStatus }}>
      {children}
    </QuotesContext.Provider>
  )
}

export default QuotesProvider
