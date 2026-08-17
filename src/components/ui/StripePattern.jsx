import styles from './StripePattern.module.css'

const StripePattern = ({ tone = 'accent', className = '', style, children }) => (
  <div
    className={`${styles.pattern} ${tone === 'accent' ? styles.accent : styles.neutral} ${className}`}
    style={style}
  >
    {children}
  </div>
)

export default StripePattern
