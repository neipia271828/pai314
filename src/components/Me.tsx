import styles from "../styles/Me.module.css"
import profileImage from '../assets/pai314.png'

function Me() {
    return (
        <>
            <img className={styles.img} src={profileImage} alt="profile" />
            <h1>Pai314</h1>
            <p>Hello! My name is π</p>
        </>
    )
}

export default Me