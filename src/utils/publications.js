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

export const DASHBOARD_PUBLICATION_FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'music', label: 'Música' },
  { key: 'digital_product', label: 'Productos digitales' },
  { key: 'service', label: 'Servicios' },
  { key: 'portfolio', label: 'Portafolio' },
]

export const PUBLICATION_STATUS_LABELS = {
  publicada: 'Publicada',
  borrador: 'Borrador',
}

export const PUBLICATION_TYPE_OPTIONS = [
  {
    code: 'music',
    label: 'Música',
    helper: 'Aparece en tu música y puede enlazar a Spotify o YouTube.',
  },
  {
    code: 'digital_product',
    label: 'Producto digital',
    helper:
      'Aparece en tu tienda y puede agregarse al carrito. Al finalizar la compra se crea una orden.',
  },
  {
    code: 'service',
    label: 'Servicio',
    helper: 'Muestra el botón "Solicitar cotización" en vez de un precio de compra.',
  },
  {
    code: 'portfolio',
    label: 'Portafolio',
    helper: 'Se exhibe como trabajo de muestra, sin precio ni acciones de compra.',
  },
]

export const formatPrice = (price) =>
  price == null ? null : `$${price.toLocaleString('es-CL')}`

export const priceLabel = (publication) => {
  if (publication.price != null) return formatPrice(publication.price)
  if (publication.type === 'service') return 'A cotizar'
  return '—'
}
