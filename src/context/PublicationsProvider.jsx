import { useState } from 'react'
import { PublicationsContext } from './PublicationsContext'
import { publications as initialPublications } from '../mocks/publications'

const PublicationsProvider = ({ children }) => {
  const [publications, setPublications] = useState(initialPublications)

  const addPublication = (data) => {
    const publication = { id: Date.now(), artistId: 1, ...data }
    setPublications((current) => [publication, ...current])
    return publication
  }

  const updatePublication = (id, patch) => {
    setPublications((current) =>
      current.map((pub) => (pub.id === id ? { ...pub, ...patch } : pub)),
    )
  }

  const removePublication = (id) => {
    setPublications((current) => current.filter((pub) => pub.id !== id))
  }

  return (
    <PublicationsContext.Provider
      value={{ publications, addPublication, updatePublication, removePublication }}
    >
      {children}
    </PublicationsContext.Provider>
  )
}

export default PublicationsProvider
