import { useParams } from 'react-router-dom'

const RequestQuote = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Solicitar cotización</h1>
      <p>Ruta: /publication/:id/cotizar → {id}</p>
    </div>
  )
}

export default RequestQuote
