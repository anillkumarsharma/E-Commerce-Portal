import styles from '../../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>🛍</div>
          <span className={styles.brandName}>ApnaBazaar</span>
        </div>
        <p className={styles.copyright}>
          © 2025 ApnaBazaar. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
