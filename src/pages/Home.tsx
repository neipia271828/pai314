import Header from "../components/Header"
import Me from "../components/Me"
import Link from "../components/Link"
import MonteCarloPi from "../components/MonteCarloPi"

function Home() {
    return (
        <>
            <Header currentPage="Pai314" transparent />
            <MonteCarloPi />
            <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Me />
                <Link />
            </section>
        </>
    )
}

export default Home