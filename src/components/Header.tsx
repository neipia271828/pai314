import { Link } from "react-router-dom"
import styles from "../styles/Header.module.css"

type Props = {
  currentPage: string;
}

function Header(props: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>{props.currentPage}</h1>
      </div>

      <div className={styles.center}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/links">Links</Link>
        </nav>
      </div>

      <div className={styles.right} />
    </header>
  )
}

export default Header