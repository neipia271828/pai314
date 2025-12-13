import styles from '../styles/Head.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Pai314</h1>
      </div>

      <div className={styles.center}>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#links">Links</a>
      </nav>
      </div>

      <div className={styles.right}/>
    </header>
  )
}

export default Header