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
    helper:
      'Para tus canciones, remixes o EPs. Si pegás un link de Spotify o YouTube, queda reproducible directo en tu página, sin que nadie tenga que salir de ahí.',
  },
  {
    code: 'digital_product',
    label: 'Producto digital',
    helper:
      'Para algo descargable que vendés: packs de samples, presets, plantillas, stems. Aparece en tu tienda y se puede comprar directo desde tu página.',
  },
  {
    code: 'service',
    label: 'Servicio',
    helper:
      'Para lo que ofrecés como trabajo: producción, mezcla, clases, sesiones. Podés dejarlo con precio fijo o a cotizar, según el caso.',
  },
  {
    code: 'portfolio',
    label: 'Portafolio',
    helper:
      'Para mostrar trabajos que ya hiciste, sin venderlos directamente: bandas sonoras, colaboraciones, trabajos para terceros. Funciona como carta de presentación.',
  },
]

export const PUBLICATION_FIELD_PLACEHOLDERS = {
  music: {
    title: 'Kusushiki Remix',
    description: 'Género, con quién la hiciste, dónde se puede escuchar.',
  },
  digital_product: {
    title: 'Cyberpunk Sample Pack',
    description: 'Qué incluye, para quién es, formato de entrega.',
  },
  service: {
    title: 'Producción musical',
    description: 'Qué incluye el servicio, plazos, cómo trabajas.',
  },
  portfolio: {
    title: 'Video Game Soundtrack',
    description: 'Contexto del proyecto, tu rol, para quién fue.',
  },
}

export const formatPrice = (price) =>
  price == null ? null : `$${price.toLocaleString('es-CL')}`

export const priceLabel = (publication) => {
  if (publication.price != null) return formatPrice(publication.price)
  if (publication.type === 'service') return 'A cotizar'
  return '—'
}
