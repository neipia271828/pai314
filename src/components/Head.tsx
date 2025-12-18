import { Link } from "react-router-dom"
import styles from "../styles/Head.module.css"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Pai314</h1>
      </div>

      <div className={styles.center}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/Contact">Contact/Links</Link>
        </nav>
      </div>

      <div className={styles.right} />
    </header>
  )
}

export default Header