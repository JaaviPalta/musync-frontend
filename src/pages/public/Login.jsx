import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import { UserContext } from '../../context/UserContext'
import styles from './Auth.module.css'

const Login = () => {
  const { login } = useContext(UserContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const getLoginErrorMessage = (error) => {
    const message = error?.message?.toLowerCase() || ''

    if (message.includes('email') || message.includes('usuario')) {
      return 'No encontramos una cuenta con ese email.'
    }

    if (message.includes('password') || message.includes('contraseña')) {
      return 'La contraseña es incorrecta. Verifícala e inténtalo otra vez.'
    }

    if (message.includes('fetch') || message.includes('network') || message.includes('failed to fetch')) {
      return 'No pudimos conectar con el servidor. Inténtalo más tarde.'
    }

    return 'Credenciales incorrectas. Verifica tu email y contraseña.'
  }

  const onSubmit = async (data) => {
    try {
      await login(data)
      navigate('/dashboard')
      toast.success('¡Bienvenido de nuevo!')
    } catch (error) {
      toast.error(getLoginErrorMessage(error))
    }
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
