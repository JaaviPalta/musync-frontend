// Reconoce links de Spotify o YouTube y arma la URL de su reproductor embebido,
// para que la música/video se pueda escuchar/ver directo en la página de
// MUSYNC en vez de mandar al visitante afuera. No es integración con la API
// de ninguno de los dos (eso quedó fuera del alcance del MVP) — es el mismo
// iframe público que cualquier sitio usa al "insertar" un link compartido.
// Si el link no calza con ningún patrón conocido, devuelve null y el
// llamador puede mostrar el link plano como respaldo.
const SPOTIFY_TYPES = ['track', 'album', 'artist', 'playlist', 'episode', 'show']

export function getEmbedInfo(url) {
  if (!url) return null

  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return null
  }

  const host = parsed.hostname.replace(/^www\./, '')

  if (host === 'open.spotify.com') {
    const typePattern = SPOTIFY_TYPES.join('|')
    const match = parsed.pathname.match(new RegExp(`/(?:intl-\\w+/)?(${typePattern})/([a-zA-Z0-9]+)`))
    if (match) {
      return {
        type: 'spotify',
        embedUrl: `https://open.spotify.com/embed/${match[1]}/${match[2]}`,
      }
    }
    return null
  }

  if (host === 'youtube.com' || host === 'music.youtube.com') {
    const videoId = parsed.searchParams.get('v')
    if (videoId) return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${videoId}` }

    const embedMatch = parsed.pathname.match(/\/embed\/([a-zA-Z0-9_-]+)/)
    if (embedMatch) return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${embedMatch[1]}` }

    return null
  }

  if (host === 'youtu.be') {
    const videoId = parsed.pathname.slice(1)
    if (videoId) return { type: 'youtube', embedUrl: `https://www.youtube.com/embed/${videoId}` }
    return null
  }

  return null
}
