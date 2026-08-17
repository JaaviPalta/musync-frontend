import { useState } from 'react'
import { UserContext } from './UserContext'
import { currentUser } from '../mocks/user'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = () => setUser(currentUser)
  const logout = () => setUser(null)

  const updateProfile = (patch) =>
    setUser((current) => ({
      ...current,
      artistProfile: { ...current.artistProfile, ...patch },
    }))

  return (
    <UserContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
