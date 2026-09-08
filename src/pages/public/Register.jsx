import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'sonner'
import { UserContext } from '../../context/UserContext'
import styles from './Auth.module.css'

const Register = () => {
  const { register: createAccount } = useContext(UserContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await createAccount({
      name: data.artistName,
      artistName: data.artistName,
      username: data.artistName.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
      email: data.email,
      password: data.password,
      role: data.role,
    })
    navigate('/dashboard')
    toast.success(`¡Cuenta creada! Bienvenido/a, ${data.artistName}.`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crea tu página</h1>
        <p className={styles.subtitle}>Gratis para crear tu perfil y publicar.</p>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className={styles.field}>
            <Form.Label>Nombre artístico</Form.Label>
            <Form.Control
              type="text"
              placeholder="ERAMI"
              isInvalid={!!errors.artistName}
              {...register('artistName', { required: 'Ingresa tu nombre artístico' })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.artistName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.field}>
            <Form.Label>Rol</Form.Label>
            <Form.Select
              defaultValue="artist"
              isInvalid={!!errors.role}
              {...register('role', { required: 'Selecciona un rol' })}
            >
              <option value="artist">Artista</option>
              <option value="client">Cliente</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.role?.message}</Form.Control.Feedback>
          </Form.Group>

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
              {...register('password', {
                required: 'Ingresa una contraseña',
                minLength: { value: 6, message: 'Mínimo 6 caracteres' },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={styles.field}>
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              isInvalid={!!errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Confirma tu contraseña',
                validate: (value) =>
                  value === getValues('password') || 'Las contraseñas no coinciden',
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" className={styles.submit}>
            Crear mi página
          </Button>
        </Form>

        <p className={styles.footerText}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
