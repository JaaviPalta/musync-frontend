import { useState } from 'react'
import { OrdersContext } from './OrdersContext'
import { orders as initialOrders } from '../mocks/orders'

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(initialOrders)

  const addOrder = (data) => {
    const order = { id: Date.now(), status: 'pagada', createdAt: new Date().toISOString(), ...data }
    setOrders((current) => [order, ...current])
    return order
  }

  return <OrdersContext.Provider value={{ orders, addOrder }}>{children}</OrdersContext.Provider>
}

export default OrdersProvider
