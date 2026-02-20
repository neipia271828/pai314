import Header from "../components/Header";
import Me from "../components/Me";
import styles from "../styles/About.module.css";

function About() {
    return (
        <>
            <Header currentPage="About"/>
            <section className = {styles.meSection}>
                <Me />
            </section>
            <section className={styles.sectionHead}>
                <h2 className={styles.h2}>My Career</h2>
            </section>
            <section className={styles.careerSection}>
                <ul className={styles.timeline}>
                    <li className={styles.timelineItem}>
                        <div className={styles.timelineYear}>2025年</div>
                        <ul className={styles.timelineDetails}>
                            <li>4月 高等専門学校に入学</li>
                        </ul>
                    </li>
                </ul>
            </section>
            
        </>
    )
}

export default About
