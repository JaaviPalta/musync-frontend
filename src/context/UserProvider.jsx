import { useEffect, useState } from 'react'
import { UserContext } from './UserContext'
import { api } from '../lib/api'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const setAuthenticatedUser = (result) =>
    setUser({
      ...result.user,
      artistProfile: {
        ...result.profile,
        tags: Array.isArray(result.profile?.tags) ? result.profile.tags : [],
      },
    })

  useEffect(() => {
    if (!localStorage.getItem('musync_token')) return
    api.me().then(setAuthenticatedUser).catch(() => localStorage.removeItem('musync_token'))
  }, [])

  const authenticate = (result) => {
    localStorage.setItem('musync_token', result.token)
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
    const normalizedProfile = {
      ...profile,
      tags: Array.isArray(profile?.tags) ? profile.tags : [],
    }
    setUser((current) => ({ ...current, artistProfile: normalizedProfile }))
    return normalizedProfile
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
