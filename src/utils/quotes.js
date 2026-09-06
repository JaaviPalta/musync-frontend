export const QUOTE_STATUS_LABELS = {
  nueva: 'Nueva',
  en_conversacion: 'En conversación',
  aceptada: 'Aceptada',
  rechazada: 'Rechazada',
}

// El front trabaja en español, la base de datos guarda el status en inglés
// (pending/reviewed/accepted/rejected). Un solo lugar para los dos mapas,
// usado tanto por QuotesProvider como por la página pública de seguimiento.
export const QUOTE_STATUS_TO_API = {
  nueva: 'pending',
  en_conversacion: 'reviewed',
  aceptada: 'accepted',
  rechazada: 'rejected',
}

export const QUOTE_STATUS_FROM_API = {
  pending: 'nueva',
  reviewed: 'en_conversacion',
  accepted: 'aceptada',
  rejected: 'rechazada',
}

export const QUOTE_FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'nueva', label: 'Nuevas' },
  { key: 'en_conversacion', label: 'En conversación' },
  { key: 'aceptada', label: 'Aceptadas' },
  { key: 'rechazada', label: 'Rechazadas' },
]
