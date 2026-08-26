import { useContext, useEffect, useState } from 'react'
import { PublicationsContext } from './PublicationsContext'
import { UserContext } from './UserContext'
import { api } from '../lib/api'

const PublicationsProvider = ({ children }) => {
  const [publications, setPublications] = useState([])
  const [loadedUserId, setLoadedUserId] = useState(null)
  const { user } = useContext(UserContext)
  const userId = user?.id

  useEffect(() => {
    if (!userId) return

    api
      .getPublications()
      .then((items) => {
        setPublications(items)
        setLoadedUserId(userId)
      })
      .catch(() => {
        setPublications([])
        setLoadedUserId(userId)
      })
  }, [userId])

  const visiblePublications = user && loadedUserId === userId ? publications : []

  const addPublication = async (data) => {
    const publication = await api.createPublication({
      ...data,
      isActive: data.status === 'publicada',
    })
    setLoadedUserId(userId)
    setPublications((current) => [publication, ...current])
    return publication
  }

  const updatePublication = async (id, patch) => {
    const publication = await api.updatePublication(id, {
      ...patch,
      isActive: patch.status === 'publicada',
    })
    setLoadedUserId(userId)
    setPublications((current) => current.map((pub) => (pub.id === id ? publication : pub)))
    return publication
  }

  const removePublication = async (id) => {
    await api.deletePublication(id)
    setPublications((current) => current.filter((pub) => pub.id !== id))
  }

  return (
    <PublicationsContext.Provider
      value={{
        publications: visiblePublications,
        addPublication,
        updatePublication,
        removePublication,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  )
}

export default PublicationsProvider
