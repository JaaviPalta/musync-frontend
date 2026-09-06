const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('musync_token')
  const isFormData = options.body instanceof FormData
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.message || 'No se pudo completar la solicitud')
  }

  return payload.data
}

const json = (method, body) => ({ method, body: JSON.stringify(body) })

const multipart = (method, fields, file) => {
  const body = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    if (key === 'image') return
    if (value !== undefined && value !== null && value !== '') body.append(key, String(value))
  })
  if (file) body.append('image', file)
  return { method, body }
}

const profileMultipart = (fields) => {
  const body = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    if (key === 'avatar' || key === 'cover') {
      body.append(key, value)
      return
    }
    body.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value))
  })
  return { method: 'PATCH', body }
}

const normalizeArtistProfile = (profile) => {
  if (!profile) return profile

  const socialLinks = profile.socialLinks ?? profile.social_links ?? {}
  return {
    ...profile,
    artistName: profile.artistName ?? profile.artist_name,
    roleLine: profile.roleLine ?? profile.specialty,
    avatarImageUrl: profile.avatarImageUrl ?? profile.avatarUrl ?? profile.avatar_url,
    coverImageUrl: profile.coverImageUrl ?? profile.coverUrl ?? profile.cover_url,
    spotifyUrl: profile.spotifyUrl ?? socialLinks.spotify,
    youtubeUrl: profile.youtubeUrl ?? socialLinks.youtube,
    instagramUrl: profile.instagramUrl ?? socialLinks.instagram,
  }
}

export const api = {
  register: (data) => request('/auth/register', json('POST', data)),
  login: (data) => request('/auth/login', json('POST', data)),
  me: () => request('/auth/me'),
  updateProfile: (data) =>
    request(
      '/profile',
      data.avatar instanceof File || data.cover instanceof File
        ? profileMultipart(data)
        : json('PATCH', data),
    ),
  getProfile: (username) =>
    request(`/artists/${encodeURIComponent(username)}`).then(normalizeArtistProfile),
  getPublications: () => request('/publications'),
  getPublication: (id) => request(`/publications/${id}`),
  getArtistPublications: (username) => request(`/artists/${encodeURIComponent(username)}/publications`),
  createPublication: (data) => request('/publications', multipart('POST', data, data.image)),
  updatePublication: (id, data) => request(`/publications/${id}`, multipart('PATCH', data, data.image)),
  deletePublication: (id) => request(`/publications/${id}`, { method: 'DELETE' }),
  getShows: () => request('/shows'),
  getArtistShows: (username) => request(`/artists/${encodeURIComponent(username)}/shows`),
  createShow: (data) => request('/shows', json('POST', data)),
  deleteShow: (id) => request(`/shows/${id}`, { method: 'DELETE' }),
  createQuote: (data) => request('/quotes', json('POST', data)),
  getQuotes: () => request('/quotes'),
  updateQuoteStatus: (id, status) => request(`/quotes/${id}/status`, json('PATCH', { status })),
  // Chat de la cotización, lado artista (autenticado, dueño de la cotización)
  getQuoteMessages: (id) => request(`/quotes/${id}/messages`),
  sendQuoteMessage: (id, body) => request(`/quotes/${id}/messages`, json('POST', { body })),
  // Seguimiento público, lado cliente (sin login, validado por el token del link)
  getTrackedQuote: (token) => request(`/track/${token}`),
  sendTrackedMessage: (token, body) => request(`/track/${token}/messages`, json('POST', { body })),
  createOrder: (data) => request('/orders', json('POST', data)),
  getOrders: () => request('/orders'),
}
