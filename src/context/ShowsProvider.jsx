import { useContext, useEffect, useState } from 'react'
import { ShowsContext } from './ShowsContext'
import { UserContext } from './UserContext'
import { api } from '../lib/api'

const ShowsProvider = ({ children }) => {
  const [upcomingShows, setUpcomingShows] = useState([])
  const [pastShows, setPastShows] = useState([])
  const { user } = useContext(UserContext)
  const userId = user?.id

  // Depende de userId (mismo patrón que Publications/QuotesProvider), no de un
  // array vacío: si no, el primer chequeo corre antes de que exista sesión (al
  // montar la app en /login) y los shows que ya existían nunca se cargan hasta
  // recargar la página entera.
  useEffect(() => {
    if (!userId) return
    api.getShows().then((shows) => {
      const now = new Date()
      setUpcomingShows(shows.filter((show) => new Date(show.showDate) >= now).map((show) => ({ ...show, date: show.showDate })))
      // timeZone: 'UTC' porque showDate se guarda a medianoche UTC (ver
      // addUpcomingShow) — sin fijar la zona acá, toLocaleDateString la
      // muestra en la zona horaria del navegador y la fecha se corre un día
      // para atrás en cualquier huso horario detrás de UTC (como Chile).
      setPastShows(shows.filter((show) => new Date(show.showDate) < now).map((show) => ({
        ...show,
        dateLabel: new Date(show.showDate).toLocaleDateString('es-CL', { timeZone: 'UTC' }),
      })))
    }).catch(() => {})
  }, [userId])

  const addUpcomingShow = async (data) => {
    const show = await api.createShow({
      ...data,
      showDate: new Date(`${data.date}T00:00:00.000Z`).toISOString(),
    })
    // El backend devuelve el campo como "showDate", no "date" — sin este
    // mapeo (el mismo que ya se hace en la carga inicial arriba), el show
    // recién creado queda sin "date" y el "Invalid Date" en pantalla.
    setUpcomingShows((current) => [...current, { ...show, date: show.showDate }])
    return show
  }

  const removeUpcomingShow = (id) => {
    api.deleteShow(id).then(() => setUpcomingShows((current) => current.filter((show) => show.id !== id)))
  }

  const removePastShow = (id) => {
    api.deleteShow(id).then(() => setPastShows((current) => current.filter((show) => show.id !== id)))
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
