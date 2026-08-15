import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import styles from './DashboardLayout.module.css'

const DashboardLayout = () => (
  <div className={styles.layout}>
    <Sidebar />
    <main className={styles.content}>
      <Outlet />
    </main>
  </div>
)

export default DashboardLayout
