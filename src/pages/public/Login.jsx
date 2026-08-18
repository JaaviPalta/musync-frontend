import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import { UserContext } from '../../context/UserContext'
import { currentUser } from '../../mocks/user'
import styles from './Auth.module.css'

const Login = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {
    login()
    navigate('/dashboard')
    toast.success(`¡Bienvenido de nuevo, ${currentUser.artistProfile.artistName}!`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Inicia sesión</h1>
        <p className={styles.subtitle}>Entra a tu cuenta para administrar tu página.</p>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className={styles.field}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="tu@email.com"
              isInvalid={!!errors.email}
              {...register('email', { required: 'Ingresa tu email' })}
            />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.field}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              isInvalid={!!errors.password}
              {...register('password', { required: 'Ingresa tu contraseña' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className={styles.submit}>
            Iniciar sesión
          </Button>
        </Form>

        <p className={styles.footerText}>
          ¿No tienes cuenta? <Link to="/register">Crea tu página</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
