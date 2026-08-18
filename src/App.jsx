import { Toaster } from 'sonner'
import UserProvider from './context/UserProvider'
import CartProvider from './context/CartProvider'
import PublicationsProvider from './context/PublicationsProvider'
import QuotesProvider from './context/QuotesProvider'
import OrdersProvider from './context/OrdersProvider'
import ShowsProvider from './context/ShowsProvider'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <UserProvider>
      <PublicationsProvider>
        <CartProvider>
          <QuotesProvider>
            <OrdersProvider>
              <ShowsProvider>
                <Toaster theme="dark" position="top-right" />
                <AppRouter />
              </ShowsProvider>
            </OrdersProvider>
          </QuotesProvider>
        </CartProvider>
      </PublicationsProvider>
    </UserProvider>
  )
}

export default App
