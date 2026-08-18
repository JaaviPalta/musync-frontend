import { useState } from 'react'
import { ShowsContext } from './ShowsContext'
import { upcomingShows as initialUpcoming, pastShows as initialPast } from '../mocks/shows'

const ShowsProvider = ({ children }) => {
  const [upcomingShows, setUpcomingShows] = useState(initialUpcoming)
  const [pastShows, setPastShows] = useState(initialPast)

  const addUpcomingShow = (data) => {
    setUpcomingShows((current) => [...current, { id: Date.now(), artistId: 1, ...data }])
  }

  const removeUpcomingShow = (id) => {
    setUpcomingShows((current) => current.filter((show) => show.id !== id))
  }

  const removePastShow = (id) => {
    setPastShows((current) => current.filter((show) => show.id !== id))
  }

  return (
    <ShowsContext.Provider
      value={{ upcomingShows, pastShows, addUpcomingShow, removeUpcomingShow, removePastShow }}
    >
      {children}
    </ShowsContext.Provider>
  )
}

export default ShowsProvider
