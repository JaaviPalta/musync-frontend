import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const Login = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()

  const handleMockLogin = () => {
    login()
    navigate('/dashboard')
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Ruta: /login</p>
      <button type="button" onClick={handleMockLogin}>
        Iniciar sesión (mock)
      </button>
    </div>
  )
}

export default Login
