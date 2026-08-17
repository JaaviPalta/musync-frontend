import { Table } from 'react-bootstrap'
import { orders } from '../../mocks/orders'
import { formatPrice } from '../../utils/publications'
import styles from './Orders.module.css'

const Orders = () => {
  const total = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div>
      <h1 className={styles.title}>Pedidos</h1>
      <p className={styles.subtitle}>
        Órdenes creadas cuando un visitante finaliza la compra de música o productos digitales.
      </p>

      <div className={styles.summary}>
        <span>{orders.length} pedidos</span>
        <span>{formatPrice(total)} en total</span>
      </div>

      {orders.length === 0 ? (
        <p className={styles.emptyState}>Todavía no has recibido pedidos.</p>
      ) : (
        <div className={styles.tableWrap}>
          <Table responsive className={styles.table}>
            <thead>
              <tr>
                <th>Comprador</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.buyerName}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString('es-CL', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </td>
                  <td>{order.items.map((item) => `${item.title} ×${item.quantity}`).join(', ')}</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <span className={styles.statusBadge}>Pagada</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default Orders
