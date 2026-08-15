import { useState } from 'react'
import { UserContext } from './UserContext'
import { currentUser } from '../mocks/user'

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = () => setUser(currentUser)
  const logout = () => setUser(null)

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
