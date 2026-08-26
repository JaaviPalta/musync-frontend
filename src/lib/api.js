const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

async function request(path, options = {}) {
  const token = localStorage.getItem('musync_token')
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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

export const api = {
  register: (data) => request('/auth/register', json('POST', data)),
  login: (data) => request('/auth/login', json('POST', data)),
  me: () => request('/auth/me'),
  updateProfile: (data) => request('/profile', json('PATCH', data)),
  getProfile: (username) => request(`/artists/${encodeURIComponent(username)}`),
  getPublications: () => request('/publications'),
  getPublication: (id) => request(`/publications/${id}`),
  getArtistPublications: (username) => request(`/artists/${encodeURIComponent(username)}/publications`),
  createPublication: (data) => request('/publications', json('POST', data)),
  updatePublication: (id, data) => request(`/publications/${id}`, json('PATCH', data)),
  deletePublication: (id) => request(`/publications/${id}`, { method: 'DELETE' }),
  getShows: () => request('/shows'),
  getArtistShows: (username) => request(`/artists/${encodeURIComponent(username)}/shows`),
  createShow: (data) => request('/shows', json('POST', data)),
  deleteShow: (id) => request(`/shows/${id}`, { method: 'DELETE' }),
  createQuote: (data) => request('/quotes', json('POST', data)),
  getQuotes: () => request('/quotes'),
  updateQuoteStatus: (id, status) => request(`/quotes/${id}/status`, json('PATCH', { status })),
  createOrder: (data) => request('/orders', json('POST', data)),
  getOrders: () => request('/orders'),
}
