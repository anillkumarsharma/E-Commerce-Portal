import styles from '../../styles/Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p className={styles.text}>Loading products...</p>
    </div>
  )
}

export default Loader
