import { useEffect, useState } from 'react'
import { ShowsContext } from './ShowsContext'
import { api } from '../lib/api'

const ShowsProvider = ({ children }) => {
  const [upcomingShows, setUpcomingShows] = useState([])
  const [pastShows, setPastShows] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('musync_token')) return
    api.getShows().then((shows) => {
      const now = new Date()
      setUpcomingShows(shows.filter((show) => new Date(show.showDate) >= now).map((show) => ({ ...show, date: show.showDate })))
      setPastShows(shows.filter((show) => new Date(show.showDate) < now).map((show) => ({
        ...show,
        dateLabel: new Date(show.showDate).toLocaleDateString('es-CL'),
      })))
    }).catch(() => {})
  }, [])

  const addUpcomingShow = async (data) => {
    const show = await api.createShow({
      ...data,
      showDate: new Date(`${data.date}T00:00:00.000Z`).toISOString(),
    })
    setUpcomingShows((current) => [...current, show])
    return show
  }

  const removeUpcomingShow = (id) => {
    api.deleteShow(id).then(() => setUpcomingShows((current) => current.filter((show) => show.id !== id)))
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
