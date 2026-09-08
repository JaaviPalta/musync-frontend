import { useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { api } from '../lib/api'

const normalizeProfile = (profile) => ({
  ...profile,
  tags: Array.isArray(profile?.tags) ? profile.tags : [],
  avatarImageUrl: profile?.avatarImageUrl ?? profile?.avatarUrl ?? profile?.avatar_url,
  coverImageUrl: profile?.coverImageUrl ?? profile?.coverUrl ?? profile?.cover_url,
})

const normalizeRole = (userPayload) => {
  const role = userPayload?.role ?? userPayload?.userRole ?? userPayload?.type ?? userPayload?.accountType

  if (role === 'artist' || role === 'client') {
    return role
  }

  return userPayload?.artistProfile || userPayload?.profile ? 'artist' : 'client'
}

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // Mientras esto es true, todavía no sabemos si hay una sesión válida o no.
  // Sin este estado, ProtectedRoute ve user=null en el primer render (antes de
  // que la llamada a /auth/me resuelva) y manda a /login aunque el token en
  // localStorage sea válido — pasaba en cualquier recarga completa de página.
  const [isLoading, setIsLoading] = useState(true)

  const setAuthenticatedUser = (result) => {
    const userPayload = result?.user ?? result ?? {}
    const profile = result?.profile ?? userPayload?.profile ?? null

    setUser({
      ...userPayload,
      role: normalizeRole(userPayload),
      artistProfile: profile ? normalizeProfile(profile) : userPayload?.artistProfile ?? null,
    })
  }

  useEffect(() => {
    if (!localStorage.getItem('musync_token')) {
      setIsLoading(false)
      return
    }
    api
      .me()
      .then(setAuthenticatedUser)
      .catch(() => localStorage.removeItem('musync_token'))
      .finally(() => setIsLoading(false))
  }, [])

  const authenticate = (result) => {
    const token = result?.token || result?.user?.token
    if (token) {
      localStorage.setItem('musync_token', token)
    }

    setAuthenticatedUser(result)
    return result
  }

  const login = async (data) => authenticate(await api.login(data))
  const register = async (data) => authenticate(await api.register(data))
  const logout = () => {
    localStorage.removeItem('musync_token')
    setUser(null)
  }

  const updateProfile = async (patch) => {
    const profile = await api.updateProfile(patch)
    const normalizedProfile = normalizeProfile(profile)
    setUser((current) => ({ ...current, artistProfile: normalizedProfile }))
    return normalizedProfile
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
