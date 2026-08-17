import { Link } from 'react-router-dom'
import StripePattern from '../ui/StripePattern'
import { PUBLICATION_TYPE_LABELS, priceLabel } from '../../utils/publications'
import styles from './PublicationCard.module.css'

const PublicationCard = ({ publication }) => (
  <Link to={`/publication/${publication.id}`} className={styles.card}>
    <StripePattern
      tone={publication.type === 'music' ? 'accent' : 'neutral'}
      className={styles.thumb}
    />
    <span className={styles.badge}>{PUBLICATION_TYPE_LABELS[publication.type]}</span>
    <h3 className={styles.title}>{publication.title}</h3>
    <span className={styles.price}>{priceLabel(publication)}</span>
  </Link>
)

export default PublicationCard
