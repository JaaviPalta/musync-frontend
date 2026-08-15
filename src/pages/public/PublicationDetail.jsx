import { useParams } from 'react-router-dom'

const PublicationDetail = () => {
  const { id } = useParams()

  return (
    <div>
      <h1>Detalle de publicación</h1>
      <p>Ruta: /publication/:id → {id}</p>
    </div>
  )
}

export default PublicationDetail
