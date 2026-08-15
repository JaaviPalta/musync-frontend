import { Toaster } from 'sonner'
import UserProvider from './context/UserProvider'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <UserProvider>
      <Toaster theme="dark" position="top-right" />
      <AppRouter />
    </UserProvider>
  )
}

export default App
