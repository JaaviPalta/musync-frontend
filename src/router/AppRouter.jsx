import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import Landing from '../pages/public/Landing'
import Register from '../pages/public/Register'
import Login from '../pages/public/Login'
import PublicProfile from '../pages/public/PublicProfile'
import PublicationDetail from '../pages/public/PublicationDetail'
import RequestQuote from '../pages/public/RequestQuote'
import Cart from '../pages/public/Cart'

import DashboardHome from '../pages/dashboard/DashboardHome'
import EditProfile from '../pages/dashboard/EditProfile'
import MyPublications from '../pages/dashboard/MyPublications'
import NewPublication from '../pages/dashboard/NewPublication'
import Quotes from '../pages/dashboard/Quotes'
import Orders from '../pages/dashboard/Orders'

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/artista/:username" element={<PublicProfile />} />
      <Route path="/publication/:id" element={<PublicationDetail />} />
      <Route path="/publication/:id/cotizar" element={<RequestQuote />} />
      <Route path="/cart" element={<Cart />} />

      {/* Rutas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/profile" element={<EditProfile />} />
        <Route path="/dashboard/publications" element={<MyPublications />} />
        <Route path="/dashboard/publications/new" element={<NewPublication />} />
        <Route path="/dashboard/quotes" element={<Quotes />} />
        <Route path="/dashboard/orders" element={<Orders />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
