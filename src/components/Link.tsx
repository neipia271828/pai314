import styles from "../styles/Contact.module.css"

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
                <p><a href={xAccount}>x</a></p>
                <p><a href={instagramAccount}>instagram</a></p>
                <p><a href={noteAccount}>note</a></p>
                <p><a href={zennAccount}>zenn</a></p>
                <p><a href={mailAddress}>gmail</a></p>
                <p><a href={githubAddress}>github</a></p>
            </div>
        </>
    )
}

export default Link