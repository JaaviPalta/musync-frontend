import { useParams } from 'react-router-dom'

const PublicProfile = () => {
  const { username } = useParams()

  return (
    <div>
      <h1>Perfil público</h1>
      <p>Ruta: /artista/:username → {username}</p>
    </div>
  )
}

export default PublicProfile
