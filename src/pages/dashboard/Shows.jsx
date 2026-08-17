import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Trash2 } from 'lucide-react'
import { upcomingShows as initialUpcoming, pastShows as initialPast } from '../../mocks/shows'
import styles from './Shows.module.css'

const Shows = () => {
  const [upcoming, setUpcoming] = useState(initialUpcoming)
  const [past, setPast] = useState(initialPast)
  const { register, handleSubmit, reset } = useForm()

  const addShow = (data) => {
    setUpcoming((current) => [
      ...current,
      { id: Date.now(), name: data.name, city: data.city, date: data.date },
    ])
    reset()
  }

  const removeUpcoming = (id) => setUpcoming((current) => current.filter((s) => s.id !== id))
  const removePast = (id) => setPast((current) => current.filter((s) => s.id !== id))

  return (
    <div>
      <h1 className={styles.title}>Shows</h1>
      <p className={styles.subtitle}>
        Próximos shows y trayectoria anterior. Sin venta de entradas en el MVP.
      </p>

      <Row className="g-4 mt-1">
        <Col lg={7}>
          <div className={styles.panel}>
            <span className={styles.panelTitle}>Próximos shows</span>
            {upcoming.length === 0 ? (
              <p className={styles.emptyState}>No tienes shows agendados.</p>
            ) : (
              upcoming.map((show) => (
                <div key={show.id} className={styles.item}>
                  <div>
                    <strong>{show.name}</strong>
                    <span className={styles.itemMeta}>
                      {new Date(show.date).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      · {show.city}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Quitar ${show.name}`}
                    onClick={() => removeUpcoming(show.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}

            <Form onSubmit={handleSubmit(addShow)} className={styles.addForm}>
              <Row className="g-2">
                <Col md={5}>
                  <Form.Control
                    placeholder="Nombre del show"
                    {...register('name', { required: true })}
                  />
                </Col>
                <Col md={4}>
                  <Form.Control placeholder="Ciudad, país" {...register('city', { required: true })} />
                </Col>
                <Col md={2}>
                  <Form.Control type="date" {...register('date', { required: true })} />
                </Col>
                <Col md={1}>
                  <Button type="submit" variant="outline-primary" className={styles.addBtn}>
                    +
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>

        <Col lg={5}>
          <div className={styles.panel}>
            <span className={styles.panelTitle}>Shows anteriores</span>
            {past.length === 0 ? (
              <p className={styles.emptyState}>Sin trayectoria cargada todavía.</p>
            ) : (
              past.map((show) => (
                <div key={show.id} className={styles.item}>
                  <span>
                    {show.name} · {show.dateLabel}
                  </span>
                  <button
                    type="button"
                    aria-label={`Quitar ${show.name}`}
                    onClick={() => removePast(show.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Shows
