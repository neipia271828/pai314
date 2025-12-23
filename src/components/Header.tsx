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
          <Link to="/">
          <div className={styles.headerelement}>
            <div className={styles.icons}><span className="material-icons">home</span></div>
            Home
          </div>
          </Link>

          <Link to="/about">
          <div className={styles.headerelement}>
            <div className={styles.icons}><span className="material-icons">person</span></div>
            About
          </div>
          </Link>

          <Link to="/projects">
          <div className={styles.headerelement}>
            <div className={styles.icons}><span className="material-icons">note</span></div>
            Projects
          </div>
          </Link>

          <Link to="/articles">
          <div className={styles.headerelement}>
            <div className={styles.icons}><span className="material-icons">article</span></div>
            Articles
          </div>
          </Link>

          <Link to="/links">
          <div className={styles.headerelement}>
            <div className={styles.icons}><span className="material-icons">link</span></div>
            Links
          </div>
          </Link>
        </nav>
      </div>

      <div className={styles.right} />
    </header>
  )
}

export default Header