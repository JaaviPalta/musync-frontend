import { useState } from 'react'
import { QuotesContext } from './QuotesContext'
import { quotes as initialQuotes } from '../mocks/quotes'

const QuotesProvider = ({ children }) => {
  const [quotes, setQuotes] = useState(initialQuotes)

  const addQuote = (data) => {
    const quote = {
      id: Date.now(),
      createdLabel: 'justo ahora',
      status: 'nueva',
      ...data,
    }
    setQuotes((current) => [quote, ...current])
    return quote
  }

  const setStatus = (id, status) => {
    setQuotes((current) => current.map((q) => (q.id === id ? { ...q, status } : q)))
  }

  return (
    <QuotesContext.Provider value={{ quotes, addQuote, setStatus }}>
      {children}
    </QuotesContext.Provider>
  )
}

export default QuotesProvider
