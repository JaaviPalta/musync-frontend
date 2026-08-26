import { useEffect, useState } from 'react'
import { OrdersContext } from './OrdersContext'
import { api } from '../lib/api'

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (localStorage.getItem('musync_token')) api.getOrders().then(setOrders).catch(() => {})
  }, [])

  const addOrder = async (data) => {
    const order = await api.createOrder(data)
    setOrders((current) => [order, ...current])
    return order
  }

  return <OrdersContext.Provider value={{ orders, addOrder }}>{children}</OrdersContext.Provider>
}

export default OrdersProvider
