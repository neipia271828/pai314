import styles from "../styles/Link.module.css"

function Link() {
    const xAccount:string = "https://x.com/pi314_grothen57";
    const instagramAccount:string = "https://www.instagram.com/pai314_paisanitiyon/";
    const noteAccount:string = "https://note.com/boom3037";
    const zennAccount:string = "https://zenn.dev/pai314grothen57";
    const mailAddress:string = "pai314.eequoalmc2@gmail.com";
    const githubAddress:string = "https://github.com/neipia271828"

    return (
        <>
            <h2 className={styles.h2}>Links</h2>
            <div className={styles.text}>
                <p><a href={xAccount}>
                    <div className={styles.icons}><span className="material-icons">phone</span></div>
                    x
                </a></p>
                <p><a href={instagramAccount}>
                    <div className={styles.icons}><span className="material-icons">camera</span></div>
                    instagram
                </a></p>
                <p><a href={noteAccount}>
                    <div className={styles.icons}><span className="material-icons">note</span></div>
                    note
                </a></p>
                <p><a href={zennAccount}>
                    <div className={styles.icons}><span className="material-icons">circle</span></div>
                    zenn
                </a></p>
                <p><a href={mailAddress}>
                    <div className={styles.icons}><span className="material-icons">mail</span></div>
                    gmail
                </a></p>
                <p><a href={githubAddress}>
                    <div className={styles.icons}><span className="material-icons">commit</span></div>
                    github
                </a></p>
            </div>
        </>
    )
}

export default Link