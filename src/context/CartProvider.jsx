import { useState } from 'react'
import { CartContext } from './CartContext'
import { cartItems as initialCartItems } from '../mocks/cart'

const CartProvider = ({ children }) => {
  const [items, setItems] = useState(initialCartItems)

  const addItem = (publication) => {
    setItems((current) => {
      const existing = current.find((item) => item.publicationId === publication.id)
      if (existing) {
        return current.map((item) =>
          item.publicationId === publication.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [
        ...current,
        {
          id: Date.now(),
          publicationId: publication.id,
          title: publication.title,
          type: publication.type,
          artistName: publication.artistName,
          price: publication.price,
          quantity: 1,
        },
      ]
    })
  }

  const updateQuantity = (id, delta) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item,
      ),
    )
  }

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
