export const PUBLICATION_TYPE_LABELS = {
  music: 'Música',
  digital_product: 'Producto digital',
  service: 'Servicio',
  portfolio: 'Portafolio',
}

export const PROFILE_FILTERS = [
  { key: 'all', label: 'Todo' },
  { key: 'music', label: 'Música' },
  { key: 'digital_product', label: 'Tienda' },
  { key: 'service', label: 'Servicios' },
  { key: 'portfolio', label: 'Portafolio' },
]

export const formatPrice = (price) =>
  price == null ? null : `$${price.toLocaleString('es-CL')}`

export const priceLabel = (publication) => {
  if (publication.price != null) return formatPrice(publication.price)
  if (publication.type === 'service') return 'A cotizar'
  return '—'
}
