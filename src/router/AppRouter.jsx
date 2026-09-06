import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicLayout from '../components/layout/PublicLayout'
import DashboardLayout from '../components/layout/DashboardLayout'

import Landing from '../pages/public/Landing'
import Register from '../pages/public/Register'
import Login from '../pages/public/Login'
import PublicProfile from '../pages/public/PublicProfile'
import PublicationDetail from '../pages/public/PublicationDetail'
import RequestQuote from '../pages/public/RequestQuote'
import QuoteTracking from '../pages/public/QuoteTracking'
import Cart from '../pages/public/Cart'
import NotFound from '../pages/public/NotFound'

import DashboardHome from '../pages/dashboard/DashboardHome'
import EditProfile from '../pages/dashboard/EditProfile'
import MyPublications from '../pages/dashboard/MyPublications'
import NewPublication from '../pages/dashboard/NewPublication'
import Quotes from '../pages/dashboard/Quotes'
import Shows from '../pages/dashboard/Shows'
import Orders from '../pages/dashboard/Orders'

const AppRouter = () => {
  return (
    <Routes>
      {/* Landing tiene su propio nav + footer de marketing, no usa PublicLayout */}
      <Route path="/" element={<Landing />} />

      {/* Resto de rutas públicas, con el navbar minimal (logo + carrito + log in) */}
      <Route element={<PublicLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artista/:username" element={<PublicProfile />} />
        <Route path="/publication/:id" element={<PublicationDetail />} />
        <Route path="/publication/:id/cotizar" element={<RequestQuote />} />
        <Route path="/cotizar" element={<RequestQuote />} />
        <Route path="/seguimiento/:token" element={<QuoteTracking />} />
        <Route path="/404" element={<NotFound />} />
      </Route>

      {/* Rutas privadas: requieren sesión y usan el sidebar */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/profile" element={<EditProfile />} />
          <Route path="/dashboard/publications" element={<MyPublications />} />
          <Route path="/dashboard/publications/new" element={<NewPublication />} />
          <Route path="/dashboard/publications/:id/edit" element={<NewPublication />} />
          <Route path="/dashboard/quotes" element={<Quotes />} />
          <Route path="/dashboard/shows" element={<Shows />} />
          <Route path="/dashboard/orders" element={<Orders />} />
        </Route>
      </Route>

      {/* Cualquier ruta no definida arriba redirige a la 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default AppRouter
