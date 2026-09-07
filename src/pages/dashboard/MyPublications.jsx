import { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Table } from 'react-bootstrap'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import StripePattern from '../../components/ui/StripePattern'
import { PublicationsContext } from '../../context/PublicationsContext'
import { confirmDialog } from '../../lib/swal'
import {
  DASHBOARD_PUBLICATION_FILTERS,
  PUBLICATION_STATUS_LABELS,
  PUBLICATION_TYPE_LABELS,
  priceLabel,
} from '../../utils/publications'
import styles from './MyPublications.module.css'

const MyPublications = () => {
  const { publications, removePublication } = useContext(PublicationsContext)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      publications
        .filter((p) => filter === 'all' || p.type === filter)
        .filter((p) => p.title.toLowerCase().includes(search.trim().toLowerCase())),
    [publications, filter, search],
  )

  const handleDelete = async (pub) => {
    const confirmed = await confirmDialog({
      title: `¿Eliminar "${pub.title}"?`,
      text: 'Esta acción no se puede deshacer.',
      confirmText: 'Sí, eliminar',
      danger: true,
    })
    if (!confirmed) return
    removePublication(pub.id)
    toast.success('Publicación eliminada')
  }

  return (
    <div>
      <h1 className={styles.title}>Mis publicaciones</h1>
      <p className={styles.subtitle}>Música, productos digitales, servicios y portafolio en una sola lista.</p>

      <Button as={Link} to="/dashboard/publications/new" variant="outline-primary" className="mb-4">
        Nueva publicación
      </Button>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {DASHBOARD_PUBLICATION_FILTERS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`${styles.filterBtn} ${filter === item.key ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Form.Control
          type="search"
          placeholder="Buscar en mis publicaciones"
          className={styles.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableWrap}>
        <Table responsive className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((pub) => (
              <tr key={pub.id}>
                <td>
                  <div className={styles.titleCell}>
                    <StripePattern
                      tone={pub.type === 'music' ? 'accent' : 'neutral'}
                      className={styles.thumb}
                    />
                    {pub.title}
                  </div>
                </td>
                <td>
                  <span className={styles.typeBadge}>{PUBLICATION_TYPE_LABELS[pub.type]}</span>
                </td>
                <td>{priceLabel(pub)}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${pub.status === 'borrador' ? styles.statusDraft : ''}`}
                  >
                    {PUBLICATION_STATUS_LABELS[pub.status]}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link to={`/publication/${pub.id}`} aria-label={`Ver ${pub.title}`}>
                      <Eye size={16} />
                    </Link>
                    <Link
                      to={`/dashboard/publications/${pub.id}/edit`}
                      aria-label={`Editar ${pub.title}`}
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Eliminar ${pub.title}`}
                      onClick={() => handleDelete(pub)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {filtered.length === 0 ? <p className={styles.emptyState}>No hay publicaciones para este filtro.</p> : null}
      </div>

      <p className={styles.footerHint}>{publications.length} publicaciones</p>
    </div>
  )
}

export default MyPublications
